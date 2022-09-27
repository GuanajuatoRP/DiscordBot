import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { CommandInteraction, GuildMember } from 'discord.js';
import { Roles } from '../../../../Util/appConfig.json';

export class TestCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'test',
			// category: 'Misc', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: 'test description',
			usage: 'test usage',
			examples: 'test examples',
			options: [],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i as CommandInteraction);

		await i.deferReply();

		const userList: GuildMember[] = [...i.guild!.members.cache.values()].filter(
			m =>
				!m.roles.cache.hasAny(
					Roles.SANSPERMIS,
					Roles.PERMISDEFINITIF,
					Roles.PROBATOIRE,
					Roles.STAGEA,
				) && m.roles.cache.has(Roles.INSCRIT),
		);

		await i.channel?.send(userList.length.toString());

		for (const member of userList) {
			await member.roles.add(Roles.SANSPERMIS).then(() => {
				console.log(`Role ajouté à ${member.displayName}`);
			});
		}

		userList.filter(m => m.roles.cache.has(Roles.SANSPERMIS));
		return i.editReply({
			content: `${userList.length}`,
		});
	}
}
