import { TextChannelData, VoiceChannelData } from './../../../util/export';
import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import { CategoryChannel, CommandInteraction, Guild} from 'discord.js'
import fs from 'fs'
import path from 'path'
import { BackupData, RootPath } from '../../../util/export';
// import lang from '../../../util/language.json'
// const CommandLang = lang.commands.test



export class TestCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'test',
            // category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: 'CommandLang.description.desc',
            usage : 'CommandLang.description.usage',
            examples : 'CommandLang.description.exemples',
            options : [
                // {
                //     type : 'CHANNEL',
                //     name: 'option',
                //     description: 'CommandLang',
                //     autocomplete : false,
                //     required : false,
                //     }
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
        // this.client.emit('CommandLog', interaction)
        interaction.deferReply()


        const guild = interaction.guild as Guild
        const bc = JSON.parse(fs.readFileSync(path.join(RootPath,'/Json/BackUp/Backup_{0}.json').format('5VJHLUWIG' as string)).toString()) as BackupData


        const salonList = bc.channels.others
        const categoryList = (await guild.channels.fetch()).filter(c => c.type === 'GUILD_CATEGORY').toJSON()
        for (const salon of salonList) {
            switch (salon.type) {
                case 'GUILD_TEXT':
                    const c = salon as TextChannelData
                    await guild.channels.create(c.name,{
                        type: 'GUILD_TEXT',
                        topic: c.topic,
                        nsfw: c.nsfw
                    })
                    .then(async channel => {
                        await channel.setParent(categoryList.find(cat => cat.name == c.parent) as CategoryChannel)
                        .catch(err => console.log(err));
                        await channel.setPosition(c.position)
                        .catch(err => console.log(err));
                    // for (const msg of c.messages) {
                    //         // message.attachments = msg.attachments as Array<MessageAttachment>
                    //         // message.stickers = msg.stickers as Array<Sticker>
                    //         channel.send({
                    //             content:'message',
                    //             username : 'aa'
                    //         })
                    //         .then(async m => {
                    //             m.author = (await guild.members.fetch(msg.authorId)).user
                    //             if (msg.content) m.content = msg.content as string
                    //             if (msg.embeds) m.embeds = msg.embeds as Array<MessageEmbed>
                    //             m.type = msg.type
                    //             m.pinned = msg.pinned as boolean
                    //             m.editedTimestamp = msg.editedTimestamp as number
                    //         })
                    //         .catch(err => console.log(err));
                    //         break
                    //     }
                    })
                    .catch(err => console.log(err));
                    break;
                case 'GUILD_VOICE':
                    const v = salon as VoiceChannelData
                    await guild.channels.create(v.name,{
                        type: 'GUILD_VOICE',
                        bitrate: v.bitrate,
                        userLimit: v.userLimit
                    })
                    .then(async channel => {
                        await channel.setParent(categoryList.find(cat => cat.name == v.parent) as CategoryChannel)
                        .catch(err => console.log(err));
                        await channel.setPosition(v.position)
                        .catch(err => console.log(err));
                    })
                    break;
                }
        }

        return interaction.editReply({
            content:'aa'
        }) 
    }

//     onAutocomplete(interaction: AutocompleteInteraction) {
//         const focusedOption = interaction.options.getFocused(true);
//         let choices : Array<any>;
//     
//         if (focusedOption.name === "name") {
//             choices = ["faq", "install", "collection", "promise", "debug"];
//         }
//     
//         if (focusedOption.name === "theme") {
//             choices = ["halloween", "christmas", "summer"];
//         }
//     
//         const filtered = choices!.filter((choice: any) =>
//             choice.startsWith(focusedOption.value)
//         );
//         interaction
//             .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
//     }
}