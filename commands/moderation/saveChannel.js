const { Command } = require('discord-akairo');
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
    async execSlash(message,{channel}) {
        // channel = channel.slice(2,-1)
        // const salon = this.client.channels.cache.get(channel)
        const json = `{
            "name": "${channel.name}",
            "channelInfo" : {
                "type": "${channel.type}",
                "topic": "${channel.topic}",
                "permissionOverwrites": ${channel.permissionOverwrites.cache},
                "position": "${channel.position}"
            }
        }`
        console.log(json);


        message.interaction.reply({
            content: 'La commande backup a bien été executée',
            ephemeral: true,
        })
    }
}
module.exports = SaveChannelCommand