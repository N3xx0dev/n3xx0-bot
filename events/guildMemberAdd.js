const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const generateImage = require("../utils/canvas/welcomeImage");

module.exports = async (member) => {
    const { client } = member;
    const welcomeChannelId = '1241053340679405660';
    const channel = await client.channels.fetch(welcomeChannelId);

    const buffer = await generateImage(member);
    const attachment = new AttachmentBuilder(buffer, {
        name: "generated-image.png",
    });

    const embed = new EmbedBuilder()
        .setColor(0x01808F)
        .setTitle(`**${member.user.username} bienvenido a la comunidad!** ✨`)
        .setDescription(`Nos alegramos de recibirte en la comunidad, recuerda echarle un vistazo a los canales de verificación y chats del servidor.
        
        No te olvides de leer las normas para evitar cualquier castigo o sanción por parte del Staff.`)
        .setImage("attachment://generated-image.png");

    await channel.send({
        content: `<@${member.user.id}>`,
        embeds: [embed],
        files: [attachment]
    });
};

