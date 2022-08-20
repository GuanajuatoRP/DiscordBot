import express from 'express';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ColorResolvable,
	EmbedBuilder,
	Guild,
	GuildMember,
	Role,
	TextChannel,
} from 'discord.js';
import { client } from '../index';
import appConf from '../Util/appConfig.json';
import appLang from '../Tools/language.json';
import { UserOnServerModel } from './Model/UserOnServerModel';
import { UserValidatedModel } from './Model/UserValidatedModel';
import { TokenValidationModel } from './Model/TokenValidationModel';
import { UserValidatedOnDBModel } from './Model/UserValidatedOnDBModel';
import { DefaultEmbed } from '../Tools/Exports/export';
import bodyParser from 'body-parser';
import cors from 'cors';
export const app = express();
function rawBody(req: any, res: any, next: any) {
	req.setEncoding('utf8');
	req.rawBody = '';
	req.on('data', function (chunk: any) {
		req.rawBody += chunk;
	});
	req.on('end', function () {
		next();
	});
}

// const allowedOrigins = [
// 	'http://guanajuato-roleplay.fr',
// 	'http://api.guanajuato-roleplay.fr',
// 	'https://guanajuato-roleplay.fr',
// 	'https://api.guanajuato-roleplay.fr',
// ];
// const allowlist = [
// 	'http://guanajuato-roleplay.fr',
// 	'http://api.guanajuato-roleplay.fr',
// 	'https://guanajuato-roleplay.fr',
// 	'https://api.guanajuato-roleplay.fr',
// ];
// const options: cors.CorsOptions = {
// 	origin: allowedOrigins,
// };
// const options: cors.CorsOptions = {
// 	allowedHeaders: [
// 		'Origin',
// 		'X-Requested-With',
// 		'Content-Type',
// 		'Accept',
// 		'X-Access-Token',
// 	],
// 	credentials: true,
// 	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
// 	origin: 'http://guanajuato-roleplay.fr',
// 	preflightContinue: true,
// };
// var allowlist = ['http://example1.com', 'http://example2.com'];
// var corsOptionsDelegate = function (req: express.Request, callback: any) {
// 	let corsOptions = {
// 		origin: false,
// 		methods: 'GET,PUT,POST,DELETE,OPTIONS',
// 		preflightContinue: true,
// 		optionsSuccessStatus: 204,
// 	};
// 	console.log('req.method: ', req.method);
// 	console.log("req.header('Origin'): ", req.header('Origin'));

// 	if (allowlist.indexOf('http://guanajuato-roleplay.fr') !== -1) {
// 		corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
// 	}
// 	callback(null, corsOptions); // callback expects two parameters: error and options
// };

// const corsOptions = {
// 	// origin: '*',
// 	origin: function (origin: any, callback: any) {
// 		callback(null, true);
// 		// if (origins.indexOf(origin) !== -1) {
// 		// 	callback(null, true);
// 		// } else {
// 		// 	callback(null, true);
// 		// 	// callback(new Error('Not allowed by CORS origin : ' + origin));
// 		// }
// 	},
// 	methods: 'GET,PUT,POST,DELETE,OPTIONS',
// 	preflightContinue: true,
// 	optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptionsDelegate));
// app.use(cors(corsOptions));
// app.use((req: express.Request, res: express.Response, next) => {
// 	console.log('req.hostname : ', req.hostname);
// 	console.log('req.headers.hostname : ', req.headers.hostname);
// 	console.log('req.headers.origin : ', req.headers.origin);
// 	const allowlist = [
// 		'http://guanajuato-roleplay.fr',
// 		'http://api.guanajuato-roleplay.fr',
// 		'https://guanajuato-roleplay.fr',
// 		'https://api.guanajuato-roleplay.fr',
// 	];
// 	const origin = req.headers.origin!;
// 	if (allowlist.indexOf(origin) > -1) {
// 		res.setHeader('Access-Control-Allow-Origin', origin);
// 	}

// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
// 	);
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'X-Requested-With,content-type, Accept',
// 	);
// 	res.setHeader('Access-Control-Allow-Credentials', 'true');
// 	next();
// });
// app.use(express.json());

// app.all('*', (req: express.Request, res: express.Response, next) => {
// 	console.log(req.hostname);
// 	console.log(req.headers.hostname);
// 	console.log(req.headers.origin);
// 	const allowlist = [
// 		'http://guanajuato-roleplay.fr',
// 		'http://api.guanajuato-roleplay.fr',
// 		'https://guanajuato-roleplay.fr',
// 		'https://api.guanajuato-roleplay.fr',
// 	];
// 	var origin = req.headers.origin!;
// 	if (allowlist.indexOf(origin) > -1) {
// 		res.setHeader('Access-Control-Allow-Origin', origin);
// 	}

// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
// 	);
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'X-Requested-With,content-type, Accept',
// 	);
// 	res.setHeader('Access-Control-Allow-Credentials', 'true');
// 	next();
// });

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://guanajuato-roleplay.fr');
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
// 	);
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PATCH, PUT, DELETE, OPTIONS',
// 	);
// 	res.setHeader(
// 		'Access-Control-Allow-Headers',
// 		'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
// 	);
// 	next();
// });
// app.use(cors());

