import { Command } from 'sheweny'
    import type { ShewenyClient } from 'sheweny'
    import type { CommandInteraction } from 'discord.js'
    
    
    
    export class TestCommand extends Command {
        constructor(client: ShewenyClient) {
            super(client, {
                name: 'test',
                // category: '', //* Default category is InDev
                // type: '', //* Default type is SLASH_COMMAND
                description: 'eee',
                usage : 'eee',
                examples : 'eee',
                options : [
                    // {
                        // type : 'STRING',
                        // name: 'commande',
                        // description: '',
                        // autocomplete : false,
                        // required : false,
                        //}
                ],
                defaultPermission : true,
                // channel : '', //* Default Channel is GUILD
                // cooldown : , //* Default cooldown set at 2sec
                adminsOnly : true, //* Default value is false 
                //userPermissions : [],
                //clientPermissions : []
            });
        }
        execute(interaction : CommandInteraction) {

            console.log(interaction.channel!.messages);
            
            return interaction.reply({
                content : 'eee',
                ephemeral : true
            }) 
        }

        // onAutocomplete(interaction: AutocompleteInteraction) {
        //     const focusedOption = interaction.options.getFocused(true);
        
        //     const choices: Array<string> = Array.from(this.client.util.getCommands()).filter(c => c.category !== `InDev` && c.adminsOnly === false && c.type === 'SLASH_COMMAND').map(c => c.name)
        
        //     if (focusedOption.name === 'commande') {
        //         choices
        //     }
        
        //     const filtered = choices!.filter((choice: any) =>
        //         choice.startsWith(focusedOption.value)
        //     )
        //     interaction
        //         .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
        // }
    }