// import { ChannelTypes } from 'discord.js/typings/enums';
// import { Command } from 'sheweny'
// import * as fs from 'fs'
// import * as path from 'path'
// import {AutocompleteInteraction} from 'discord.js'
// import { ChannelClass } from '../../../tools/export'
// import type { ShewenyClient } from 'sheweny'
// import type { CommandInteraction } from 'discord.js'
// import appConf from '../../../util/appConfig.json'
// import lang from '../../../../tools/language.json'
// const cmdLang = lang.commands.game

// export class GameCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'game',
//             category: 'Admin', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : 'STRING',
//                     name: 'game_name',
//                     description: cmdLang.menu.Placeholder,
//                     autocomplete : true,
//                     required : true,
//                 }
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

//         const rawData = fs.readFileSync(path.join(__dirname, '../../../util/channelGame.json')).toString()
//         const channels = JSON.parse(rawData)

//         channels[interaction.options.getString('game_name')!].forEach((salon : ChannelClass)  => {
//             interaction.guild!.channels.create(salon.name.toString(), {
//                     "type": salon.channelInfo.type.toString() == '2' ? ChannelTypes.GUILD_VOICE : ChannelTypes.GUILD_TEXT,
//                     "parent": appConf.chanels.game.categorie,
//                     "position": salon.channelInfo.position
//                 })
//                 .then((channel : any ) => {
//                     channel.permissionOverwrites.set(salon.channelInfo.permissionOverwrites)

//                     switch (channel.type) {
//                         case 'GUILD_TEXT':

//                             salon.messages.forEach((el : any) => {
//                                 const obj = el[1]
//                                 if (obj.content) {
//                                     channel.send({
//                                         content: `${obj.content}`,
//                                         embeds: obj.embeds,
//                                         components: obj.components,
//                                         mentions: obj.mentions
//                                     }).then((newMessage : any) => {
//                                         if (obj.pinned) newMessage.pin()
//                                     })
//                                 } else {
//                                     channel.send({
//                                         embeds: obj.embeds,
//                                         components: obj.components,
//                                         mentions: obj.mentions
//                                     }).then((newMessage : any) => {
//                                         if (obj.pinned) newMessage.pin()
//                                     })
//                                 }
//                             });
//                             break;
//                         case 'GUILD_VOICE':

//                             channel.setUserLimit(salon.channelInfo.userLimit)
//                             break;
//                     }
//                 })
//         });

//         interaction.reply({
//             content: `Tous les salons pour le mode de jeux \*\*${interaction.options.getString('game_name')}\*\* ont été créé`,
//             ephemeral : true
//         })
//     }

//     onAutocomplete(interaction: AutocompleteInteraction) {
//         const focusedOption = interaction.options.getFocused(true);
//         let choices: Array<string> = new Array<string>()

//         const rawData = fs.readFileSync(path.join(__dirname, '../../../util/channelGame.json')).toString()
//         const channels = JSON.parse(rawData)

//         Object.keys(channels).forEach(key => {
//             choices.push(key)
//         });

//         if (focusedOption.name === 'game_name') {
//             choices
//         }

//         const filtered = choices!.filter((choice: any) =>
//             choice.startsWith(focusedOption.value)
//         )
//         interaction
//             .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
//     }
// }
