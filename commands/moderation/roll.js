const { Command } = require('discord-akairo');
const lang = require('../../util/language.json');
const rollLang = lang.commands.roll

class RollCommand extends Command {
    constructor() {
        super('roll', {
            aliases: ['roll'],
            category: 'Moderation',
            description: {
                content: rollLang.desc,
                usage: rollLang.usage,
                exemples: ['roll', 'roll 2 10']
            },
            slash: true,
            slashOptions: [{
                name: 'nbval',
                description: "nombre de valeurs a tirer",
                type: 'NUMBER',
                required: true
            }, {
                name: 'plage',
                description: "plage sur la quelle tirer les valeurs",
                type: 'NUMBER',
                required: true
            }]
        });
    }

    exec(message) {
        return message.reply(`Merci d'utiliser cette commande avec un slash`);
    }

    execSlash(message, { nbval, plage }) {
        if (nbval > plage) {
            return message.interaction.reply({
                content: rollLang.messageError,
                ephemeral: true
            })
        }
        let result = []
        let nb
        for (let i = 0; i < nbval; i++) {
            do {
                nb = Math.floor(Math.random() * (plage - 1 + 1) + 1)
            } while (result.includes(nb));
            result.push(nb)
        }
        result.sort((a, b) => {
            return a - b;
        })
        return message.interaction.reply(`Voici vos valeur${nbval === 1 ? '':'s'}: ${result.join(',')}`);
    }
}

module.exports = RollCommand;