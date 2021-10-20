const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../../util/ExportEmbed');
const appConfig = require('../../../util/appConfig.json')
const lang = require('../../../util/language.json')
const purgeLang = lang.event.logs.salons.purge


class MessageDeleteBulkListener extends Listener {
    constructor() {
        super('messageDeleteBulk', {
            emitter: 'client',
            event: 'messageDeleteBulk'
        });
    }

    async exec(messages) {
        const auditLogs = await messages.first().guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_BULK_DELETE'
        })
        const lastEvent = auditLogs.entries.first()
        const { executor } = lastEvent

        let Embed = LogsEmbed()
        Embed.setColor('#FF631A')
        Embed.setAuthor(purgeLang.embed.author)
        Embed.addFields({ name: 'Salons d\`utilisation', value: `${this.client.channels.cache.get(messages.first().channelId).name}`, inline: true }, /*{ name: `Nombre de messages suprimer`, value: `$`, inline: true }, */ )
        Embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`)

        this.client.channels.cache.get(appConfig.chanels.botLog).send({ embeds: [Embed] })
    }
}

module.exports = MessageDeleteBulkListener;