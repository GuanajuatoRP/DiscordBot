import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ButtonInteraction,
	GuildMember,
	GuildMemberRoleManager,
	Role,
} from 'discord.js';
import appConf from '../../../../Util/appConfig.json';
import lang from '../../../../Tools/language.json';
import RegisterController from '../../../../APIToUserApi/RegisterController';
import { StatusCodes } from 'http-status-codes';
const iLang = lang.button.activateAccount;
export class ActivateAccountBtn extends Button {
	constructor(client: ShewenyClient) {
		super(client, ['ActivateAccount']);
	}

	async execute(b: ButtonInteraction) {
		await b.deferReply({ ephemeral: true });

		// Get Member and this roles
		const member = b.member as GuildMember;
		const memberRoles = member.roles as GuildMemberRoleManager;
		const roleNouveau = b.guild!.roles.cache.get(appConf.Roles.NOUVEAU) as Role;
		const roleInscrit = b.guild!.roles.cache.get(appConf.Roles.INSCRIT) as Role;
		const roleSansPermis = b.guild!.roles.cache.get(
			appConf.Roles.SANSPERMIS,
		) as Role;

		// Check if this user is already registred
		let httpCode: StatusCodes = StatusCodes.OK | StatusCodes.NO_CONTENT;
		let username: string = '';
		await RegisterController.UserExist(member.id)
			.then(res => {
				httpCode = res.status == 200 ? StatusCodes.OK : StatusCodes.NO_CONTENT;
				if (res.status == 200) {
					username = res.data;
				}
			})
			.catch(err => console.log(err));

		if (
			memberRoles.cache.has(appConf.Roles.INSCRIT) &&
			httpCode == StatusCodes.OK
		) {
			//déjà insrit
			await member.setNickname(username).catch(err => console.log(err));
			return b.editReply(iLang.alreadyActivated);
		} else if (httpCode == StatusCodes.NO_CONTENT) {
			//Pas inscrit
			await memberRoles.add(roleNouveau).catch(err => console.log(err));
			await memberRoles.remove(roleInscrit).catch(err => console.log(err));
			await memberRoles.remove(roleSansPermis).catch(err => console.log(err));
			await member.setNickname(null).catch(err => console.log(err));
			return b.editReply(iLang.notRegistered);
		} else if (
			!memberRoles.cache.has(appConf.Roles.INSCRIT) &&
			httpCode == StatusCodes.OK
		) {
			//inscrit
			await member.setNickname(username).catch(err => console.log(err));
			await memberRoles.remove(roleNouveau).catch(err => console.log(err));
			await memberRoles.add(roleInscrit).catch(err => console.log(err));
			await memberRoles.add(roleSansPermis).catch(err => console.log(err));
			return b.editReply(iLang.activated);
		}
	}
}