// const corsOptions = {
// 	origin: 'http://guanajuato-roleplay.fr',
// 	methods: 'GET,PUT,POST,DELETE,OPTIONS',
// 	preflightContinue: true,
// 	optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// var allowlist = ['http://example1.com', 'http://example2.com'];
// var corsOptionsDelegate = function (req, callback) {
// 	var corsOptions;
// 	if (allowlist.indexOf(req.header('Origin')) !== -1) {
// 		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
// 	} else {
// 		corsOptions = { origin: false }; // disable CORS for this request
// 	}
// 	callback(null, corsOptions); // callback expects two parameters: error and options
// };
var allowlist = [
	'http://guanajuato-roleplay.fr',
	'http://api.guanajuato-roleplay.fr',
];
var corsOptionsDelegate = function (req: any, callback: any) {
	let corsOptions = {
		origin: true,
		methods: 'GET,PUT,POST,DELETE,OPTIONS',
		preflightContinue: true,
		optionsSuccessStatus: 200,
	};
	console.log('hostname: ' + req.hostname);
	console.log('methode : ', req.method);
	console.log('req.headers.origin : ', req.headers.origin);
	console.log('req.headers.origin2 : ', req.header('Origin'));
	console.log('allowed : ', allowlist.indexOf(req.header('Origin')));

	if (allowlist.indexOf(req.header('Origin')) !== -1) {
		corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions.origin = true; // disable CORS for this request
	}
	console.log('BUBUB&DUDUDUU');
	callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(rawBody);

// Check if the user with {{userId}}
app.get(
	'/isUserOnServer/:userId',
	cors(corsOptionsDelegate),
	async (req: express.Request, res: express.Response) => {
		const guild = await client.guilds.fetch(appConf.botConfig.guildid);
		let userIsOnServer = new UserOnServerModel();
		await guild.members
			.fetch(req.params.userId)
			.then(user => {
				userIsOnServer.isOnServeur = true;
				userIsOnServer.username = user.displayName;
			})
			.catch(reason => {
				userIsOnServer.isOnServeur = false;
			});

		res.send(userIsOnServer);
	},
);

// Check if user on serveur and send on users are on the server dm with validation button and a message
app.post(
	'/sendRegisterValidationButton/:userId',
	cors(corsOptionsDelegate),
	async (req: express.Request, res: express.Response) => {
		console.log('sendRegisterValidationButtonnnnnnnnnnnnnnnn');

		//Get params
		const user = new UserValidatedModel();

		user.userId = req.params.userId;
		const jsonBody: TokenValidationModel = JSON.parse(
			(req as any).rawBody as string,
		) as TokenValidationModel;

		user.token = jsonBody.token;

		// get guild
		const guild = (await client.guilds.fetch(
			appConf.botConfig.guildid,
		)) as Guild;

		let result = false;
		await guild.members
			.fetch(user.userId)
			.then(user => {
				result = true;
			})
			.catch(reason => {
				result = false;
			});
		if (!result)
			return res.status(400).send("L'utilisateur n'est pas sur le serveur");

		// get member on guild
		const member = guild.members.cache.get(user.userId) as GuildMember;

		let embed = DefaultEmbed();
		embed.setColor(
			appLang.embeds.ActivateRegistration.color as ColorResolvable,
		);
		embed.setDescription(appLang.embeds.ActivateRegistration.description);

		// Create button and message for validation
		const btRegisterValidation =
			new ActionRowBuilder<ButtonBuilder>().addComponents(
				new ButtonBuilder()
					.setURL(
						appConf.Api.RegisterValidationLink.format(user.userId, user.token),
					)
					.setLabel("Valider l'inscription")
					.setStyle(ButtonStyle.Link),
			);
		// Send Button and Message in user's DM
		member.user.send({
			content: 'Validate account',
			embeds: [embed],
			components: [btRegisterValidation],
		});

		res.sendStatus(200);
	},
);

// Add Role to user after db validation
app.post(
	'/UserValidatedOnDBModel/:userId',
	cors(corsOptionsDelegate),
	async (req: express.Request, res: express.Response) => {
		//Get params
		const user = new UserValidatedOnDBModel();
		const jsonBody: UserValidatedOnDBModel = JSON.parse(
			(req as any).rawBody as string,
		) as UserValidatedOnDBModel;
		user.userId = jsonBody.userId;
		user.discordId = jsonBody.discordId;

		if (user.userId != req.params.userId)
			return res.status(400).send('Les id ne correspondent pas');

		// get guild
		const guild = (await client.guilds.fetch(
			appConf.botConfig.guildid,
		)) as Guild;

		let member: GuildMember = null as unknown as GuildMember;
		await guild.members
			.fetch(user.discordId)
			.then(user => {
				member = user as GuildMember;
			})
			.catch(reason => {
				return res.status(400).send("L'utilisateur n'est pas sur le serveur");
			});

		// get member on guild

		//get roles
		const role = (await guild.roles.fetch(appConf.Roles.INSCRIT)) as Role;
		//Add role to user
		member.roles.add(role, 'Inscription validée');

		// send Log
		let embed = new EmbedBuilder()
			.setColor(appLang.embeds.AccountActivated.color as ColorResolvable)
			.setAuthor({ name: '[+] {0}'.format(member.user.tag) })
			.setDescription(
				appLang.embeds.AccountActivated.description.format(member.displayName),
			)
			.setFooter({ text: 'GuildMember Account Activated' })
			.setTimestamp()
			.setThumbnail(member.user.displayAvatarURL());

		const channel = member.guild.channels.cache.get(
			appConf.chanels.staff.serverLog,
		) as TextChannel;
		channel.send({
			embeds: [embed],
		});

		res.sendStatus(200);
	},
);

app.post(
	'/test',
	cors(corsOptionsDelegate),
	async (req: express.Request, res: express.Response) => {
		const guild = await client.guilds.fetch(appConf.botConfig.guildid);
		const channel = (await guild.channels.cache.get(
			'1001952449252298792',
		)) as TextChannel;

		channel.send((req as any).rawBody);
		channel.send('qsdfqsdfsqdf');
		res.send((req as any).rawBody);
	},
);
