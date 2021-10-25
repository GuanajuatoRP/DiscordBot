const { Command } = require('discord-akairo');
const appConfig = require('../../util/appConfig.json')
const lang = require('../../util/language.json');
const drollLang = lang.commands.roll

class DrollCommand extends Command {
    constructor() {
        super('droll', {
            aliases: ['droll'],
            category: 'Moderation',
            typing:false,
            description: {
                content : drollLang.desc,
                usage: drollLang.usage,
                exemples: ['droll','droll 2']
            },
        });
    }

    exec(message) {
        
        message.guild.channels.fetch('877644017754583077')
        .then(channel => {
            const guildChannel = channel
            const membersOfChannel = guildChannel.members
            let result = []
            let nb
            for (let i = 0; i < Math.round(membersOfChannel.size/2); i++) {
                do {
                    nb = Math.floor(Math.random() * (membersOfChannel.size - 1 + 1) + 1)
                } while (result.includes(nb));
                result.push(nb)
            } 
            let idx = 1
            membersOfChannel.forEach(member => {
                message.guild.channels.fetch((result.includes(idx))?appConfig.chanels.staff.aide:appConfig.chanels.staff.salleAttente)
                .then(channel => member.voice.setChannel(channel))
                idx++
            });
            
        })
    }
}

module.exports = DrollCommand;