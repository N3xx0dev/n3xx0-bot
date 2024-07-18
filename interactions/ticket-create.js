const Discord = require('discord.js');

const guildTicketCategoryId = '1241053332190138419';
const moderationRole = '1241053248274698240';

const ticketCloseButton = new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder()
        .setCustomId('ticket-close')
        .setLabel('Cerrar Ticket')
        .setStyle(Discord.ButtonStyle.Secondary)
        .setEmoji('🔒')
);

async function main(interaction) {
    const { user, guild } = interaction;
    const ticketType = interaction.values[0];

    // Verificar si el usuario ya tiene un ticket abierto
    const tickets = guild.channels.cache.filter(channel => channel.parentId === guildTicketCategoryId);
    if (tickets.some(ticket => ticket.topic === user.id)) {
        return interaction.reply({ content: '¡Ya tienes un ticket abierto!', ephemeral: true });
    }

    // Responder que el ticket está siendo creado
    await interaction.reply({ content: 'Tu ticket está siendo creado...', ephemeral: true });

    try {
        // Crear el canal de ticket
        const channel = await guild.channels.create({
            name: `${ticketType}-${user.username.slice(0, 25 - ticketType.length)}`,
            topic: user.id,
            type: Discord.ChannelType.GuildText,
            parent: guildTicketCategoryId,
            permissionOverwrites: [
                { id: guild.roles.everyone, deny: [Discord.PermissionsBitField.Flags.ViewChannel] },
                { id: moderationRole, allow: [Discord.PermissionsBitField.Flags.ViewChannel] },
                { id: user.id, allow: [Discord.PermissionsBitField.Flags.ViewChannel] }
            ]
        });

        // Editar la respuesta de interacción para incluir el enlace al ticket creado
        await interaction.editReply({ content: `Tu ticket ha sido creado: ${channel}` });

        // Enviar mensaje de bienvenida al canal del ticket
        await channel.send({
            content: `Bienvenido ${user}, \n\nEl Staff estará contigo en unos instantes.`,
            components: [ticketCloseButton]
        });
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        await interaction.editReply({ content: 'Hubo un error al crear tu ticket. Por favor, intenta nuevamente más tarde.' });
    }
}

module.exports = main;