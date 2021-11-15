const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
module.exports = {
  name: `roll`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const Jobs = [
      ``
    ];
    const Job = Jobs[Math.floor(Math.random() * Jobs.length)];

    const maxnum = args[0]
    const money = args[1]

    OwnerIDs = ["598524997954306048", ""];

    const Alloweduser = OwnerIDs.includes(message.author.id) 

    if(Alloweduser) {

    const Num = Math.floor(Math.random()  * maxnum );
    message.channel.send(
      client.embed(
        { description: `Lottery winner : Lottery Ticket number '${Num}' won ${money} Order coins.` },
        message
      )
    );
    }
    if (!Alloweduser) return message.channel.send(`You are not allowed to use this command.`);
    
  },
  timeout: 5000
};
