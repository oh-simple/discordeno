import { User } from "./user.ts";

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface Emoji {
  /** emoji id */
  id: string | null;
  /** emoji name */
  name: string | null;
  /** roles this emoji is whitelisted to */
  roles?: string[];
  /** user that created this emoji */
  user?: User;
  /** whether this emoji must be wrapped in colons */
  requireColons?: boolean;
  /** whether this emoji is managed */
  managed?: boolean;
  /** whether this emoji is animated */
  animated?: boolean;
  /** whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean;
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmojiOptions {
  /** name of the emoji */
  name: string;
  /** the 128x128 emoji image (Data URI scheme) */
  image: string;
  /** roles for which this emoji will be whitelisted */
  roles: string[];
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmojiOptions {
  /** name of the emoji */
  name?: string;
  /** roles to which this emoji will be whitelisted */
  roles?: string[] | null;
}