"use strict";
// import { ApplicationCommandOptionType } from './../.discord.js';
// import { Command } from 'sheweny'
// import { DefaultEmbed, saveEmbed } from '../../../util/export'
// import { TextChannel } from 'discord.js'
// import fs from 'fs'
// import path from 'path'
// // import { DefaultEmbed } from '../../../util/export'
// import type { ShewenyClient } from 'sheweny'
// import type { CommandInteraction } from 'discord.js'
// // import appConf from '../../../util/appConfig.json'
// import lang from '../../../util/language.json'
// const cmdLang = lang.commands.createembed
// export class CreateEmbedCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'createembed',
//             category: 'Admin', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : ApplicationCommandOptionType.Boolean,
//                     name: 'display',
//                     description: cmdLang.Options.Display.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'STRING',
//                     name: 'color',
//                     description: cmdLang.Options.SetColor.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'STRING',
//                     name: 'title',
//                     description: cmdLang.Options.SetTitle.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'STRING',
//                     name: 'url',
//                     description: cmdLang.Options.SetUrl.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'STRING',
//                     name: 'description',
//                     description: cmdLang.Options.SetDesc.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'STRING',
//                     name: 'image',
//                     description: cmdLang.Options.SetImage.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'STRING',
//                     name: 'thumbnail',
//                     description: cmdLang.Options.SetThumbnail.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'BOOLEAN',
//                     name: 'add_field',
//                     description: cmdLang.Options.AddField.description,
//                     autocomplete : false,
//                     required : false,
//                     },
//                 {
//                     type : 'CHANNEL',
//                     name: 'send',
//                     description: cmdLang.Options.SendEmbed.description,
//                     autocomplete : false,
//                     required : false,
//                     channelTypes : ['GUILD_TEXT']
//                     },
//             ],
//             defaultPermission : true,
//             // channel : '', //* Default Channel is GUILD
//             // cooldown : , //* Default cooldown set at 2sec
//             adminsOnly : true, //* Default value is false 
//             //userPermissions : [],
//             //clientPermissions : []
//         });
//     }
//     async execute(interaction : CommandInteraction) {
//         this.client.emit('CommandLog', interaction as CommandInteraction)
//         if (interaction.options.data.length === 0){
//             const embed = DefaultEmbed()
//             saveEmbed(embed)
//             return interaction.reply({
//                 content : cmdLang.interaction.newEmbed,
//                 embeds : [embed],
//                 ephemeral : true
//             }) 
//         } else if (interaction.options.data.length === 1){
//             const embed = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../util/customEmbed.json')).toString())
//             interaction.options.data.forEach(option => {
//             switch (option.name) {
//                 case 'display':
//                     return interaction.reply({
//                         embeds : [embed],
//                         ephemeral : true
//                     }) 
//                 case 'color':
//                     embed.color = option.value
//                     saveEmbed(embed)
//                     return interaction.reply({
//                         embeds : [embed],
//                         ephemeral : true
//                     })
//                 case 'title':
//                     embed.title = option.value
//                     saveEmbed(embed)
//                     return interaction.reply({
//                         embeds : [embed],
//                         ephemeral : true
//                     }) 
//                 case 'url':
//                     embed.url = option.value
//                     saveEmbed(embed)
//                     return interaction.reply({
//                         embeds : [embed],
//                         ephemeral : true
//                     }) 
//                 case 'description':
//                     embed.description = option.value
//                     saveEmbed(embed)
//                     return interaction.reply({
//                         embeds : [embed],
//                         ephemeral : true
//                     }) 
//                 case 'image':
//                     embed.image = {url : option.value}
//                     saveEmbed(embed)
//                     return interaction.reply({
//                         embeds : [embed],
//                         ephemeral : true
//                     }) 
//                 case 'thumbnail':
//                     embed.thumbnail = {url : option.value}
//                     saveEmbed(embed)
//                     return interaction.reply({
//                         embeds : [embed],
//                         ephemeral : true
//                     }) 
//                 case 'add_field':
//                     const collector = interaction.channel!.createMessageCollector({max : 4});
//                     interaction.reply({
//                         content : cmdLang.Options.AddField.description,
//                         ephemeral : true
//                     }) 
//                     const salon = interaction.channel as TextChannel
//                     collector.on('end', async collected => {
//                         const collect = collected.map(m => m.content)
//                         await embed.fields.push({
//                             name: collect[1],
//                             value: collect[2],
//                             inline: (collect[3].toLowerCase() == "false" ? false : true)
//                         }, )
//                         saveEmbed(embed)
//                         salon.send({
//                             embeds : [embed]
//                         });
//                     });
//                     break
//                 case 'send':
//                     const channel = interaction.options.getChannel('send') as TextChannel
//                     channel.send({
//                         embeds : [embed]
//                     })
//                     console.log();
//                     return interaction.reply({
//                         content : `votre message a bien été envoyé dans le salon **${interaction.options.getChannel('send')!.name}**`,
//                         ephemeral : true
//                     })
//             }
//         });
//         } else {
//             return interaction.reply({
//                 content : cmdLang.interaction.multypleOptions,
//                 ephemeral : true
//             })
//         }
//     }
// }
