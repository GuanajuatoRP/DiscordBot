const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const lang = require('../../util/language.json')
class AdminHelpCommand extends Command {
    constructor() {
        super('adminhelp', {
            aliases: ['adminhelp'],
            category: 'Administration',
            description: {
                content: `${lang.commands.help.desc}`,
                usage: lang.commands.help.usage,
                exemples: ['help', 'help ping']
            },
            slash: true,
            slashOptions: [{
                name: 'command',
                description: "Nom de la commande sur le quel vous voulez plus d'info ",
                type: 'STRING',
                required: false
            }],
        });
    }

    exec(message) {
        message.reply({
            content : 'Merci d\'utiliser cette commande avec un slash',
        })
    }
    execSlash(message, {command}) {
            const prefix = this.handler.prefix
            if (!command) {
                let Embed = new MessageEmbed()
                    .setAuthor(`${lang.embeds.default.author}`, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9")
                    .setColor('#ff8000')
                    .setDescription(lang.commands.help.embed.desc)
                    .setFooter(`${lang.embeds.default.footer}`, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg")
                    .setTimestamp()
                    .addFields()

                for (const category of this.handler.categories.values()) {
                    if (category.id == 'Administration')
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
                return message.interaction.reply({
                    embeds: [Embed],
                    ephemeral: true
                }) 
            }



            let isOwnerCommand = false
            for (const category of this.handler.categories.values()) {
                        for (const cat of category) {
                            if (cat[0] == command){
                                isOwnerCommand = cat[1].ownerOnly
                            }
                        }
            }
            const aliases = [...this.handler.aliases.values()]
            if (!aliases.includes(command)){
                return message.interaction.reply({
                    content: `La commande ***${command}*** n'existe pas`,
                    ephemeral: true
                }) 
            }


            return message.interaction.reply({
                content: stripIndents`
                \`\`\`makefile
                    [help : ${command}]     ${isOwnerCommand?'⚠️⚠️OwnerOnly !!!⚠️⚠️':''}

                    ${lang.commands[command].desc}

                    Utilisation: /${lang.commands[command].usage}
                    Exemples: /${lang.commands[command].exemples.join(`, /`)}


                    / = prefixs  a utiliser avec le bot
                    <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                    Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
                \`\`\`               
                `,
                ephemeral: true
            }) 
            

        
    }          
}

module.exports = AdminHelpCommand;