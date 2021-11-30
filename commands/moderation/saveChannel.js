const { Command } = require('discord-akairo');
const fs = require('fs');
const lang = require('../../util/language.json')

class SaveChannelCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            category: 'Moderation',
            description: {
                content: `Permet d'avoir les info d'un channel`,
                usage: `backup <ChannelName>`,
                exemples: ['backup <ChannelName>']
            },
            typing: false,
            slash: true,
            slashOptions: [{
                name: 'channel',
                description: "Salon a info",
                type: 'CHANNEL',
                required: true
            }]
        });
    }
    exec(message) {
        message.reply({
            content: `Merci d'utiliser la commande avec un /`,
            ephemeral: true
        })
        message.delete();
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
            content: 'La commande backup a bien été executée',
            ephemeral: true,
        })
    }
}
module.exports = SaveChannelCommand