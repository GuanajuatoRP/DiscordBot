const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const lang = require('../../util/language.json')
class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'Misc',
            args: [
                { id: 'command', type: 'commandAlias' }
            ],
            description: {
                content: `${lang.commands.help.desc}`,
                usage: lang.commands.help.usage,
                exemples: ['help', 'help ping']
            }
        });
    }

    exec(message, args) {
            const prefix = this.handler.prefix
            const command = args.command
            if (!command) {
                let Embed = new MessageEmbed()
                    .setAuthor(`${lang.embeds.default.author}`, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9")
                    .setColor('#ff8000')
                    .setDescription(lang.commands.help.embed.desc)
                    .setFooter(`${lang.embeds.default.footer}`, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg")
                    .setTimestamp()
                    .addFields()

                for (const category of this.handler.categories.values()) {
                    Embed.addField(
                            `${category.id}`,
                            `${category
                                .filter(cmd => cmd.aliases.length > 0)
                                .map(cmd => `\`${cmd.aliases[0]}\``)
                                .join(', ')
                            }`
                    )
                }
            
                Embed.addField(
                    '------------',
                    `**\`${prefix}help <command>\` pour des infos sur une commande spécifique **
                    Exemples \`${prefix}help ping\`  || \`${prefix}help embed\``
                )
                return message.reply({embeds: [Embed]})
            }
            return message.channel.send(stripIndents`
            \`\`\`makefile
                [help : Command -> ${command.aliases[0]}] ${command.ownerOnly ? '/!\\ Fondator Only':''}

                ${command.description.content}

                Utilisation: ${prefix}${command.description.usage}
                Exemples: ${prefix}${command.description.exemples.join(`, ${prefix}`)}

                

                ${prefix}  @${this.client.user.username} = prefixs  a utiliser avec le bot
                <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
            \`\`\`               
            `)


        }          
}

module.exports = HelpCommand;