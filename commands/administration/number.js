const { Command } = require('discord-akairo');
const lang = require('../../util/language.json');
const numberLang = lang.commands.number

class NumberCommand extends Command {
    constructor() {
        super('number', {
            aliases: ['number'],
            category: 'Administration',
            description: {
                content: numberLang.description.desc,
                usage: numberLang.description.usage,
                exemples: numberLang.description.exemples
            },
            slash: true,
            slashOptions: [{
                name: 'nbval',
                description: numberLang.slashOptions.nbval.description,
                type: 'NUMBER',
                required: true
            }, {
                name: 'plage',
                description: numberLang.slashOptions.plage.description,
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