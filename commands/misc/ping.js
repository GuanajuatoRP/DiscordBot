const { Command } = require('discord-akairo');
const lang = require('../../util/language.json');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'Misc',
            description: {
                content : `${lang.commands.ping.desc}`,
                usage: lang.commands.ping.usage,
                exemples: ['ping']
            }
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;