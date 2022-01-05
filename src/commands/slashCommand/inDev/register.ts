import { DefaultEmbed } from './../../../util/export';
import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import lang from '../../../util/language.json'
const registerLang = lang.commands.register



export class RegisterCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'register',
            // category: 'Misc', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: registerLang.description.desc,
            usage : registerLang.description.usage,
            examples : registerLang.description.exemples,
            options : [
                // {
                    // type : 'STRING',
                    // name: 'commande',
                    // description: '',
                    // autocomplete : false,
                    // required : false,
                    //}
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
        this.client.emit('CommandLog', interaction as CommandInteraction)
        
        // TODO: créé une requête dans le but de get la liste des user sur la bd puis check si userlist.include intercation.user
        const userAlreadyregister : Boolean = true 
        if (userAlreadyregister){
            return interaction.reply({
                content : 'Vous avez deja été enregistrer sur le Rôleplay',
                ephemeral : true
            }) 
        } else {
            const token = 'token autentification'
            let embed = DefaultEmbed()
                embed.title = registerLang.embed.title
                embed.color = registerLang.embed.color as unknown as number
                embed.fields.push({name : registerLang.embed.Fields[0].name, value :registerLang.embed.Fields[0].value, inline : true})

            const btNewAccount = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Je crée mon compte !')
                    .setStyle('LINK')
                    .setURL('https://www.youtube.com/watch?v=ORBwkXsUNEs')
            )
            interaction.reply({
                content : `Vos information d'enregistrement vont vous être envoyé en privé `,
                ephemeral : true
            })
            return interaction.user.send({
                content : token,
                embeds : [embed],
                components : [btNewAccount]
            })
        }
    }

    // onAutocomplete(interaction: AutocompleteInteraction) {
    //     const focusedOption = interaction.options.getFocused(true);
    //     let choices : any;
    
    //     if (focusedOption.name === "name") {
    //         choices = ["faq", "install", "collection", "promise", "debug"];
    //     }
    
    //     if (focusedOption.name === "theme") {
    //         choices = ["halloween", "christmas", "summer"];
    //     }
    
    //     const filtered = choices!.filter((choice: any) =>
    //         choice.startsWith(focusedOption.value)
    //     );
    //     interaction
    //         .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    // }
}