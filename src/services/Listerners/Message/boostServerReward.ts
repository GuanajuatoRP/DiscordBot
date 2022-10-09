// import { Event } from 'sheweny';
// import type { ShewenyClient } from 'sheweny';
// import type { GuildMember } from 'discord.js';
// import lang from '../../../Tools/language.json';
// import { addMoneyRapport } from '../../../Tools/Exports/embedMoney';
// import MoneyController from '../../../APIToUserApi/MoneyController';
// import { GetMoneyDTO } from '../../../APIToUserApi/Models/GetMoneyDTO';
// const eventLang = lang.event.feurTroll;

// export class GuildMemberBoost extends Event {
// 	constructor(client: ShewenyClient) {
// 		super(client, 'guildMemberBoost', {
// 			description: eventLang.description,
// 			once: false,
// 		});
// 	}

// 	async execute(GuildMember: GuildMember) {
// 		const rewardStenses: string[] = [
// 			'Vous avez reçu un bonus pour avoir boosté le serveur !',
// 			'',
// 		];
// 		const rewardStense: string =
// 			'Vous avez reçu un bonus pour avoir boosté le serveur !';
// 		const BoostBonus = 10000;
// 		await MoneyController.addMoney(GuildMember.id, BoostBonus).then(
// 			async res => {
// 				const moneyDTO: GetMoneyDTO = res.data;
// 				await addMoneyRapport(
// 					GuildMember,
// 					moneyDTO,
// 					BoostBonus,
// 					'Bonus Boost du Serveur',
// 				);
// 			},
// 		);

// 		console.log('aaa');
// 		// console.log('premiumSinceTimestamp', guildMember.premiumSinceTimestamp);
// 	}
// }
