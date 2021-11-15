const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
module.exports = {
  name: `adminlb`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    if(message.author.id !== "598524997954306048") return message.reply("This command is only for dev! ")
    
    const data = await client.economy.getTopBal(); //array
    const showLeaders = 20;
    
    await data.sort(function(a, b) {
      return b.Coins - a.Coins
    })
    
    const leaderBoardWithId = data.slice(0, showLeaders);
    let leaderboard = '';
    let index = 1;
    
    leaderBoardWithId.forEach(leader => {
      let name = leader.User;
      const coins = client.addCommas(leader.Coins);
      name.toString();
      
      leaderboard += "`" + index++ + ".`" +`**${client.users.cache.get(name) ? client.users.cache.get(name).tag : "Unknown User"}** [ ${name} ]: ${coins} \n`
    })   
    
    if(leaderboard !== undefined) {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Top 20 Order Coins Richest Users`)
      .setDescription(leaderboard + "\nType `o.help` to get start.")
      .setColor("GREEN")
      .setTimestamp()
      .setFooter("© 2021 Order It Economy");
    message.channel.send(embed)
      
      let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(embed)
    }
    
  },
};