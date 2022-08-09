import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import lang from '../util/language.json'
const date = new Date()
import appConfig from '../util/appConfig.json'
import type { TextChannel } from "discord.js";
import { app } from '../APIToBot/api'
const eventLang = lang.event.ready


export class Ready extends Event {
    constructor(client: ShewenyClient) {
        super(client, "ready", {
            description: eventLang.description,
            once: true,
        });
    }

    execute() {
      app.listen(process.env.PORT, () => console.log(`server started at http://localhost:${process.env.PORT}`));

        const ReadyMessage = `${eventLang.message} at ${date.getHours()}H ${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
        
        console.log(ReadyMessage); //Send ready message in consol
    
        const channel = this.client.channels.cache.get(appConfig.chanels.staff.botLog)! as TextChannel //Get logbot channel with id and check if is textchannel
        return channel.send(ReadyMessage);
    
    }
}
