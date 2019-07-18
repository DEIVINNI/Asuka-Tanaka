const { get } = require('snekfetch');
const { RemiyaEmbed } = require('../../../util/functions/index')

module.exports = {
    run: async(msg) => {
        const embed = new RemiyaEmbed(msg.author).setDescription(`Reaja em ${msg.config.e_men.reload_} para trocar a imagem.`);
        let get_image = msg.args[0] == '--gif' ? msg.config.get_images.nekos.nsfw.nekoGif : msg.args[0] == '--ero' ? msg.config.get_images.nekos.nsfw.eroNeko : msg.config.get_images.nekos.nsfw.neko;
        get(get_image).then(r => {
            msg.channel.send(embed.setImage(r.body.url)).then(message => {
                message.react(msg.config.e_id.reload_)
                const collector = message.createReactionCollector((r,u) => r.emoji.id === msg.config.e_id.reload_ && u.id == msg.author.id, {time: 60000});
                collector.on('collect', (r) => {
                    switch (r.emoji.id) {
                        case msg.config.e_id.reload_:
                            get(get_image).then(r1 => {
                                r.remove(msg.author.id)
                                message.edit(embed.setImage(r1.body.url))
                            })
                        break;
                    }
                })
                setTimeout(() => {
                    message.edit(embed.setDescription(''))
                    message.clearReactions();
                }, 60000)
            })
        })
    },
    conf:{
        aliases: [],
        nsfw: true,
        guildOnly: false,
        ownerOnly: false,
        manu: false,
        enable: true,
        hide_help: true,
        cooldown: 60
    },
    help: {
        name: 'p_neko',
        description: 'veja uns hentais ( ͡° ͜ʖ ͡°)',
        usage: ['p_neko','p_neko --gif', 'p_neko --ero'],
        member: 'usuários',
        category: 'nsfw'
    }
}