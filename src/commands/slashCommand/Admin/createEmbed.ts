import { Command } from 'sheweny'
import { saveEmbed } from '../../../util/export'
import { MessageEmbed, TextChannel } from 'discord.js'
import fs from 'fs'
import path from 'path'
// import { DefaultEmbed } from '../../../util/export'
import type { ShewenyClient } from 'sheweny'
import type { CommandInteraction } from 'discord.js'
// import appConf from '../../../util/appConfig.json'
import lang from '../../../util/language.json'
const commandLang = lang.commands.createembed



export class CreateEmbedCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'createembed',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: commandLang.description.desc,
            usage : commandLang.description.usage,
            examples : commandLang.description.exemples,
            options : [
                {
                    type : 'BOOLEAN',
                    name: 'display',
                    description: commandLang.Options.Display.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'STRING',
                    name: 'color',
                    description: commandLang.Options.SetColor.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'STRING',
                    name: 'title',
                    description: commandLang.Options.SetTitle.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'STRING',
                    name: 'url',
                    description: commandLang.Options.SetUrl.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'STRING',
                    name: 'description',
                    description: commandLang.Options.SetDesc.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'STRING',
                    name: 'image',
                    description: commandLang.Options.SetImage.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'STRING',
                    name: 'thumbnail',
                    description: commandLang.Options.SetThumbnail.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'BOOLEAN',
                    name: 'add_field',
                    description: commandLang.Options.AddField.description,
                    autocomplete : false,
                    required : false,
                    },
                {
                    type : 'CHANNEL',
                    name: 'send',
                    description: commandLang.Options.SendEmbed.description,
                    autocomplete : false,
                    required : false,
                    },
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly : true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }



    async execute(interaction : CommandInteraction) {
        this.client.emit('CommandLog', interaction as CommandInteraction)

        if (interaction.options.data.length === 0){
            const embed = new MessageEmbed().setAuthor(lang.embeds.default.author, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9").setTimestamp().addFields()

            saveEmbed(embed)

            return interaction.reply({
                content : commandLang.interaction.newEmbed,
                embeds : [embed],
                ephemeral : true
            }) 
        } else if (interaction.options.data.length === 1){
            const embed = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../util/customEmbed.json')).toString())
            interaction.options.data.forEach(option => {
            switch (option.name) {
                case 'display':
                    return interaction.reply({
                        embeds : [embed],
                        ephemeral : true
                    }) 
                case 'color':
                    embed.color = option.value
                    saveEmbed(embed)
                    return interaction.reply({
                        embeds : [embed],
                        ephemeral : true
                    })
                case 'title':
                    embed.title = option.value
                    saveEmbed(embed)
                    return interaction.reply({
                        embeds : [embed],
                        ephemeral : true
                    }) 
                case 'url':
                    embed.url = option.value
                    saveEmbed(embed)
                    return interaction.reply({
                        embeds : [embed],
                        ephemeral : true
                    }) 
                case 'description':
                    embed.description = option.value
                    saveEmbed(embed)
                    return interaction.reply({
                        embeds : [embed],
                        ephemeral : true
                    }) 
                case 'image':
                    embed.image = {url : option.value}
                    saveEmbed(embed)
                    return interaction.reply({
                        embeds : [embed],
                        ephemeral : true
                    }) 
                case 'thumbnail':
                    embed.thumbnail = {url : option.value}
                    saveEmbed(embed)
                    return interaction.reply({
                        embeds : [embed],
                        ephemeral : true
                    }) 
                case 'add_field':
                    const collector = interaction.channel!.createMessageCollector({max : 4});
                    interaction.reply({
                        content : commandLang.Options.AddField.description,
                        ephemeral : true
                    }) 

                    collector.on('end', async collected => {
                        const collect = collected.map(m => m.content)
                        // console.log(collect);
                        
                        await embed.fields.push({
                            name: collect[1],
                            value: collect[2],
                            inline: (collect[3].toLowerCase() == "false" ? false : true)
                        }, )
                        saveEmbed(embed)
                        interaction.channel!.send({
                            embeds : [embed]
                        });
                    });
                case 'send':
                    if (option.channel!.type !== 'GUILD_TEXT'){
                        return interaction.reply({
                            content : commandLang.Options.SendEmbed.errorType,
                            ephemeral : true
                        })
                    }
                    const channel = option.channel as TextChannel
                    channel.send({
                        embeds : [embed]
                    })
                    console.log();
                    
                    return interaction.reply({
                        content : `votre message a bien été envoyé dans le salon **${interaction.options.getChannel('send')!.name}**`,
                        ephemeral : true
                    })
            }
        });
        } else {
            return interaction.reply({
                content : commandLang.interaction.multypleOptions,
                ephemeral : true
            })
        }

        
    }
    // onAutocomplete(interaction: AutocompleteInteraction) {
    //     const focusedOption = interaction.options.getFocused(true);
    //     let choices : any;

    //     if (focusedOption.name === "name") {
    //         choices = ["faq", "install", "collection", "promise", "debug"];
    //     }

    //     if (focusedOption.name === "theme") {
    //         choices = ["halloween", "christmas", "summer"];
    //     }

    //     const filtered = choices!.filter((choice: any) =>
    //         choice.startsWith(focusedOption.value)
    //     );
    //     interaction
    //         .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    // }
}