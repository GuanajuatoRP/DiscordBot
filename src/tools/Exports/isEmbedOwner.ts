import { GuildMember, Embed } from 'discord.js';
//* Permet de déterminer si un GuildMember est concerner par un embed
//! Ne fonctionne que si il y a "xxx : GuildMember.tag" dans le footer et rien d'autre
export const IsEmbedOwner = (member: GuildMember, embed: Embed) => {
	const embedMember = embed.data.footer!.text.split(' : ')[1] as string;

	// Check if the GuildMember tag is in emùbed footer
	return !embedMember.includes(member.user.tag) ? false : true;
};
