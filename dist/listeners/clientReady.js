"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ready = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../util/language.json"));
const date = new Date();
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const eventLang = language_json_1.default.event.ready;
class Ready extends sheweny_1.Event {
    constructor(client) {
        super(client, "ready", {
            description: eventLang.description,
            once: true,
        });
    }
    execute() {
        // this.client.application!.commands.set([])
        const ReadyMessage = `${eventLang.message} at ${date.getHours()}H ${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`;
        console.log(ReadyMessage); //Send ready message in consol
        const channel = this.client.channels.cache.get(appConfig_json_1.default.chanels.staff.botLog); //Get logbot channel with id and check if is textchannel
        return channel.send(ReadyMessage);
    }
}
exports.Ready = Ready;
