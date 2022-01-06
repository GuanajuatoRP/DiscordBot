import { Command } from "sheweny"
import { DefaultEmbed} from '../../../util/export'
import {stripIndents} from 'common-tags'
import type { ShewenyClient } from "sheweny"
import type { CommandInteraction, AutocompleteInteraction } from "discord.js"
import lang from '../../../util/language.json'
const cmdLang = lang.commands.adminhelp

export class AdminHelpCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'adminhelp',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage : cmdLang.description.usage,
            examples : cmdLang.description.exemples,
            options : [
                {   type : 'STRING',
                    name: 'commande',
                    description: cmdLang.slashOptions.description,
                    autocomplete : true,
                }
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly : true, //* Default value is false 
            // userPermissions : [],
            // clientPermissions : []
        });
    }
    execute(interaction : CommandInteraction) {
        this.client.emit('CommandLog', interaction as CommandInteraction)
        let commandName = interaction.options
        const commands = Array.from(this.client.util.getCommands()) //Get All Commands loaded for the bot 
        
        
        if (!commandName.get('commande')){ //si aucune commande est donner en paramètre
            let allCategory = new Array //Get All Unnique Catégory
            this.client.collections.commands.forEach(command => {
                if (command.category === 'InDev' || command.category === 'Admin'){
                    if (!allCategory.includes(command.category)){
                        allCategory.push(command.category)
                    }
                }
            });


            let Embed = DefaultEmbed()
                .setColor('#FF0000')
                .setDescription(lang.commands.help.description.desc)
            

            for (const category of allCategory) {
                const commandOfCategory : Array<string> = commands.filter(c => c.category === `${category}` && c.adminsOnly === true && c.type === 'SLASH_COMMAND').map(c => `\`${c.name}\``)

                if (commandOfCategory.length == 0 ) commandOfCategory.push('No Command in this Category')
                
                Embed.addField(
                        `${category}`,
                        `${commands.filter(c => c.category === `${category}` && c.adminsOnly === true && c.type === 'SLASH_COMMAND')
                                    .map(c => `\`${c.name}\``)
                                    .join(', ')}`
                )
            }
            
            Embed.addField(cmdLang.embed.fields.info.name, cmdLang.embed.fields.info.value)
            return interaction.reply({
                embeds: [Embed],
                ephemeral: true
            }) 
        } else if (commandName.get('commande')){ //si une commande est donner en paramètre
            const CName = `${commandName.get('commande')!.value}` //récupération du nom 
            const command = this.client.collections.commands.get(CName);//récupération du nom 
            
            if (!commands.map(c => c.name).includes(CName)){
                return interaction.reply({
                    content: cmdLang.interaction.wrongName.format(CName),
                    ephemeral : true
                }) 
            }
            if (command!.adminsOnly === false){
                return interaction.reply({
                    content: cmdLang.interaction.noRead.format(CName),
                    ephemeral : true
                }) 
            }

            return interaction.reply({
                content: stripIndents`
                \`\`\`makefile
                    [AdminHelp : ${command!.name}]                ⚠️⚠️!!! AdminOnly !!!⚠️⚠️
                    [Catégorie : ${command!.category}]
                    ${command!.description}

                    Utilisation: /${command!.usage}
                    Exemple${Array.from(command!.examples!).length == 1 ? '' : 's'}: /${Array.from(command!.examples!).join(`, /`)}


                    <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                    Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
                \`\`\`               
                `,
                ephemeral : true
            }) 


        }
    }
    
    onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
    
        const choices: Array<string> = Array.from(this.client.util.getCommands()).filter(c => c.category == `InDev` || c.category == `Admin` && c.adminsOnly === true && c.type === 'SLASH_COMMAND').map(c => c.name)
    
        if (focusedOption.name === "commande") {
            choices
        }
    
        const filtered = choices!.filter((choice: any) =>
            choice.startsWith(focusedOption.value)
        )
        interaction
            .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    }
}