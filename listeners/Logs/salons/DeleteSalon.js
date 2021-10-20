const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../../util/ExportEmbed');
const appConfig = require('../../../util/appConfig.json')
const lang = require('../../../util/language.json')
const DelChanLang = lang.event.logs.salons.delete




class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    async exec(GuildChannel) {
        const auditLogs = await GuildChannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_DELETE'
        })
        const lastEvent = auditLogs.entries.first()
        const { executor } = lastEvent

        let RemoveChannel = LogsEmbed()
        RemoveChannel.setColor('#FF631A')
        RemoveChannel.setAuthor(DelChanLang.embed.author)
        RemoveChannel.addField('Nom du salon', `${GuildChannel.name}`, true)
        RemoveChannel.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`)

        this.client.channels.cache.get(appConfig.chanels.botLog).send({ embeds: [RemoveChannel] })
    }
}

module.exports = ChannelDeleteListener;