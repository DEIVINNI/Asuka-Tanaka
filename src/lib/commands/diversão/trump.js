module.exports = {
    run: async(msg) => {
        if (!msg.args.join(' ')) return msg.channel.send(`${msg.config.e_men.errado} \`|\` ${msg.author}, você deve colocar alguma mensagem para o Donald Trump tweetar.`);
        msg.channel.startTyping(true);
        require('snekfetch').get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${msg.args.join(' ')}`)
        .then(async (r) => {
            msg.delete();
            await msg.channel.send({
                embed:{
                    image: { url: r.body.message },
                    footer: { icon_url: msg.author.displayAvatarURL, text: msg.author.tag },
                    timestamp: new Date(),
                    color: msg.config.colors.PADRÃO
                }
            })
        })
        msg.channel.stopTyping(true);
    },
    conf:{
        aliases: ['trumptweet'],
        nsfw: false,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 10
    },
    help: {
        name: 'trump',
        description: 'faça o Donald Trump twittar algo.',
        usage: ['trump <mensagem>'],
        member: 'usuários',
        category: 'diversão'
    }
}