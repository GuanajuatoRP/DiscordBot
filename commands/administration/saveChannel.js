const { Command } = require('discord-akairo');
const fs = require('fs');
const lang = require('../../util/language.json')
const infoLang = lang.commands.info

class SaveChannelCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            category: 'Administration',
            description: {
                content: infoLang.description.desc,
                usage: infoLang.description.usage,
                exemples: infoLang.description.exemples
            },
            typing: false,
            slash: true,
            slashOnly: true,
            slashOptions: [{
                name: 'channel',
                description: infoLang.slashOptions.channel.description,
                type: 'CHANNEL',
                required: true
            }]
        });
    }
    async execSlash(message, { channel }) {
        const salon = new Object()
        salon.name = channel.name
        let permissionsList = new Array();
        const permissions = [...channel.permissionOverwrites.cache]
        permissions.forEach(permission => {
            permissionsList.push(permission[1])
        });

        switch (channel.type) {
            case 'GUILD_TEXT':
                salon.channelInfo = {
                    "type": channel.type,
                    "topic": channel.topic,
                    "permissionOverwrites": permissionsList,
                    "position": channel.position
                }
                channel.messages.fetch()
                    .then(msg => {
                        const messageTab = [...msg].reverse()
                        salon.messages = messageTab
                        fs.appendFile('cat.json', `${JSON.stringify(salon)},`, (err) => {
                            if (err) throw err;
                        })
                        console.log(salon.name);
                    });
                break;
            case 'GUILD_VOICE':
                salon.channelInfo = {
                    "type": channel.type,
                    "permissionOverwrites": permissionsList,
                    "position": channel.rawPosition,
                    "userLimit": channel.userLimit,
                }
                fs.appendFile('cat.json', `${JSON.stringify(salon)},`, (err) => {
                    if (err) throw err;
                })
                console.log(salon.name);
                break;
        }

        message.interaction.reply({
            content: infoLang.interaction.content,
            ephemeral: true,
        })
    }
}
module.exports = SaveChannelCommand