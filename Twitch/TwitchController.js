//  Working with twitchJS 2.0.0-beta.33

let twitchMessageCallbacks = {};
let twitchChat = null;
let twitchAPI = null;
let lastChatMessage = { c: null, m: null };

const SHOW_LOW_LEVEL_MESSAGES = false;
const SHOW_WHISPER_MESSAGES = true;
const SHOW_SUPPORT_MESSAGES = true;
const SHOW_PROBLEM_MESSAGES = true;
const SHOW_UNHANDLED_MESSAGES = true;

let myUsername = "";

class TwitchController {
    constructor() {}

    static AddTwitchMessageCallback(eventID, callback) { twitchMessageCallbacks[eventID] = callback; }

    static async SendChatMessage(sendChannel, sendMessage, resend = false) {
        if (!sendChannel || !sendMessage) { return; }
        if (!resend) { lastChatMessage = { c: sendChannel, m: sendMessage }; }
        twitchChat.say(sendChannel, sendMessage);
    }

    static async Connect(twitchChannel, twitchToken) {
        //  Store off the given channel, and token
        channel = twitchChannel.toLowerCase();
        token = twitchToken;

        // Instantiate the TwitchJS objects
        const { chat, api } = new TwitchJs({ token, username });
        twitchChat = chat;
        twitchAPI = api;

        //  Set event handlers on the Twitch Chat object
        twitchChat.onAction = (channel, user, message, msg) => { this.onAction(channel, user, message, msg); }
        twitchChat.onAuthenticationFailure = (message) => { this.onAuthenticationFailure(message); }

        //  Turn the twitch chat on
        twitchChat.on(TwitchJs.Chat.Events.ALL, this.handleTwitchMessage);
        
        //  Connect and save off our personal username
        try {
            let connectResult = await twitchChat.connect();
            if (!connectResult) { console.warn("Failed to connect to twitch channel!"); return false; }
            if (!twitchChat._userState) { console.warn("Invalid user state returned when connecting to channel!"); return false; }
            myUsername = twitchChat._userState.username;
        }
        catch (error) { console.error(error); return false; }

        TwitchController.AddTwitchMessageCallback("MSG_RATELIMIT", () => {
            //  If we hit the message rate limit, try to resend the same message again in 500ms
            setTimeout(() => { TwitchController.SendChatMessage(lastChatMessage.c, lastChatMessage.m, true); }, 500);
            return true;
        });

        //  Join the chat channel
        twitchChat.join(channel);
        return true;
    }
    
