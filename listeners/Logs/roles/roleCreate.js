const { Listener } = require('discord-akairo');
const { LogsEmbed } = require('../../../util/ExportEmbed');
const appConf = require('../../../util/appConfig.json')
const lang = require('../../../util/language.json')
const roleCreate = lang.event.logs.role.create


class RoleCreateListener extends Listener {
    constructor() {
        super('roleCreate', {
            emitter: 'client',
            event: 'roleCreate'
        });
    }

    async exec(role) {
        const auditLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_CREATE'
        })
        const lastEvent = auditLogs.entries.first()
        const { executor } = lastEvent

        let Embed = LogsEmbed()
        Embed.setColor('#A600FF')
        Embed.setAuthor(roleCreate.embed.author)
        Embed.addFields({ name: 'Nom du role', value: `${role.name}`, inline: true }, { name: `Id ru rôle`, value: `${role.id}`, inline: true }, )
        Embed.setFooter(`Cette action a été réalisée par ${executor.username} -> id : ${executor.id}`)

        this.client.channels.cache.get(appConf.chanels.botLog).send({ embeds: [Embed] })
    }
}

module.exports = RoleCreateListener;