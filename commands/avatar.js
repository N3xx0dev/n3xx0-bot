const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Hacer display de la imagen del usuario.',
    run: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const member = await message.guild.members.fetch(target.id);

        if (!member) return message.reply("Introduce un usuario válido.");
        
        const avatar = member.user.displayAvatarURL({ size: 512 });

        const embed = new EmbedBuilder()
            .setColor(0x01808F)
            .setTitle(`👻 Avatar de ${member.user.username}`)
            .setImage(avatar);

        await message.reply({
            embeds: [embed]
        });
    }
};