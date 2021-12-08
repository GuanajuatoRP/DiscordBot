const { Command } = require('discord-akairo');
const appConfig = require('../../util/appConfig.json')
const { DefaultEmbed } = require('../../util/ExportEmbed');
const { MessageActionRow, MessageButton } = require('discord.js');
const lang = require('../../util/language.json');
const roleLang = lang.commands.role

class RoleCommand extends Command {
    constructor() {
        super('role', {
            aliases: ['role'],
            category: 'Administration',
            typing:false,
            description: {
                content : roleLang.description.desc,
                usage: roleLang.description.usage,
                exemples: roleLang.description.exemples
            },
            slash : true,
            slashOnly: true
        });
    }
    execSlash(message) {
        message.guild.channels.fetch(appConfig.chanels.game.salleDeJeux)
        .then(channel => {
            const guildChannel = channel
            const membersOfChannel = [...guildChannel.members]
            let role = DefaultEmbed()
            let teamA = []
            let teamB = []
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

            if (membersOfChannel.length >= 2) {
                role.addField(roleLang.embed.Fields[0].teamname ,`${teamA.join(",")}`,false)
                role.addField(roleLang.embed.Fields[1].teamname,`${teamB.join(",")}`,false)
                const btGetRole = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('GetRole')
                            .setLabel(roleLang.bouton.label)
                            .setStyle('PRIMARY')
                    )
    
                return message.interaction.reply({
                    embeds: [role],
                    components: [btGetRole]
                })
            } else {
                return message.interaction.reply({
                    content: roleLang.interaction.error.content,
                    ephemeral: true
                })
            }

        })
    }
}

module.exports = RoleCommand;