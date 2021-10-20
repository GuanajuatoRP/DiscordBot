const { Guild } = require('discord.js');
const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../util/ExportEmbed');
const appConf = require('../../util/appConfig.json')
const lang = require('../../util/language.json')



class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            event: 'guildBanAdd'
        });
    }

    async exec(GuildBan) {
        const auditLogs = await GuildBan.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD'
        })
        const lastEvent = auditLogs.entries.first()
        const { executor } = lastEvent
        let embed = LogsEmbed()
        embed.setAuthor(lang.event.guild.banAdd)
        embed.addField(`${GuildBan.user.tag} **---**\`${GuildBan.user.id}\`**---** a été bannis`, `Pour la raison suivante ${GuildBan.reason}`, false)
        embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`)

        this.client.channels.cache.get(appConf.chanels.botLog).send({ embeds: [embed] })
        this.client.channels.cache.get(appConf.chanels.botLog).send(`${GuildBan.user.tag} a été ban du serveur `)
    }
}

module.exports = GuildBanAddListener;