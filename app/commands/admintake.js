const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const ms = require("ms")


module.exports = {
  name: `admintake`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    let OwnerIDs = ["598524997954306048", ""];

    const Alloweduser = OwnerIDs.includes(message.author.id) 

    if(Alloweduser) {
    if(!args[0]) return message.reply("Please provide the user id!")
    let User = ms(args[0]);
if(isNaN(User)) return message.reply("Given user id is invalid!")
  
    if(!User) return message.reply("Given User does not exist???")

    const TakeCoins = args[1];

    client.economy.addBal(User, parseInt(`-${TakeCoins}`));
    

    message.channel.send(`Successfully took ${TakeCoins} Order coins from ${User}.`)

    }

    if(!Alloweduser) return;
    

  },
  timeout: 5000
};