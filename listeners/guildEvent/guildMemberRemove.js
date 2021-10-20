const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../util/ExportEmbed');
const appConf = require('../../util/appConfig.json')
const lang = require('../../util/language.json')


class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member) {
        let embed = LogsEmbed()
        embed.setAuthor(lang.event.guild.memberRemove)
        embed.setColor('#FF631A')
        embed.setDescription(`${member.user.tag} **--**\`${member.user.id}\`**--**`)
        embed.footer = {}
        this.client.channels.cache.get(appConf.chanels.botLog).send({
            embeds: [embed]
        })
        this.client.channels.cache.get(appConf.chanels.botLog).send(`${member.user.username} a quiter le serveur `)
    }
}

module.exports = GuildMemberRemoveListener;