import { Command } from 'sheweny'
import fs from 'fs'
import { ChannelObject } from '../../../util/export'
import type { ShewenyClient } from 'sheweny'
import type { CommandInteraction, TextChannel, VoiceChannel } from 'discord.js'
import lang from '../../../util/language.json'
const getchannelLang = lang.commands.getchannel



export class GetChannelCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'getchannel',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: getchannelLang.description.desc,
            usage : getchannelLang.description.usage,
            examples : getchannelLang.description.exemples,
            options : [
                {
                    type : 'CHANNEL',
                    name: 'category',
                    description: 'Nom de la catégorie a save',
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
        this.client.emit('CommandLog', interaction as CommandInteraction)
        
        let salon = Object.create(ChannelObject)
        let permissions : Array<any>
        let permissionsList = new Array();
        
        switch (interaction.options.data[0].channel!.type) {
            
            case 'GUILD_TEXT':
                const textChannel : TextChannel = interaction.options.data[0].channel as TextChannel
                permissions = [...textChannel!.permissionOverwrites.cache]
                permissions.forEach(permission => {
                    permissionsList.push(permission[1])
                });
                salon.channelInfo = {
                    "type": textChannel.type,
                    "topic": textChannel.topic,
                    "permissionOverwrites": permissionsList,
                    "position": textChannel.position
                }
                textChannel.messages.fetch()
                    .then(msg => {
                        const messageTab = [...msg].reverse()
                        salon.messages = messageTab
                        fs.appendFile('cat.json', `${JSON.stringify(salon)},`, (err) => {
                            if (err) throw err;
                        })
                    });
                break;
            case 'GUILD_VOICE':
                const voiceChannel : VoiceChannel = interaction.options.data[0].channel as VoiceChannel
                permissions = [...voiceChannel!.permissionOverwrites.cache]
                permissions.forEach(permission => {
                    permissionsList.push(permission[1])
                });
                salon.channelInfo = {
                    "type": voiceChannel.type,
                    "permissionOverwrites": permissionsList,
                    "position": voiceChannel.rawPosition,
                    "userLimit": voiceChannel.userLimit,
                }
                fs.appendFile('cat.json', `${JSON.stringify(salon)},`, (err) => {
                    if (err) throw err;
                })
                break;
        }

        return interaction.reply({
            content : 'getchannel',
            ephemeral : true
        }) 
    }
}