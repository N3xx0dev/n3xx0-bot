async function main(interaction) {
    const { channel, guild } = interaction;

    try {
        // Obtener el miembro que abrió el ticket usando el topic del canal
        const ticketOwnerId = channel.topic;
        if (!ticketOwnerId) {
            return await interaction.reply('No se puede determinar el propietario del ticket. No se cerrará el ticket.');
        }

        const ticketOwner = await guild.members.fetch(ticketOwnerId);
        
        // Informar al usuario que el ticket está siendo cerrado
        await interaction.reply('- Cerrando Ticket...');
        
        // Enviar mensaje al propietario del ticket, si existe
        if (ticketOwner) {
            await ticketOwner.send('Le avisamos de que su ticket ha sido cerrado.');
        }

        // Eliminar el canal del ticket
        await channel.delete('Ticket cerrado por el usuario');
    } catch (err) {
        console.error('Error al cerrar el ticket:', err);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp('Hubo un error al cerrar el ticket. Por favor, intenta nuevamente más tarde.');
        } else {
            await interaction.reply('Hubo un error al cerrar el ticket. Por favor, intenta nuevamente más tarde.');
        }
    }
}

module.exports = main;