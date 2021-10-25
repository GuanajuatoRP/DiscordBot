const { Command } = require('discord-akairo');
const lang = require('../../util/language.json');
const rollLang = lang.commands.roll

class RollCommand extends Command {
    constructor() {
        super('roll', {
            aliases: ['roll'],
            category: 'Moderation',
            description: {
                content : rollLang.usage,
                usage: rollLang.desc,
                exemples: ['ping']
            }
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

module.exports = RollCommand;