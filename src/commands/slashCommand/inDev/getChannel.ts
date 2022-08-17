// import { ChannelTypes } from 'discord.js/typings/enums';
// import { Command } from 'sheweny'
// import fs from 'fs'
// import { ChannelClass } from '../../../tools/export'
// import type { ShewenyClient } from 'sheweny'
// import type { AutocompleteInteraction, CommandInteraction, PermissionOverwrites, TextChannel, VoiceChannel } from 'discord.js'
// import lang from '../../../tools/language.json'

// const cmdLang = lang.commands.getchannel

// export class GetChannelCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'getchannel',
//             category: 'Admin', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : 'CHANNEL',
//                     name: 'category',
//                     description: cmdLang.slashOptions.category,
//                     autocomplete : false,
//                     required : false,
//                     channelTypes : ['GUILD_CATEGORY']
//                 },
//                 {
//                     type : 'CHANNEL',
//                     name: 'salon',
//                     description: cmdLang.slashOptions.salon,
//                     autocomplete : false,
//                     required : false,
//                     channelTypes : ['GUILD_VOICE','GUILD_TEXT','GUILD_STAGE_VOICE','GUILD_NEWS']
//                     }
//             ],
//             defaultPermission : true,
//             // channel : '', //* Default Channel is GUILD
//             // cooldown : , //* Default cooldown set at 2sec
//             adminsOnly : true, //* Default value is false
//             //userPermissions : [],
//             //clientPermissions : []
//         });
//     }
//     execute(interaction : CommandInteraction) {
//         if (interaction.options.data.length != 1) {
//             return interaction.reply({
//                 content : cmdLang.interaction.needOptions,
//                 ephemeral : true
//             })
//         }

//         this.client.emit('CommandLog', interaction as CommandInteraction)
//         let channlesIds : Array<String> = new Array<String>()

//         switch (interaction.options.data[0].name){
//             case 'category':
//                 const catId = interaction.options.getChannel('category')!.id
//                 channlesIds = (Array.from(interaction.guild!.channels.cache.filter(c => c.parentId == catId && c.id != catId).map(c => c.id)))
//                 break;
//             case 'salon':
//                 channlesIds.push(interaction.options.getChannel('salon')!.id)
//                 break;
//         }

//         channlesIds.forEach(id => {
//             const channel = interaction.guild!.channels.cache.filter(c => c.id == id)
//             switch (channel!.first()!.type) {
//                 case 'GUILD_TEXT':
//                     let salon = new ChannelClass()
//                     const textChannel : TextChannel = channel.map(c => c)[0] as TextChannel

//                     salon.name = textChannel.name,
//                     salon.channelInfo.type = ChannelTypes.GUILD_TEXT
//                     salon.channelInfo.topic = textChannel.type
//                     salon.channelInfo.permissionOverwrites = textChannel!.permissionOverwrites.cache.toJSON() as Array<PermissionOverwrites>
//                     salon.channelInfo.position = textChannel.position + 1
//                     console.log(salon.name+" "+salon.channelInfo.position);

//                     textChannel.messages.fetch()
//                         .then(msg => {
//                             const messageTab = [...msg].reverse()
//                             salon.messages = messageTab
//                             fs.appendFile('cat.json', `${JSON.stringify(salon)},\n`, (err) => {
//                                 if (err) throw err;
//                             })
//                         });
//                     break;
//                 case 'GUILD_VOICE':
//                     let salonVocal = new ChannelClass()
//                     const voiceChannel : VoiceChannel = channel.map(c => c)[0] as VoiceChannel

//                     salonVocal.name = voiceChannel.name,
//                     salonVocal.channelInfo.type = ChannelTypes.GUILD_VOICE
//                     salonVocal.channelInfo.permissionOverwrites = voiceChannel!.permissionOverwrites.cache.toJSON()
//                     salonVocal.channelInfo.position = voiceChannel.position
//                     salonVocal.channelInfo.userLimit = voiceChannel.userLimit
//                     fs.appendFile('cat.json', `${JSON.stringify(salonVocal)},\n`, (err) => {
//                         if (err) throw err;
//                     })
//                     break;
//             }
//         })

//         return interaction.reply({
//             content : cmdLang.interaction.content,
//             ephemeral : true
//         })
//     }
//     onAutocomplete(interaction: AutocompleteInteraction) {
//         const focusedOption = interaction.options.getFocused(true);

//         let choices: Array<String>;

//         if (focusedOption.name === "category") {
//             choices = Array.from(interaction.guild!.channels.cache.filter(c => c.type == 'GUILD_CATEGORY').map(c => c.name))
//         }

//         if (focusedOption.name === "salon") {
//             choices = Array.from(interaction.guild!.channels.cache.filter(c => c.type != 'GUILD_CATEGORY').map(c => c.name))
//         }

//         const filtered = choices!.filter((choice: any) =>
//             choice.startsWith(focusedOption.value)
//         );
//         interaction.respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
//     }
// }
