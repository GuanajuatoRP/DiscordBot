const { Command } = require('discord-akairo');
const lang = require('../../util/language.json');
const numberLang = lang.commands.number

class NumberCommand extends Command {
    constructor() {
        super('number', {
            aliases: ['number'],
            category: 'Administration',
            description: {
                content: numberLang.desc,
                usage: numberLang.usage,
                exemples: ['number', 'number 2 10']
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
            }],
            slashOnly : true
        });
    }


    execSlash(message, { nbval, plage }) {
        if (nbval > plage) {
            return message.interaction.reply({
                content: numberLang.messageError,
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

module.exports = NumberCommand;