import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import lang from '../util/language.json'
const date = new Date()
import appConfig from '../util/appConfig.json'
import type { TextChannel } from "discord.js";


export class Ready extends Event {
    constructor(client: ShewenyClient) {
        super(client, "ready", {
            description: "send message in botLog Channel when the bot as start",
            once: true,
        });
    }

    execute() {
        this.client.application!.commands.set([])
        const ReadyMessage = `${lang.event.ready.message} at ${date.getHours()}H ${date.getMinutes()}`
        
        console.log(ReadyMessage); //Send ready message in consol
    
        const channel = this.client.channels.cache.get(appConfig.chanels.staff.botLog)! as TextChannel //Get logbot channel with id and check if is textchannel
        channel.send(ReadyMessage);
    
    }
}
