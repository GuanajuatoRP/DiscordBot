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
    async execSlash(message, { channel }) {

        let permissionsList = new Array();
        const permissions = [...channel.permissionOverwrites.cache]
        permissions.forEach(permission => {
            permissionsList.push(permission[1])
        });


        const salon = new Object()
        salon.name = channel.name,
            salon.channelInfo = {
                "type": channel.type,
                "topic": channel.topic,
                "permissionOverwrites": permissionsList,
                "position": channel.position
            }


        // console.log(channel.messages.cache);
        const sal = this.client.channels.cache.get('877644018568269864');
        const msg = sal.messages.cache;
        console.log(msg);


        message.interaction.reply({
            content: 'La commande backup a bien été executée',
            ephemeral: true,
        })
    }
}
module.exports = SaveChannelCommand