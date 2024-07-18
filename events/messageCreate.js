module.exports = async (message) => {
    if (message.author.bot) return; // Si el autor del mensaje es un bot nos retiramos
    if (!message.content.startsWith('-')) return; // Si el contenido del mensaje NO comienza por '-' nos retiramos

    const args = message.content.slice(1).split(' ')[0]; // El contenido del mensaje menos 1 carácter ('-')

    // text command handler
    try {
        const command = require(`../commands/${args}`);
        await command.run(message);
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar el comando -${args}`, error.message);
    }
};