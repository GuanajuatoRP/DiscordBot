
const { Guild } = require('discord.js');
const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../util/ExportEmbed');
const appConf = require('../../util/appConfig.json')
const lang = require('../../util/language.json')


class GuildBanRemoveListener extends Listener {
    constructor() {
        super('guildBanRemove', {
            emitter: 'client',
            event: 'guildBanRemove'
        });
    }

    async exec(GuildBan) {
        const auditLogs = await GuildBan.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE'
        })
        const lastEvent = auditLogs.entries.first()
        const { executor } = lastEvent
        let embed = LogsEmbed()
        embed.setAuthor(lang.event.guild.banRemove)
        embed.setDescription(`${GuildBan.user.tag} **---**\`${GuildBan.user.id}\`**---** a été débannis`)
        embed.setFooter(`Cette action a été réalisée par ${executor.username} ->${executor.id}`)

        this.client.channels.cache.get(appConf.chanels.botLog).send({ embeds: [embed] })
        this.client.channels.cache.get(appConf.chanels.botLog).send(`${GuildBan.user.tag} a été débani du serveur `)
    }
}

module.exports = GuildBanRemoveListener;