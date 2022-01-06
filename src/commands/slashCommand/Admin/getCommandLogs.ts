import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js'
import lang from '../../../util/language.json'
const cmdLang = lang.commands.getcommandlogs
import fs from 'fs'
import path from 'path'



export class GetCommandLogsCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'getcommandlogs',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage : cmdLang.description.usage,
            examples : cmdLang.description.exemples,
            options : [
                {
                    type : 'STRING',
                    name: 'file-date',
                    description: cmdLang.slashOptions.description,
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
        this.client.emit('CommandLog', interaction)
        const DateList = fs.readdirSync(path.join(__dirname,'../../../util/logs')).map(date => date.slice(11,-4)) as Array<string>
        if (!DateList.includes(interaction.options.getString('file-date')! as string)){
            return interaction.reply({
                content: cmdLang.interaction.dateError,
                ephemeral : true
            })
        }

        return interaction.reply({
            content : cmdLang.interaction.content.format(interaction.options.getString('file-date')! as string),
            files : [path.join(__dirname,`../../../util/logs/commandLog_${interaction.options.getString('file-date')!}.txt`)],
            ephemeral : true
        }) 
    }

    onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices : Array<string>;
    
        if (focusedOption.name === "file-date") {
            choices = fs.readdirSync(path.join(__dirname,'../../../util/logs')).map(date => date.slice(11,-4));
        }
    
        const filtered = choices!.filter((choice: any) =>
            choice.startsWith(focusedOption.value)
        );
        interaction
            .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    }
}