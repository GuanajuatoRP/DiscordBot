"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreate = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../util/language.json"));
const eventLang = language_json_1.default.event.deletePinnedMessageAlerte;
class MessageCreate extends sheweny_1.Event {
    constructor(client) {
        super(client, 'messageCreate', {
            description: eventLang.description,
            once: false,
        });
    }
    execute(message) {
        if (message.type === 'CHANNEL_PINNED_MESSAGE')
            setTimeout(() => message.delete(), 2000);
    }
}
exports.MessageCreate = MessageCreate;
