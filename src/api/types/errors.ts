export enum Errors {
  // Bot Role errors
  BOTS_HIGHEST_ROLE_TOO_LOW = "BOTS_HIGHEST_ROLE_TOO_LOW",
  // Channel Errors
  CHANNEL_NOT_FOUND = "CHANNEL_NOT_FOUND",
  CHANNEL_NOT_IN_GUILD = "CHANNEL_NOT_IN_GUILD",
  CHANNEL_NOT_TEXT_BASED = "CHANNEL_NOT_TEXT_BASED",
  MESSAGE_MAX_LENGTH = "MESSAGE_MAX_LENGTH",
  // Guild Errors
  GUILD_NOT_FOUND = "GUILD_NOT_FOUND",
  MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND",
  ROLE_NOT_FOUND = "ROLE_NOT_FOUND",
  // Message Delete Errors
  DELETE_MESSAGES_MIN = "DELETE_MESSAGES_MIN",
  PRUNE_MIN_DAYS = "PRUNE_MIN_DAYS",
  // Interaction Errors
  INVALID_SLASH_DESCRIPTION = "INVALID_SLASH_DESCRIPTION",
  INVALID_SLASH_NAME = "INVALID_SLASH_NAME",
  // Webhook Errors
  INVALID_WEBHOOK_NAME = "INVALID_WEBHOOK_NAME",
  INVALID_WEBHOOK_OPTIONS = "INVALID_WEBHOOK_OPTIONS",
  // Permission Errors
  MISSING_ADD_REACTIONS = "MISSING_ADD_REACTIONS",
  MISSING_ADMINISTRATOR = "MISSING_ADMINISTRATOR",
  MISSING_ATTACH_FILES = "MISSING_ATTACH_FILES",
  MISSING_BAN_MEMBERS = "MISSING_BAN_MEMBERS",
  MISSING_CHANGE_NICKNAME = "MISSING_CHANGE_NICKNAME",
  MISSING_CONNECT = "MISSING_CONNECT",
  MISSING_CREATE_INSTANT_INVITE = "MISSING_CREATE_INSTANT_INVITE",
  MISSING_DEAFEN_MEMBERS = "MISSING_DEAFEN_MEMBERS",
  MISSING_EMBED_LINKS = "MISSING_EMBED_LINKS",
  MISSING_INTENT_GUILD_MEMBERS = "MISSING_INTENT_GUILD_MEMBERS",
  MISSING_KICK_MEMBERS = "MISSING_KICK_MEMBERS",
  MISSING_MANAGE_CHANNELS = "MISSING_MANAGE_CHANNELS",
  MISSING_MANAGE_EMOJIS = "MISSING_MANAGE_EMOJIS",
  MISSING_MANAGE_GUILD = "MISSING_MANAGE_GUILD",
  MISSING_MANAGE_MESSAGES = "MISSING_MANAGE_MESSAGES",
  MISSING_MANAGE_NICKNAMES = "MISSING_MANAGE_NICKNAMES",
  MISSING_MANAGE_ROLES = "MISSING_MANAGE_ROLES",
  MISSING_MANAGE_WEBHOOKS = "MISSING_MANAGE_WEBHOOKS",
  MISSING_MENTION_EVERYONE = "MISSING_MENTION_EVERYONE",
  MISSING_MOVE_MEMBERS = "MISSING_MOVE_MEMBERS",
  MISSING_MUTE_MEMBERS = "MISSING_MUTE_MEMBERS",
  MISSING_PRIORITY_SPEAKER = "MISSING_PRIORITY_SPEAKER",
  MISSING_READ_MESSAGE_HISTORY = "MISSING_READ_MESSAGE_HISTORY",
  MISSING_SEND_MESSAGES = "MISSING_SEND_MESSAGES",
  MISSING_SEND_TTS_MESSAGES = "MISSING_SEND_TTS_MESSAGES",
  MISSING_SPEAK = "MISSING_SPEAK",
  MISSING_STREAM = "MISSING_STREAM",
  MISSING_USE_VAD = "MISSING_USE_VAD",
  MISSING_USE_EXTERNAL_EMOJIS = "MISSING_USE_EXTERNAL_EMOJIS",
  MISSING_VIEW_AUDIT_LOG = "MISSING_VIEW_AUDIT_LOG",
  MISSING_VIEW_CHANNEL = "MISSING_VIEW_CHANNEL",
  MISSING_VIEW_GUILD_INSIGHTS = "MISSING_VIEW_GUILD_INSIGHTS",
  // User Errors
  NICKNAMES_MAX_LENGTH = "NICKNAMES_MAX_LENGTH",
  USERNAME_INVALID_CHARACTER = "USERNAME_INVALID_CHARACTER",
  USERNAME_INVALID_USERNAME = "USERNAME_INVALID_USERNAME",
  USERNAME_MAX_LENGTH = "USERNAME_MAX_LENGTH",
  USERNAME_MIN_LENGTH = "USERNAME_MIN_LENGTH",
  // API Errors
  RATE_LIMIT_RETRY_MAXED = "RATE_LIMIT_RETRY_MAXED",
  REQUEST_CLIENT_ERROR = "REQUEST_CLIENT_ERROR",
  REQUEST_SERVER_ERROR = "REQUEST_SERVER_ERROR",
  REQUEST_UNKNOWN_ERROR = "REQUEST_UNKNOWN_ERROR",
}
