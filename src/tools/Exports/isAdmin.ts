import { GuildMember } from 'discord.js';
import appConf from '../../Util/appConfig.json';
import { client } from '../..';

//* Permet de définir si un GuildMember est admin ou non
export const IsAdmin = (member: GuildMember) => {
	// Check if the GuildMember have Admin role or he's id are in admin's id table
	return member.roles.cache.has(appConf.Roles.ADMIN) &&
		client.admins.includes(member.id)
		? true
		: false;
};
