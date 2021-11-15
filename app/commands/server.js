const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
module.exports = {
  name: `server`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  
  run: async (client, message, args) => {
    
    //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: Visit: https://kristab.ml/botsecret and try to find the password.").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------

    const Embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL({dynamic : true , format : `png`}))
    .setDescription(`Join our server to spend your Order Coins!
    🔗 https://discord.gg/EZDfrer`)
    .setColor("GREEN")
    .setFooter(`You can also get reacts in ur every command by buying reacts in this server!`)
    
    message.channel.send(Embed);



  },
};
