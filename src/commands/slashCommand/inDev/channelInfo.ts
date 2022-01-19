import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import type { CommandInteraction } from 'discord.js'
// import lang from '../../../util/language.json'
// const CommandLang = lang.commands.channelInfo



export class ChannelInfoCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'get-channel-info',
            // category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: 'CommandLang.description.desc',
            usage : 'CommandLang.description.usage',
            examples : 'CommandLang.description.exemples',
            options : [
                {
                    type : 'CHANNEL',
                    name: 'salon',
                    description: 'CommandLang',
                    autocomplete : false,
                    required : true,
                    }
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly : true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    execute(interaction : CommandInteraction) {
        this.client.emit('CommandLog', interaction)
        
        console.log(interaction.options.getChannel('salon'));
        
        return interaction.reply({
            content : 'channel info'
        }) 
    }

}