import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import { AutocompleteInteraction, CommandInteraction, MessageEmbed } from 'discord.js'
import lang from '../../../util/language.json'
const CommandLang = lang.commands.inscriptionPermis



export class InscriptionPermisCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'inscription-permis',
            // category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: CommandLang.description.desc,
            usage : CommandLang.description.usage,
            examples : CommandLang.description.exemples,
            options : [
                {
                    type : 'STRING',
                    name: 'permis',
                    description: "CommandLang",
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
        
        let embed = new MessageEmbed()
            .setTitle("Formulaire d'inscription")
            .setDescription("Inscription au permis et aux stages de conduites")
            .setColor("#ffa200")
            .setFooter("Inscription de : {0}#{1}".format(interaction.member.user.username,interaction.member.user.discriminator))
            .addFields(
                {name : "First Name",value: "JeanJack", inline:true},
                {name : "Last Name",value: "GoldMan", inline:true},
                {name : "Examain Souhaiter ",value: interaction.options.getString('permis')!.toString(), inline:false},
                {name : "Permis Actuel",value: "Aucun", inline:true},
                {name : "Points sur le permis",value: "5", inline:true},
                {name : "Stage de conduite Actuel",value: "B, C, A", inline:true},
            )

        return interaction.reply({
            embeds : [embed]
        }) 
    }

    onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices : Array<any>;
    
        if (focusedOption.name === "permis") {
            choices = ["Probatoire", "B", "C", "A", "S1", "S2"];
        }
    
        const filtered = choices!.filter((choice: any) =>
            choice.startsWith(focusedOption.value)
        );
        interaction
            .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    }
}