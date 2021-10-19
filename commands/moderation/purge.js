const { Command } = require('discord-akairo');
const lang = require('../../util/language.json')

class PurgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'clear'],
            category: 'Moderation',
            description: {
                content: lang.commands.purge.desc,
                usage: lang.commands.purge.usage,
                exemples: ['purge', 'purge 23', 'clear']
            },
            typing: false,
            args: [
                { id: 'nbMessage', type: 'number', default: 100 }
            ]
        });
    }
    async exec(message, args) {
        let messages = await message.channel.messages.fetch({
                limit: args.nbMessage,
                before: message.id
            })

        messages = messages.filter(message => message.pinned === false)
        message.delete()

        try {
            await message.channel.bulkDelete(messages)
        } catch (error) {
            message.channel.send(lang.commands.purge.messageError)
        }
    }
}
module.exports = PurgeCommand