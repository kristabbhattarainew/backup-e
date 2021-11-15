const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
const ms = require("ms");
const db = require("quick.db");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");
const React = require("../reacts.json")

module.exports = {
  name: `buyreact`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => { 
    
        let bancheck = db.get(`banned_${message.author.id}`)
    if(bancheck) {
            
      const banembed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username} [ Banned ]`, message.author.avatarURL())
      .setDescription(`*You are banned from using any Order Coins source commands!*
      **Reason:** ${bancheck}

      Request unban by using **o.unbanreq [reason]**
      `)
      .setColor("RED")
      .setTimestamp()
      
      return message.reply(banembed)
    }
    
   //  if(message.author.id !== "598524997954306048") return message.reply("This command is being re-designed! Please wait sometime until its finished.")
    
    let Channel = client.channels.cache.get("773072387881041930")
    if(!Channel) return message.reply("This command is having problem right now! [ERROR 101]")
    
  
    if(!args[0]) return message.reply("Please give the react id to buy!")
    
    if(!React[`${args[0]}`]) {
      return message.reply(`Given react is not available to buy!`)
    }
    
    let react = React[args[0]]
    
    let Worth = ms(react.price)
    
     let Bal = await client.economy.getBal(message.author.id)
    
    if(Bal < Worth) return message.reply(`You dont have enough Order Coins to buy this react!`)
    
//      //--------------------------------------S T A R T-------------------------------------

//     //--------------------EMBEDS------------------------

    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}, Would you like to buy ${args[0]} React?`)
    .setDescription(`**React:** ${react.emoji} 
    **React Id:** ${args[0]} 
    **Price:** ${client.addCommas(react.price)}
    
    **Balance Rightnow:** ${client.addCommas(Bal)}
    **Balance After Transaction:** ${client.addCommas(Bal - react.price)}`)
    .setColor("BLUE")
    .setTimestamp();
    

//     //--------------------EMBEDS------------------------

//     //--------------------Buttons------------------------

    let button1 = new MessageButton()
    .setLabel(`Confirm`)
    .setID(`confirm`)
    .setEmoji(`✅`)
    .setStyle("green");

    let button2 = new MessageButton()
    .setLabel(`Cancel`)
    .setID(`cancel`)
    .setEmoji(`❌`)
    .setStyle("grey");


    let row = new MessageActionRow()
    .addComponents(button1, button2);

//     //--------------------Buttons------------------------

    const MESSAGE = await message.channel.send(embed, row);
 
    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 20000 });

    collector.on('collect', async (b) => {

        if(b.id == "confirm") {
          
          
          let BalNew = await client.economy.getBal(b.clicker.user.id)
    
     if(BalNew < Worth) {
      
          button1.setStyle("grey")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
          
            MESSAGE.edit(`You dont have enough Order Coins to buy this react! [${BalNew}]`, { buttons: [button1, button2] });
          
            await b.reply.defer()
    }
      
           if(BalNew >= Worth) {
             
              client.economy.addBal(b.clicker.user.id, -Worth);
          
          const embed1 = new Discord.MessageEmbed()
          .setDescription(`**${message.author.username}**, You bought **${args[0]}** [${react.emoji}] for **${client.addCommas(Worth)} Order Coins**!`)
          .setColor("GREEN")
          .setTimestamp();
            

          button1.setStyle("green")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
  
          
            MESSAGE.edit(embed1, { buttons: [button1, button2] });
             
             const embedfinal = new Discord.MessageEmbed()
             .setTitle(`React Purchased by ${b.clicker.user.tag}!`)
             .setDescription(`       
Buyer: ${b.clicker.user.tag} | ${b.clicker.user.id}
React: ${react.emoji}
Price: ${react.price}
`)
             .addField("React Id:", `${args[0]}`)
             .setFooter(`${b.clicker.user.id}`)
             .setColor("GREEN")
             
             Channel.send(embedfinal)
          
            await b.reply.defer()

           }
        }

     
      if(b.id == "cancel") {
          
          const embed1 = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}, Alright I cancel it!`, message.author.avatarURL())
          .setColor("RED")
          .setTimestamp();
            
         

          button1.setStyle("green")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
  
          
            MESSAGE.edit(embed1, { buttons: [button1, button2] });
          
            await b.reply.defer()

        }


    })

    collector.on('end', (b) => {
      
      
      
    })

//        //---------------------------------------E N D----------------------------------------
  


   
      
}
};