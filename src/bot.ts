import { RequestManager } from "./rest/request_manager.ts";
import {
  BotConfig,
  DiscordBotGatewayData,
  EventHandlers,
  Intents,
} from "./types/mod.ts";
import { baseEndpoints, endpoints, GATEWAY_VERSION } from "./util/constants.ts";
import { spawnShards } from "./ws/shard_manager.ts";

export let authorization = "";
export let botID = "";

export let eventHandlers: EventHandlers = {};

export let botGatewayData: DiscordBotGatewayData;
export let proxyWSURL = `wss://gateway.discord.gg`;

export const identifyPayload: IdentifyPayload = {
  token: "",
  compress: true,
  properties: {
    $os: "linux",
    $browser: "Discordeno",
    $device: "Discordeno",
  },
  intents: 0,
  shard: [0, 0],
};

export interface IdentifyPayload {
  token: string;
  compress: boolean;
  properties: {
    $os: string;
    $browser: string;
    $device: string;
  };
  intents: number;
  shard: [number, number];
}

export async function startBot(config: BotConfig) {
  if (config.eventHandlers) eventHandlers = config.eventHandlers;
  authorization = `Bot ${config.token}`;

  // Initial API connection to get info about bots connection
  botGatewayData = await RequestManager.get(
    endpoints.GATEWAY_BOT,
  ) as DiscordBotGatewayData;

  // Explicitly append gateway version and encoding
  botGatewayData.url += `?v=${GATEWAY_VERSION}&encoding=json`;

  proxyWSURL = botGatewayData.url;
  identifyPayload.token = config.token;
  identifyPayload.intents = config.intents.reduce(
    (bits, next) => (bits |= typeof next === "string" ? Intents[next] : next),
    0,
  );
  identifyPayload.shard = [0, botGatewayData.shards];

  spawnShards(botGatewayData, identifyPayload, 0, botGatewayData.shards);
}

/** Allows you to dynamically update the event handlers by passing in new eventHandlers */
export function updateEventHandlers(newEventHandlers: EventHandlers) {
  eventHandlers = {
    ...eventHandlers,
    ...newEventHandlers,
  };
}

/** INTERNAL LIB function used to set the bot ID once the READY event is sent by Discord. */
export function setBotID(id: string) {
  if (botID !== id) botID = id;
}

// BIG BRAIN BOT STUFF ONLY BELOW THIS

/**
 * This function should be used only by bot developers whose bots are in over 25,000 servers.
 * Please be aware if you are a beginner developer using this, things will not work as per the guides. This is for advanced developers only!
 *
 * Advanced Devs: This function will allow you to have an insane amount of customization potential as when you get to large bots you need to be able to optimize every tiny detail to make you bot work the way you need.
*/
export async function startBigBrainBot(data: BigBrainBotConfig) {
  authorization = `Bot ${data.token}`;
  identifyPayload.token = `Bot ${data.token}`;

  if (data.restURL) baseEndpoints.BASE_URL = data.restURL;
  if (data.cdnURL) baseEndpoints.CDN_URL = data.cdnURL;
  if (data.wsURL) proxyWSURL = data.wsURL;
  if (data.eventHandlers) eventHandlers = data.eventHandlers;
  if (data.compress) {
    identifyPayload.compress = data.compress;
  }

  identifyPayload.intents = data.intents.reduce(
    (bits, next) => (bits |= typeof next === "string" ? Intents[next] : next),
    0,
  );

  // Initial API connection to get info about bots connection
  botGatewayData = await RequestManager.get(
    endpoints.GATEWAY_BOT,
  ) as DiscordBotGatewayData;

  if (!data.wsURL) proxyWSURL = botGatewayData.url;
  await spawnShards(
    botGatewayData,
    identifyPayload,
    data.firstShardID,
    data.lastShardID || botGatewayData.shards >= 25
      ? (data.firstShardID + 25)
      : botGatewayData.shards,
  );
}

export interface BigBrainBotConfig extends BotConfig {
  /** The first shard to start at for this worker. Use this to control which shards to run in each worker. */
  firstShardID: number;
  /** The last shard to start for this worker. By default it will be 25 + the firstShardID. */
  lastShardID?: number;
  /** This can be used to forward the ws handling to a proxy. */
  wsURL?: string;
  /** This can be used to forward the REST handling to a proxy. */
  restURL?: string;
  /** This can be used to forward the CDN handling to a proxy. */
  cdnURL?: string;
}
