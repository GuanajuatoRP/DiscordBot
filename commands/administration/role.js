const { Command } = require('discord-akairo');
const appConfig = require('../../util/appConfig.json')
const { DefaultEmbed } = require('../../util/ExportEmbed');
const { MessageActionRow, MessageButton } = require('discord.js');
const lang = require('../../util/language.json');
const roleLang = lang.commands.number

class RoleCommand extends Command {
    constructor() {
        super('role', {
            aliases: ['role'],
            category: 'Administration',
            typing:false,
            description: {
                content : roleLang.desc,
                usage: roleLang.usage,
                exemples: ['role']
            },
            slash : true
        });
    }

    exec(message) {
        message.delete();
        message.guild.channels.fetch('914908463027589181')
        .then(channel => {
            const guildChannel = channel
            const membersOfChannel = guildChannel.members
            let result = []
            let nb
            let role = DefaultEmbed()
            let teamA = []
            let teamB = []
            for (let i = 0; i < Math.round(membersOfChannel.size/2); i++) {
                do {
                    nb = Math.floor(Math.random() * (membersOfChannel.size - 1 + 1) + 1)
                } while (result.includes(nb));
                result.push(nb)
            } 

            let idx = 1
            membersOfChannel.forEach(member => {
                if (!result.includes(idx)){
                    teamA.push(member.user.username)
                } else {
                    teamB.push(member.user.username)
                }
                // *Permet de déplacé un GuildMember dans un GuildChannel de type vocal
                // *message.guild.channels.fetch((result.includes(idx))?appConfig.chanels.staff.aide:appConfig.chanels.staff.salleAttente)
                // *.then(channel => member.voice.setChannel(channel))
                idx++
            });
            role.setAuthor("Répartition des équipes")
            role.addField("Police :oncoming_police_car: :",`${teamA.join(",")}`,false)
            role.addField("Civils :blue_car: :",`${teamB.join(",")}`,false)

            // message.channel.send({
            //     embeds: [role],
            // })

        })
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
                role.addField("Team :regional_indicator_a: :",`${teamA.join(",")}`,false)
                role.addField("Team :b: :",`${teamB.join(",")}`,false)
                const btGetRole = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('GetRole')
                            .setLabel('Obtenir un role')
                            .setStyle('PRIMARY')
                    )
    
                return message.interaction.reply({
                    embeds: [role],
                    components: [btGetRole]
                })
            } else {
                return message.interaction.reply({
                    content: 'Le nombre minimal de personne requise pour cette commande est de 2',
                    ephemeral: true
                })
            }

        })
    }
}

module.exports = RoleCommand;