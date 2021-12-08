const { Command } = require('discord-akairo');
const { EmbedMenu, DefaultEmbed } = require('../../util/ExportEmbed');
const lang = require('../../util/language.json')
const createembedLang = lang.commands.createembed

class CreateEmbedCommand extends Command {
    constructor() {
        super('createembed', {
            aliases: ['createembed',],
            category: 'Administration',
            description: {
                content: createembedLang.description.desc,
                usage: createembedLang.description.usage,
                exemples: createembedLang.description.exemples
            },
            slash: true,
            slashOnly: true,
            slashGuilds: ["877644017255465011"]
        });
    }

    async execSlash(message) {
        const embed = DefaultEmbed
        await message.interaction.reply({
                embeds: [embed],
                content: createembedLang.message.content,
                components: [EmbedMenu]
            })
            .catch(console.error)
    }
}

module.exports = CreateEmbedCommand;