const { Message } = require(`discord.js`);
const Client = require("../structures/Client");


module.exports = {
  name: `give`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    let OwnerIDs = ["598524997954306048", ""];

    const Alloweduser = OwnerIDs.includes(message.author.id) 

    if(Alloweduser) {
    
   let USER_ID = args[0];
    if(!USER_ID) USER_ID = message.author.id
 
    let User = message.mentions.users.first();

    if(!User) User = client.users.cache.get(USER_ID);
  
    if(!User) return message.reply("Given User does not exist??")
    

    const GiveCoins = args[1];

    client.economy.addBal(User.id, parseInt(`${GiveCoins}`));

    message.channel.send(`Successfully gaved ${GiveCoins} Order coins to ${User.username}. `)
    }
    
    if (!Alloweduser) return;

  }
};
