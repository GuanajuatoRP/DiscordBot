import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';
import lang from '../../../../Tools/language.json';
const serviceLang = lang.services.game;
const cmdLang = serviceLang.commandInformation.endGame;
import appConfig from '../../../../Util/appConfig.json';
export class EndGameCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'end-game',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);

		try {
			//TODO: Faire la suppression des channels quand la commande Game seras refaite
			// const cat = i.guild!.channels.cache.get(
			// 	appConfig.chanels.game.categorie,
			// )! as CategoryChannel;
			// if (cat.type !== 'GUILD_CATEGORY') {
			// 	i.reply({
			// 		content: 'Catégorie non trouvé',
			// 		ephemeral: true,
			// 	});
			// }
			// cat!.children.forEach((child: any) => {
			// 	if (
			// 		child.id != appConfig.chanels.game.admin &&
			// 		child.id != appConfig.chanels.game.salleDeJeux
			// 	) {
			// 		this.client.channels.cache.get(child.id)!.delete();
			// 	}
			// });

			const roleA = i.guild!.roles.cache.get(appConfig.Roles.GMA);
			roleA!.members.forEach(member => {
				member.roles.remove(roleA!);
			});
			const roleB = i.guild!.roles.cache.get(appConfig.Roles.GMB);
			roleB!.members.forEach(member => {
				member.roles.remove(roleB!);
			});

			return i.reply({
				content: serviceLang.validation.endSession,
				ephemeral: true,
			});
		} catch (error) {
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
}
