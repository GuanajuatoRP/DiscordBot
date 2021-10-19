const { Listener } = require('discord-akairo');
const appconfig = require('../util/appConfig.json')
const lang = require('../util/language.json')
const date = new Date()

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        this.client.channels.cache.get(appconfig.chanels.botLog).send(`${lang.event.ready.message} at ${date.getHours()}H${date.getMinutes()}`)
    }
}

module.exports = ReadyListener;