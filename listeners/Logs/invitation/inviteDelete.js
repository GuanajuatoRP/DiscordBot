const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../../util/ExportEmbed');
const appConf = require('../../../util/appConfig.json')
const lang = require('../../../util/language.json')
const inviteDelete = lang.event.logs.invitation.delete


class InviteDeleteListener extends Listener {
    constructor() {
        super('inviteDelete', {
            emitter: 'client',
            event: 'inviteDelete'
        });
    }

    async exec(invite) {
        const auditLogs = await invite.guild.fetchAuditLogs({
            limit: 1,
            type: 'INVITE_DELETE'
        })
        const lastEvent = auditLogs.entries.first()
        const { executor } = lastEvent

        let Embed = LogsEmbed()
        Embed.setColor('#004704')
        Embed.setAuthor(inviteDelete.embed.author)
        Embed.addFields({ name: 'URL du lien', value: `${invite.url}`, inline: true }, { name: `Code de l'invitation`, value: `${invite.code}`, inline: true }, { name: `Salons visé par l'invitation`, value: `${invite.channel}`, inline: true }, )
        Embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`)

        this.client.channels.cache.get(appConf.chanels.botLog).send({ embeds: [Embed] })
    }
}

module.exports = InviteDeleteListener;