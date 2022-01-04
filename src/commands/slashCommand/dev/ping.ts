import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import lang from '../../../util/language.json'
import { CommandLog } from "../../../util/export";
const pingLang = lang.commands.ping

export class PingCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: "ping",
            category: 'Dev', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: pingLang.description.desc,
            usage : pingLang.description.usage,
            examples : pingLang.description.exemples,
            options : [

                // {   type : 'STRING',
                    // name: 'commande',
                    // description: '',
                    // autocomplete : false,
                    // required : false,
                    // choices : []}
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : , //* Default value is false 
            defaultPermission : true,
            userPermissions : [],
            clientPermissions : []
        });
    }
    execute(interaction: CommandInteraction) {
        CommandLog(interaction.guild!.members.cache.get(interaction.user.id)!,interaction)
        
        const start = Date.now()
        interaction.reply({ content: "Pong !" }).then(() => {
            const end = Date.now()
            const time = end - start
            interaction.editReply({content : `Pong : ${time}ms`})
        })
    }
}
