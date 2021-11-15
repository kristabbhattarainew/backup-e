const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
module.exports = {
  name: `invite`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.send(
      client.embed(
        { description: `Invite Order It Economy: [Click here](https://discord.com/oauth2/authorize?client_id=762324132045914112&scope=bot&permissions=8) \nInvite Order It : [Click here](https://top.gg/bot/716257964767445043)` },
        message
      )
    );
  },
};