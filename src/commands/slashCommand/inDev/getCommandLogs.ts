import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js'
import lang from '../../../util/language.json'
const getcommandlogsLang = lang.commands.getcommandlogs
import fs from 'fs'
import path from 'path'
// import util from 'util'



export class GetCommandLogsCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'getcommandlogs',
            // category: 'dev', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: getcommandlogsLang.description.desc,
            usage : getcommandlogsLang.description.usage,
            examples : getcommandlogsLang.description.exemples,
            options : [
                {
                    type : 'STRING',
                    name: 'file-date',
                    description: getcommandlogsLang.slashOptions.description,
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
                content: getcommandlogsLang.interaction.dateError,
                ephemeral : true
            })
        }

        return interaction.reply({
            content : ''.format(interaction.options.getString('file-date')! as string),
            // content : util.format('Voici le fichier de CommandLogs qui correspond a la date du {0}', interaction.options.getString('file-date')! as string),
            files : [path.join(__dirname,`../../../util/logs/commandLog_${interaction.options.getString('file-date')!}.txt`)],
            // ephemeral : true
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