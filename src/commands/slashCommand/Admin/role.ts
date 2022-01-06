import { Command } from 'sheweny'
import {MessageActionRow , MessageButton} from 'discord.js'
import { DefaultEmbed} from '../../../util/export'
import type { ShewenyClient } from 'sheweny'
import type { CommandInteraction } from 'discord.js'
import appConfig from '../../../util/appConfig.json'
import lang from '../../../util/language.json'
const cmdLang = lang.commands.role



export class RoleCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'role',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage : cmdLang.description.usage,
            examples : cmdLang.description.exemples,
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
        
        interaction.guild!.channels.fetch(appConfig.chanels.game.salleDeJeux)
    .then(channel => {
        const guildChannel = channel
        const membersOfChannel = Array.from(guildChannel!.members)
        
        let role = DefaultEmbed()
        let teamA = new Array()
        let teamB = new Array() 
        // boucle sur la moitier supérieur du nombre de personne dans le salons salle de jeux
        for (let i = 0; i < Math.ceil(membersOfChannel.length/2); i++) {
            // fournis un nombre random entre 0 et le nombre de personne dans le salon
            let idx = Math.floor(Math.random() * (membersOfChannel.length - 0)) + 0
            // récupère puis push le user dans team A 
            let member = membersOfChannel[idx]
            teamA.push(member[1].nickname != null ? member[1].nickname : member[1].user.username)    
            // delete user de la liste    
            membersOfChannel.splice(membersOfChannel.indexOf(member),1)
        }
        // add les user restant a la 2ème team
        membersOfChannel.forEach(member => {
            teamB.push(member[1].nickname != null ? member[1].nickname : member[1].user.username)
        });
        
        role.setAuthor("Répartition des équipes")
        
        if (membersOfChannel.length > 0) {
            role.addField(cmdLang.embed.Fields[0].teamname ,`${teamA.join(",")}`,false)
            role.addField(cmdLang.embed.Fields[1].teamname,`${teamB.join(",")}`,false)
            const btGetRole = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('GetGameRole')
                        .setLabel(cmdLang.bouton.label)
                        .setStyle('PRIMARY')
                )
            return interaction.reply({
                embeds: [role],
                components: [btGetRole]
            })
        } else {
            return interaction.reply({
                content: cmdLang.interaction.error.content,
                ephemeral: true
            })
        }
    })
    }
}