const { Command } = require('discord-akairo');
const lang = require('../../util/language.json')

class PurgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'clear'],
            category: 'Administration',
            description: {
                content: lang.commands.purge.desc,
                usage: lang.commands.purge.usage,
                exemples: ['purge', 'purge 23', 'clear']
            },
            typing: false,
            args: [
                { id: 'nbMessage', type: 'number', default: 100 }
            ],
            slash: true,
            slashOptions: [{
            name: 'nombre',
            description: "Nombre de message que vous voulez supprimer, 100Max",
            type: 'NUMBER',
            required: true,
            }],
            ownerOnly : true,
        });
    }
    exec(message) {
        message.reply({
            content: `Merci d'utiliser la commande avec un /`,
            ephemeral: true
        })
        message.delete();
    }
    async execSlash(message,{nombre}) {
        let messages = await message.channel.messages.fetch({
            limit: nombre,
            before: message.id
        })

        messages = messages.filter(message => message.pinned === false)
        try {
            await message.channel.bulkDelete(messages)
        } catch (error) {
            message.channel.send(lang.commands.purge.messageError)
        }
        message.interaction.reply({
            content: 'La commande purge a bien été executée',
            ephemeral: true,
        })
    }
}
module.exports = PurgeCommand