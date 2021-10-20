const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../util/ExportEmbed');
const appConf = require('../../util/appConfig.json')
const lang = require('../../util/language.json')

class GuildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member) {
        let embed = LogsEmbed
        embed.setAuthor(lang.event.guild.memberAdd)
        embed.setColor('#34C924')
        embed.setDescription(`${member.user.tag} **--**\`${member.user.id}\`**--**`)
        embed.footer = {}
        this.client.channels.cache.get(appConf.chanels.botLog).send({
            embeds: [embed]
        })
        this.client.channels.cache.get(appConf.chanels.botLog).send(`${member.user.username} a rejoin le serveur `)
    }
}

module.exports = GuildMemberAddListener;