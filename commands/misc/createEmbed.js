const { Command } = require('discord-akairo');
const { EmbedMenu, DefaultEmbed } = require('../../util/ExportEmbed');
const lang = require('../../util/language.json')

class CreateEmbedCommand extends Command {
    constructor() {
        super('CreateEmbed', {
            aliases: ['createembed', 'cem'],
            category: 'Misc',
            description: {
                content: lang.commands.createembed.desc,
                usage: lang.commands.createembed.usage,
                exemples: ['createembed', 'cem']
            }
        });
    }

    async exec(message) {
        const embed = DefaultEmbed
        await message.channel.send({
                embeds: [embed],
                content: lang.commands.createembed.message.content,
                components: [EmbedMenu]
            })
            .catch(console.error)
    }
}

module.exports = CreateEmbedCommand;