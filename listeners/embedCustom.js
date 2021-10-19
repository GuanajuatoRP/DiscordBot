const { Listener } = require('discord-akairo')
const { EmbedMenu } = require('../util/ExportEmbed');


class embedCustomListener extends Listener {
    constructor() {
        super('embedCustom', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }

    async exec(interaction) {
        if (!interaction.isSelectMenu() && interaction.customId !== 'CreateEmbedMenu') return;

        let Embed = interaction.message.embeds[0]
        const filter = m => m.content.startsWith('!em ')
        await interaction.deferUpdate()
        await interaction.editReply({ content: `Vous avez choisi l'option ${interaction.values[0]}`, components: [] });

        switch (interaction.values[0]) {
            case "SetColor":
                interaction.message.reply('Merci de donner la valeur hexadécimale de la nouvelle couleur\nLe message **DOIT** commancer par : \'**!em **\', vous avez 1minute pour valider le message')
                await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(collected => {
                        Embed.color = parseInt(collected.first().content.replace("!em #", ""), 16)
                    })
                    .catch(() => console.error(`Vous avez 1minutes pour définir la description veulliez recommancer`))

                interaction.message.channel.send({
                        embeds: [Embed],
                        content: "Merci de choisir l'une de ces options pour éditer / envoyer l'embed",
                        components: [EmbedMenu]
                    })
                    .catch(console.error)
                break;
            case "SetTitle":
                interaction.message.reply('Merci de définir votre nouveau titre\nLe message **DOIT** commancer par : \'**!em **\', vous avez 1minute pour valider le message')
                await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(collected => {
                        Embed.title = collected.first().content.replace("!em ", "")
                    })
                    .catch(() => console.error(`Vous avez 1minutes pour définir le titre veulliez recommancé`))

                interaction.message.channel.send({
                    embeds: [Embed],
                    content: "Merci de choisir l'une de ces options pour éditer / envoyer l'embed",
                    components: [EmbedMenu]
                })
                break;
            case "SetUrl":
                interaction.message.reply('Merci de définir votre nouvelle url\nLe message **DOIT** commancer par : \'**!em **\', vous avez 1minute pour valider le message')
                await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(collected => {
                        Embed.url = collected.first().content.replace("!em ", "")
                    })
                    .catch(() => console.error(`Vous avez 1minutes pour définir la nouvelle url, veulliez recommancé`))

                interaction.message.channel.send({
                    embeds: [Embed],
                    content: "Merci de choisir l'une de ces options pour éditer / envoyer l'embed",
                    components: [EmbedMenu]
                })
                break;
            case "SetDesc":
                interaction.message.reply('Merci de définir votre nouvelle description\nLe message **DOIT** commancer par : \'**!em **\', vous avez 1minute pour valider le message')
                await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(collected => {
                        Embed.description = collected.first().content.replace("!em ", "")
                    })
                    .catch(() => console.error(`Vous avez 1minutes pour définir la description veulliez recommancer`))

                interaction.message.channel.send({
                        embeds: [Embed],
                        content: "Merci de choisir l'une de ces options pour éditer / envoyer l'embed",
                        components: [EmbedMenu]
                    })
                    .catch(console.error)
                break;
            case "SetImage":
                interaction.message.reply('Merci de définir votre nouvelle url\nLe message **DOIT** commancer par : \'**!em **\', vous avez 1minute pour valider le message')
                await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(collected => {
                        Embed.image = { url: collected.first().content.replace("!em ", "") }
                    })
                    .catch(() => console.error(`Vous avez 1minutes pour définir l\'url, veulliez recommancé`))

                interaction.message.channel.send({
                    embeds: [Embed],
                    content: "Merci de choisir l'une de ces options pour éditer / envoyer l'embed",
                    components: [EmbedMenu]
                })
                break;
            case "SetThumbnail":
                interaction.message.reply('Merci de définir le nouveau url de thumbnail\nLe message **DOIT** commancer par : \'**!em **\', vous avez 1minute pour valider le message')
                await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(collected => {
                        Embed.thumbnail = { url: collected.first().content.replace("!em ", "") }
                    })
                    .catch(() => console.error(`Vous avez 1minutes pour définir le nouveau thumbnail, veulliez recommancé`))

                interaction.message.channel.send({
                    embeds: [Embed],
                    content: "Merci de choisir l'une de ces options pour éditer / envoyer l'embed",
                    components: [EmbedMenu]
                })
                break;
            case "AddField":
                interaction.message.reply('Pour ajouter un nouveau champ merci de fournir dans le bon ordre : \n    -Le titre du champ\n    -La valeur du champ\n    -Sa position *(* **n** *= alligné verticalement par rapport au précédent ||* **inline** *= alligné horizontalement par rapport au précédent* ***Le champ précédent doit aussi être inline pour que cela fonctionne*** *)*\nChaque messages **DOIVENT** commancer par : \'**!em **\', vous avez 2minutes pour valider les 3 messages')
                await interaction.channel.awaitMessages({ filter, max: 3, time: 120000 })
                    .then(collected => {
                        let Values = []
                        collected.forEach(values => {
                            Values.push(values.content.replace("!em ", ""))
                        })

                        Embed.fields.push({
                            name: Values[0],
                            value: Values[1],
                            inline: (Values[2].toLowerCase() == "n" ? false : true)
                        }, )
                    })
                    .catch(() => console.error(`Vous avez 2minutes pour définir le titre veulliez recommancé`))
                console.log(Embed);

                interaction.message.channel.send({
                    embeds: [Embed],
                    content: "Merci de choisir l'une de ces options pour éditer / envoyer l'embed",
                    components: [EmbedMenu]
                })
                break;
            case "SendEmbed":
                interaction.message.reply('Merci fournir l\'id du channel dans le quel vous voulez envoyer l\'embed\nLe message **DOIT** commancer par : \'**!em **\', vous avez 1minute pour valider le message')
                await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 })
                    .then(collected => {
                        this.client.channels.cache.get(collected.first().content.replace("!em ", "")).send({
                                embeds: [Embed]
                            })
                    })
                    .catch(() => console.error(`Vous avez 2minutes pour définir le titre veulliez recommancé`))
                break;
        }
    }
}

module.exports = embedCustomListener;