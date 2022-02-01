import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import { CommandInteraction, Guild, OverwriteData, OverwriteResolvable, Role, } from 'discord.js'
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
        
        const guild = interaction.guild as Guild
        const bc = JSON.parse(fs.readFileSync(path.join(RootPath,'/Json/BackUp/Backup_{0}.json').format('B8BCASCM7' as string)).toString()) as BackupData


        bc.channels.categories.forEach((categoryData) => {
            let finalPermissions = new Array<OverwriteResolvable>()

            categoryData.permissions.forEach((perm) => {
                const r = guild.roles.cache.find((r) => r.name == perm.roleName) as Role
                console.log(guild.roles.cache.get(r.id)!.name)

                if (r) {
                    finalPermissions.push({
                        id: r.id,
                        allow: BigInt(perm.allow),
                        deny: BigInt(perm.deny)
                    } as OverwriteData );
                }
            })
            // console.log(finalPermissions);
        })

        return interaction.reply({
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