    static handleTwitchMessage(message) {
        //  If you've added a twitch callback, it'll override the bottom code and instead go to your callback
        if (twitchMessageCallbacks.hasOwnProperty(message.event)) { if (twitchMessageCallbacks[message.event](message)) return; }

        switch (message.event) {
            case "PING":                            if (message.channel === "tmi.twitch.tv") TwitchController.SendChatMessage("tmi.twitch.tv", "PONG");                 break;
            case "PONG":
            case "CAP":                 
            case "001":
            case "002":
            case "003":
            case "004":
            case "375":
            case "372":
            case "376":
            case "353":
            case "366":                             if (SHOW_LOW_LEVEL_MESSAGES) console.log(message.event + " EVENT: " + message.message);                             break;
            case "JOIN":                            if (SHOW_LOW_LEVEL_MESSAGES) console.log("JOIN EVENT: " + message.username);                                        break;
            case "PART":                            if (SHOW_LOW_LEVEL_MESSAGES) console.log("PART EVENT: " + message.username);                                        break;
            case "PRIVMSG":                         if (SHOW_LOW_LEVEL_MESSAGES) console.log("CHAT MESSAGE - " + message.username + ": " + message.message);            break;
            case "GLOBALUSERSTATE":                 if (SHOW_LOW_LEVEL_MESSAGES) console.log("GLOBALUSERSTATE" + " event occurred");                                    break;
            case "USERSTATE":                       if (SHOW_LOW_LEVEL_MESSAGES) console.log("USERSTATE" + " event occurred");                                          break;
            case "ROOMSTATE":                       if (SHOW_LOW_LEVEL_MESSAGES) console.log("ROOMSTATE" + " event occurred");                                          break;
            case "HOSTTARGET":                      if (SHOW_LOW_LEVEL_MESSAGES) console.log("Host Target: " + message.username);                                       break;
            case "HOST_ON":                         if (SHOW_LOW_LEVEL_MESSAGES) console.log("HOST ON: " + message.message + " on " + message.username);                break;
            case "HOST_OFF":                        if (SHOW_LOW_LEVEL_MESSAGES) console.log("HOST OFF: " + message.message + " on " + message.username);               break;
            case "HOSTED/WITHOUT_VIEWERS":          if (SHOW_LOW_LEVEL_MESSAGES) console.log("HOST (NO VIEWERS): " + message.username);                                 break;
            case "HOST_TARGET_WENT_OFFLINE":        if (SHOW_LOW_LEVEL_MESSAGES) console.log("HOST TARGET OFFLINE: " + message.message + " on " + message.username);    break;
            case "USER_BANNED":                     if (SHOW_LOW_LEVEL_MESSAGES) console.log("USER BANNED: " + message.username);                                       break;
            case "MSG_DUPLICATE":                   if (SHOW_LOW_LEVEL_MESSAGES) console.log("MESSAGE DUPLICATE");                                                      break;
            case "FOLLOWERS_ON":                    if (SHOW_LOW_LEVEL_MESSAGES) console.log("FOLLOWERS_ON");                                                           break;
            case "FOLLOWERS_OFF":                   if (SHOW_LOW_LEVEL_MESSAGES) console.log("FOLLOWERS_OFF");                                                          break;

            case "WHISPER":                         if (SHOW_WHISPER_MESSAGES) console.log("WHISPER from " + message.username + ": " + message.message);                break;

            case "CHEER":                           if (SHOW_SUPPORT_MESSAGES) console.log("CHEER: " + message.tags.bits.toString() + " bits from " + message.username); break;
            case "SUBSCRIPTION_GIFT_COMMUNITY":     if (SHOW_SUPPORT_MESSAGES) console.log("SUBSCRIPTION_GIFT_COMMUNITY: " + message.username + "(" + message.parameters.massGiftCount + "/" + message.parameters.senderCount + ")");       break;
            case "REWARDGIFT":                      if (SHOW_SUPPORT_MESSAGES) console.log("CHEER REWARD: " + message.username + "(" + message.parameters.totalRewardCount + ")");      break;
            case "SUBSCRIPTION_GIFT":               if (SHOW_SUPPORT_MESSAGES) console.log("GIFTED SUBSCRIPTION: " + message.username + " => " + message.parameters.recipientDisplayName + " (" + message.parameters.giftMonths + ")");     break;
            case "RAID":                            if (SHOW_SUPPORT_MESSAGES) console.log("RAID: " + message.username + " (" + message.parameters.viewerCount);        break;
            case "SUBSCRIPTION":                    if (SHOW_SUPPORT_MESSAGES) console.log("SUBSCRIPTION: " + message.username + " (" + message.parameters.cumulativeMonths + " months)"); break;
            case "RESUBSCRIPTION":                  if (SHOW_SUPPORT_MESSAGES) console.log("RESUBSCRIPTION: " + message.username + " (" + message.parameters.cumulativeMonths + " total)");  break;
            case "BITSBADGETIER":                   if (SHOW_SUPPORT_MESSAGES) console.log("BITS BADGE TIER: " + message.username); console.log(message);               break;
            case "COMMUNITYPAYFORWARD":             if (SHOW_SUPPORT_MESSAGES) console.log("COMMUNITY PAY FORWARD: " + message.username);                               break;

            case "DISCONNECTED":                    if (SHOW_PROBLEM_MESSAGES) console.log("DISCONNECTED");                                                             break;
            case "ERROR_ENCOUNTERED":               if (SHOW_PROBLEM_MESSAGES) console.log("ERROR ENCOUNTERED");                                                        break;
            case "CLEARMSG":                        if (SHOW_PROBLEM_MESSAGES) console.log("CLEARMSG: " + message.username);                                            break;
            case "AUTHENTICATION_FAILED":           if (SHOW_PROBLEM_MESSAGES) console.log("AUTHENTICATION_FAILED: " + message.username);                               break;

            default:                                if (SHOW_UNHANDLED_MESSAGES) console.log("UNHANDLED:", message);                                                    break;
        }
    };

    static onAction(channel, user, message, msg) {
        console.log("Twitch action: ", channel, user, message, msg);
    }

    static onAuthenticationFailure(message) {
        console.warn("Twitch authentication failure: ", message);
    }
}