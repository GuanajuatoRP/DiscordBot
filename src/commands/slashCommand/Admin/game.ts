import { Command } from 'sheweny'
import * as fs from 'fs'
import * as path from 'path'
import {AutocompleteInteraction} from 'discord.js'
import type { ShewenyClient } from 'sheweny'
import type { CommandInteraction } from 'discord.js'

import lang from '../../../util/language.json'
const gameLang = lang.commands.game
    
    
    
export class GameCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'game',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: gameLang.description.desc,
            usage : gameLang.description.usage,
            examples : gameLang.description.exemples,
            options : [
                {
                    type : 'STRING',
                    name: 'game_name',
                    description: gameLang.menu.Placeholder,
                    autocomplete : true,
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
        const rawData = fs.readFileSync(path.join(__dirname, '../../../util/channelGame.json')).toString()
        const channels = JSON.parse(rawData)

        channels[interaction.options.getString('game_name')!].forEach((salon : any)  => {
            interaction.guild!.channels.create(salon.name, {
                    "type": salon.channelInfo.type,
                })
                .then((channel : any ) => {
                    channel.setParent('905214164950196224')
                    channel.permissionOverwrites.set(salon.channelInfo.permissionOverwrites)
                    switch (channel.type) {
                        case 'GUILD_TEXT':
                            salon.messages.forEach((el : any) => {
                                const obj = el[1]
                                if (obj.content) {
                                    channel.send({
                                        content: `${obj.content}`,
                                        embeds: obj.embeds,
                                        components: obj.components,
                                        mentions: obj.mentions
                                    }).then((newMessage : any) => {
                                        if (obj.pinned) newMessage.pin()
                                    })
                                } else {
                                    channel.send({
                                        embeds: obj.embeds,
                                        components: obj.components,
                                        mentions: obj.mentions
                                    }).then((newMessage : any) => {
                                        if (obj.pinned) newMessage.pin()
                                    })
                                }
                            });
                            break;
                        case 'GUILD_VOICE':
                            channel.edit({
                                position: salon.channelInfo.position,
                                userLimit: salon.channelInfo.userLimit,
                            })
                            break;
                    }
                })
        });
        interaction.reply({
            content: `Tous les salons pour le mode de jeux \*\*${interaction.options.getString('game_name')}\*\* ont été créé`,
            ephemeral: true,
        })
    }



    onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices: Array<string> = new Array<string>()

        
        const rawData = fs.readFileSync(path.join(__dirname, '../../../util/channelGame.json')).toString()
        const channels = JSON.parse(rawData)

        Object.keys(channels).forEach(key => {
            choices.push(key)
        });


    
        if (focusedOption.name === 'game_name') {
            choices
        }
    
        const filtered = choices!.filter((choice: any) =>
            choice.startsWith(focusedOption.value)
        )
        interaction
            .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    }
}