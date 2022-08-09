"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCommand = void 0;
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
// import lang from '../../../util/language.json'
// const CommandLang = lang.commands.test
class TestCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            // category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: 'CommandLang.description.desc',
            usage: 'CommandLang.description.usage',
            examples: 'CommandLang.description.exemples',
            options: [
            // {
            // type : 'STRING',
            // name: 'commande',
            // description: CommandLang,
            // autocomplete : false,
            // required : false,
            //}
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    execute(interaction) {
        this.client.emit('CommandLog', interaction);
        const btRegisterValidation = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId("RegisterValidation")
            .setLabel("Validée l'inscription")
            .setStyle(discord_js_1.ButtonStyle.Primary));
        console.log(btRegisterValidation.components[0].data);
        interaction.reply({
            content: "Vous pouvez maintenant validé votre inscription",
            components: [btRegisterValidation]
        });
    }
}
exports.TestCommand = TestCommand;
