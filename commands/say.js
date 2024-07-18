module.exports = {
    description: 'Repite los argumentos dados',
    run: async (message) => {
        const args = message.content.split(' ').slice(1).join(' ');

        if (args.length < 1) return message.reply('No hay un argumento válido.');

        await message.reply(args);
    }
};