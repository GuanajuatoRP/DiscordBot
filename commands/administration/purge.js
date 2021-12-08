const { Command } = require('discord-akairo');
const lang = require('../../util/language.json')
const purgeLang = lang.commands.purge

class PurgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge'],
            category: 'Administration',
            description: {
                content: purgeLang.description.desc,
                usage: purgeLang.description.usage,
                exemples: purgeLang.description.exemples
            },
            typing: false,
            slash: true,
            slashOnly: true,
            slashGuilds: ["877644017255465011"],
            slashOptions: [{
                name: 'nombre',
                description: purgeLang.slashOptions.nombre.description,
                type: 'NUMBER',
                required: false,
            }],
        });
    }
    async execSlash(message,{nombre}) {
        if (nombre == null ) nombre = 100
        let messages = await message.channel.messages.fetch({
            limit: nombre,
            before: message.id
        })

        messages = messages.filter(message => message.pinned === false)
        try {
            await message.channel.bulkDelete(messages)
        } catch (error) {
            message.channel.send(purgeLang.messageError)
        }
        message.interaction.reply({
            content: purgeLang.interaction.content,
            ephemeral: true,
        })
    }
}
module.exports = PurgeCommand