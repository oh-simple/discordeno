import { RolePayload } from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { Collection } from "../../util/collection.ts";
import { createNewProp } from "../../util/utils.ts";
import { deleteRole, editRole } from "../handlers/guild.ts";
import { CreateGuildRoleOptions } from "../types/mod.ts";
import { Guild } from "./guild.ts";
import { Member } from "./member.ts";

const baseRole: Partial<Role> = {
  get guild() {
    return cache.guilds.find((g) => g.roles.has(this.id!));
  },
  get hexColor() {
    return this.color!.toString(16);
  },
  get members() {
    return cache.members.filter((m) =>
      m.guilds.some((g) => g.roles.includes(this.id!))
    );
  },
  get mention() {
    return `<@&${this.id}>`;
  },

  // METHODS
  delete(guildID?: string) {
    // If not guild id was provided try and find one
    if (!guildID) guildID = guildID || this.guild?.id;
    // If a guild id is still not available error out
    if (!guildID) {
      throw new Error(
        "role.delete() did not find a valid guild in cache. Please provide the guildID like role.delete(guildID)",
      );
    }

    return deleteRole(guildID, this.id!).catch(console.error);
  },
  edit(options: CreateGuildRoleOptions, guildID?: string) {
    // If not guild id was provided try and find one
    if (!guildID) guildID = guildID || this.guild?.id;
    // If a guild id is still not available error out
    if (!guildID) {
      throw new Error(
        "role.edit() did not find a valid guild in cache. Please provide the guildID like role.edit({}, guildID)",
      );
    }

    return editRole(guildID, this.id!, options);
  },
  higherThanRoleID(roleID: string, position?: number) {
    // If no position try and find one from cache
    if (!position) position = this.guild?.roles.get(roleID)?.position;
    // If still none error out.
    if (!position) {
      throw new Error(
        "role.higherThanRoleID() did not have a position provided and the role or guild was not found in cache. Please provide a position like role.higherThanRoleID(roleID, position)",
      );
    }

    // Rare edge case handling
    if (this.position === position) {
      return this.id! < roleID;
    }

    return this.position! > position;
  },
};

export async function createRole(data: RolePayload) {
  const { tags = {}, ...rest } = data;

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    restProps[key] = createNewProp(rest[key]);
  }

  const role = Object.create(baseRole, {
    ...restProps,
    botID: createNewProp(tags.bot_id),
    isNitroBoostRole: createNewProp("premium_subscriber" in tags),
    integrationID: createNewProp(tags.integration_id),
  });

  return role as Role;
}

export interface Role {
  /** role id */
  id: string;
  /** role name */
  name: string;
  /** integer representation of hexadecimal color code */
  color: number;
  /** if this role is pinned in the user listing */
  hoist: boolean;
  /** position of this role */
  position: number;
  /** permission bit set */
  permissions: string;
  /** whether this role is managed by an integration */
  managed: boolean;
  /** whether this role is mentionable */
  mentionable: boolean;
  /** The bot id that is associated with this role. */
  botID?: string;
  /** If this role is the nitro boost role. */
  isNitroBoostRole: boolean;
  /** The integration id that is associated with this role */
  integrationID: string;

  // GETTERS

  /** The guild where this role is. If undefined, the guild is not cached */
  guild?: Guild;
  /** The hex color for this role. */
  hexColor: string;
  /** The cached members that have this role */
  members: Collection<string, Member>;
  /** The @ mention of the role in a string. */
  mention: string;

  // METHODS

  /** Delete the role */
  delete(guildID?: string): ReturnType<typeof deleteRole>;
  /** Edits the role */
  edit(options: CreateGuildRoleOptions): Promise<Role>;
  /** Checks if this role is higher than another role. */
  higherThanRoleID(roleID: string, position?: number): boolean;
}
