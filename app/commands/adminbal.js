const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
module.exports = {
  name: `adminbal`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  
  run: async (client, message, args) => {
    
if(message.author.id !== "598524997954306048") return message.reply("This command is only for dev! ")
    
    let User = args[0];
  
    if(!User) return message.reply("Provide user id!")
    
    const coins = client.addCommas( await client.economy.getBal(User));

    const Embed = new Discord.MessageEmbed()
    .setDescription(`**Wallet: <:order_coins:800022593184596028> ${coins} **`)
    .setColor("GREEN")
    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({dynamic : true , format : `png`}))
    
    message.channel.send(Embed);
    
    let Channel = client.channels.cache.get("856026833735516180")
    return Channel.send(Embed)



  },
};
