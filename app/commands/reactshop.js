const Discord = require("discord.js");
const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const React  = require("../reacts.json");
const db = require("quick.db");

module.exports = {
  name: `reactshop`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    if(args[0] && args[0].toLowerCase() == "pepehalloween") {
      

      
      const embed = new Discord.MessageEmbed()
      .setTitle(`PepeHalloween`)
      .setDescription(` 
      **React Description:** Pepe is so happy for this halloween! Happy Halloween y'all.
      `)
      .addField(`__React Info__`, `**React:** <a:PepeHalloween:893832258627194900> \n**Price:** 700 Halloween Candy \n**Type:** Event Special`)
      .setFooter(`Powered By discord-reacts`)
      .setColor(`GREEN`);
      
      return message.channel.send(embed)

      
    }
    
      let Code = args[0]
  
   //if(Item[Code]) message.reply("True!")
  // if(!item[Code]) message.reply("False!")
  let T = "`"
  
if(React[Code]) {
  
  let react = React[Code]
      
      const embed = new Discord.MessageEmbed()
      .setTitle(`${Code}`)
      .setDescription(` 
      **React Description:** ${react.description}
      `)
      .addField(`__React Info__`, `**React:** ${react.emoji} \n**Price:** ${client.addCommas(react.price)} \n**Type:** ${react.type}`)
      .setFooter(`Powered By discord-reacts`)
      .setColor(`GREEN`);
      
      return message.channel.send(embed)
}

    //-----------------------------ELSE------------------------

    const embed = new Discord.MessageEmbed()
      .setTitle(`Order It React Shop`)
      .setDescription("Get more info about react by doing `o.reactshop [react]`")
    .addField(
        `__Halloween Event React__`,
        "`PepeHalloween`"
      )
    .addField(
        `__Normal Reacts__`,
        "`Heart`, `Diamond`, `BlackFlame`, `BlueFlame`, `RedFlame`, `WhiteFlame`, `GreenFlame`, `YellowFlame`, `PepeGo`, `PepeRickrolling`, `PepeToilet`, `Music`, `Like`"
      )
    .addField(
        `__Custom Reacts__`,
        "`GoldCrown`, `PepeAngry`, `RickRolled`, `NarutoNo`, `NarutoRun`, `NarutoLove`, `VIP`, `Pikachu`, `BlueCrown`, `Subaaaru`, `PepePray`, `BlobDance`, `Pog`, `Blob` \nGet your own new custon react for 300k Order Coins"
      )
    .addField(
        `__Legendary Reacts__`,
        "`Star`, `HappyBlob`"
      )
    .addField(
        `__Private React__`,
        "Get your private react for 500k Order Coins"
      )
      .addField(
        `__Order It Premium__`,
        "Check perks by doing ` --premium `\nPremium price =❯ 500k Order coins [contain user and server premium]"
      )
      .setColor("GREEN");

    return message.channel.send(embed);
  }
};
