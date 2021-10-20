const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../../util/ExportEmbed');
const appConf = require('../../../util/appConfig.json')
const lang = require('../../../util/language.json')
const chanCreatLang = lang.event.logs.salons.create



class ChannelCreateListener extends Listener {
    constructor() {
        super('channelCreate', {
            emitter: 'client',
            event: 'channelCreate'
        });
    }

    async exec(GuildChannel) {
        const auditLogs = await GuildChannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_CREATE'
        })
        const lastEvent = auditLogs.entries.first()
        const { executor } = lastEvent

        let embed = LogsEmbed()
        embed.setColor('#0095F2')
        embed.setAuthor(chanCreatLang.embed.author)
        embed.addFields({ name: 'Nom du salon', value: `${GuildChannel.name}`, inline: true }, { name: 'Type du salon', value: `${GuildChannel.type}`, inline: true }, { name: 'Nsfw', value: (lastEvent.target.nsfw) ? 'Activer' : 'Désactiver', inline: false })
        embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`)

        this.client.channels.cache.get(appConf.chanels.botLog).send({ embeds: [embed] })
    }
}

module.exports = ChannelCreateListener;