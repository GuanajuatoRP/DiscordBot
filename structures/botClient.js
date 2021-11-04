const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const appConfig = require('../util/appConfig.json')

module.exports = class BotClient extends AkairoClient {
    constructor() {
        super({ ownerID: appConfig.configAkairo.ownersIds }, {
            allowedMentions: {
                parse: ['roles', 'everyone', 'users'],
                repliedUser: true
            },
            partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
            presence: {
                status: 'online',
                activities: [{
                    name: 'Apprend a apprendre ',
                    type: 'PLAYING'
                }]
            },
            intents: 32767
        });

        this.commandHandler = new CommandHandler(this, {
            allowMention: true,
            prefix: appConfig.configAkairo.prefix,
            channel: 'guild',
            defaultCooldown: 2000,
            execSlash: true,
            autoRegisterSlashCommands: true,
            typing: false,
            directory: './commands/'
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
    }
}