const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");
const Discord = require("discord.js");

module.exports = {
  name: `help`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    
     //--------------------------------------S T A R T---------------------------------------

    //--------------------EMBEDS------------------------

    const embed1 = new Discord.MessageEmbed()
    .setDescription("**Help Menu Of Order It Economy** \n\n-------------------------\n*HALLOWEEN EVENT COMMANDS*\n `o.tt` : [2 Minutes cooldown] \n`o.exchange candy react` : [To exchange candy for PepeHalloween react] \n-------------------------\n`o.gamble` : [10 Seconds cooldown] \n`o.beg` : [30 Seconds cooldown] \n`o.fish` : [45 Seconds cooldown] \n`o.scout` : [1 Minute cooldown] \n`o.rps` : [1 Minute cooldown] \n`o.hunt` : [2 Minutes cooldown] \n`o.mine` : [2 Minutes cooldown] \n`o.work` : [1 Hour cooldown] \n`o.daily` : [24 Hour cooldown] \n\n**[Vote Order It](https://top.gg/bot/716257964767445043/vote) || [Vote Order It Economy](https://top.gg/bot/762324132045914112/vote)**")
    .setColor("GREEN")
    
    
    const embed2 = new Discord.MessageEmbed()
    .setDescription("**Help Menu Of Order It Economy** \n\n`o.showcase add [item-id]` : [To showcase the item from your inventory in stats] \n`o.showcase remove` : [To remove the showcase item]  \n`o.lb` : [To check top 20 leaderboard] \n`o.stats <id/mention>` : [To check all stats] \n`o.achievements <id/mention>` : [To check achievements] \n`o.use <item-id> <item-amount>` : [To use the item] \n`o.buy <item-id> <item-amount>` : [To buy the item from shop] \n`o.sell <item-id> <item-amount>` : [To sell the item from your inventory] \n`o.inv` : [To check the inventory] \n`o.gift <amount> <item-id> <@mention>` : [To gift the item to other] \n`o.bal` : [To check your and other balance] \n`o.pay <mention user> <coins>` : [To pay other people] \n`o.buyreact <react-id>` : [To buy react and premium] \n`o.ping` : [To check ping] \n`o.shop` : [To check the item shop] \n`o.reactshop` : [To check the react shop] \n`o.redeem [code]` : [To redeem special event code] \n`o.rules` : [Rules to be followed by Order It Economy users] \n`o.unbanreq <request message>` : [ To request unban ] \n`o.invite` : [Invite Bot] \n\n**[Vote Order It](https://top.gg/bot/716257964767445043/vote) || [Vote Order It Economy](https://top.gg/bot/762324132045914112/vote)**")
    .setColor('GREEN')
    
    
    const embed3 = new Discord.MessageEmbed()
    .setDescription("**Help Menu Of Order It Economy** \n\n`o.market sell [item-amount] [item-id] [item-price]` : [To sell your inventory item in Public Market] \n`o.market buy [item-id] [seller-id]` : [To buy the item from Public Market] \n`o.market remove [item-id]` : [To remove item from Public Market] \n`o.market myitem` : [To see your item listed in Public Market] \n`o.market shop [item-id]` : [To check items in Public Market] \n\n**[Vote Order It](https://top.gg/bot/716257964767445043/vote) || [Vote Order It Economy](https://top.gg/bot/762324132045914112/vote)**")
    .setColor('GREEN')
    

    //--------------------EMBEDS------------------------

    //--------------------Buttons------------------------

    let button1 = new MessageButton()
    // .setLabel(`◀`)
    .setID(`back`)
    .setEmoji(`◀`)
    .setStyle("green");

    let button2 = new MessageButton()
    // .setLabel(`▶`)
    .setID(`front`)
    .setEmoji(`▶`)
    .setStyle("green");
    
    let button3 = new MessageButton()
     .setLabel(`Market`)
    .setID(`market`)
    .setEmoji(`🛒`)
    .setStyle("blurple");


    let row = new MessageActionRow()
    .addComponents(button1, button2, button3);

    //--------------------Buttons------------------------

    const MESSAGE = await message.channel.send(embed1, row);
 
    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 500000 });

    collector.on('collect', async (b) => {

        if(b.id == "front") {
          
          button2.setStyle("green")
          button2.setDisabled(true)
          button1.setStyle("green")
          button1.setDisabled(false)
          button3.setStyle("blurple")
          button3.setDisabled(false)
          
    
          
          MESSAGE.edit(embed2, { buttons: [button1, button2, button3] });
          
            await b.reply.defer()

        }
      
      if(b.id == "back") {
          
          button1.setStyle("green")
          button1.setDisabled(true)
          button2.setStyle("green")
          button2.setDisabled(false)
          button3.setStyle("blurple")
          button3.setDisabled(false)
    
          
          MESSAGE.edit(embed1, { buttons: [button1, button2, button3] });
          
            await b.reply.defer()

        }
      
      
      if(b.id == "market") {
          
        button1.setStyle("green")
          button1.setDisabled(false)
          button2.setStyle("green")
          button2.setDisabled(false)
        button3.setStyle("blurple")
          button3.setDisabled(true)
          
    
          
          MESSAGE.edit(embed3, { buttons: [button1, button2, button3] });
          
            await b.reply.defer()

        }

        


    })

    collector.on('end', (b) => {
      
        //----------------COOLDOWN----------------
            
          button1.setStyle("grey")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
          button3.setStyle("grey")
          button3.setDisabled(true)

          
             MESSAGE.edit(embed1, { buttons: [button1, button2, button3] });
    })

       //---------------------------------------E N D----------------------------------------
    
  

  }
}