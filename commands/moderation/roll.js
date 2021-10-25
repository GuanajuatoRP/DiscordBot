const { Command } = require('discord-akairo');
const lang = require('../../util/language.json');
const rollLang = lang.commands.roll

class RollCommand extends Command {
    constructor() {
        super('roll', {
            aliases: ['roll'],
            category: 'Moderation',
            description: {
                content : rollLang.desc,
                usage: rollLang.usage,
                exemples: ['roll','roll 2 10']
            },
            args: [
                { id: 'nbVal', type: 'number', default: 1 },
                { id: 'plage', type: 'number', default: 15 }
            ]
        });
    }

    exec(message, {nbVal, plage}) {
        if (nbVal > plage){
            message.delete()
            return message.channel.send(rollLang.messageError)
            .then(message => {
                setTimeout(() => message.delete(),10000)
            })
        }
        let result = []
        let nb
        for (let i = 0; i < nbVal; i++){
            do {
                nb = Math.floor(Math.random() * (plage - 1 + 1) + 1)
            } while (result.includes(nb));
            result.push(nb)
        }
        result.sort((a,b) => {
            return a - b;
        })
        return message.reply(`Voici vos valeur${nbVal === 1 ? '':'s'}: ${result.join(',')}`);
    }
}

module.exports = RollCommand;