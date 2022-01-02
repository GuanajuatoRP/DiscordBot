"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCommand = void 0;
const sheweny_1 = require("sheweny");
class TestCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            // category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: 'eee',
            usage: 'eee',
            examples: 'eee',
            options: [
            // {
            // type : 'STRING',
            // name: 'commande',
            // description: '',
            // autocomplete : false,
            // required : false,
            //}
            ],
            defaultPermission: true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    execute(interaction) {
        console.log(interaction.channel.messages);
        return interaction.reply({
            content: 'eee',
            ephemeral: true
        });
    }
}
exports.TestCommand = TestCommand;
