const { Listener } = require('discord-akairo');


class MessageCreateListener extends Listener {
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message) {
        if (message.type === 'CHANNEL_PINNED_MESSAGE') setTimeout(() => message.delete(), 2000);
    }
}

module.exports = MessageCreateListener;