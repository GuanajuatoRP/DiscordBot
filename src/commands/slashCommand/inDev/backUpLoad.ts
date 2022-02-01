import { RootPath, BackupData } from './../../../util/export';
import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import { AutocompleteInteraction, CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import appConf from '../../../util/appConfig.json'
import lang from '../../../util/language.json'
import { DefaultEmbed } from '../../../util/export'
import fs from 'fs'
import path from 'path'
const CommandLang = lang.commands.backUpLoad



export class BackUpLoadCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'bci',
            // category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: CommandLang.description.desc,
            usage : CommandLang.description.usage,
            examples : CommandLang.description.exemples,
            options : [
                {
                    type : 'STRING',
                    name: 'id',
                    description: 'BackupId',
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
        // this.client.emit('CommandLog', interaction)


        if (!appConf.Config.backupIds.includes(interaction.options.getString('id') as string)){
            return interaction.reply({
                content:"Cette backup n'existe pas"
            })
        }

        const Backup = JSON.parse(fs.readFileSync(path.join(RootPath,'/Json/BackUp/Backup_{0}.json').format(interaction.options.getString('id') as string)).toString()) as BackupData

        let embed = DefaultEmbed()
        embed.setTitle(Backup.name)
        embed.setDescription("Created At : {0}".format(Backup.date))
        embed.addField('Id',Backup.id)

        const btnsBackUp = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("Charger la backup")
                .setStyle('SECONDARY')
                .setCustomId('LoadBackUp')
        )
        .addComponents(
            new MessageButton()
                .setLabel("Supprimer la backup")
                .setStyle('DANGER')
                .setCustomId('DeleteBackUp')
        )

        return interaction.reply({
            embeds : [embed],
            components:[btnsBackUp],
            ephemeral: true
        }) 
    }

    onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices : Array<string>
    
        if (focusedOption.name === "id") {
            choices = appConf.Config.backupIds;
        }
    
        const filtered = choices!.filter((choice: any) => 
            choice.startsWith(focusedOption.value)
        );
        interaction
            .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    }
}