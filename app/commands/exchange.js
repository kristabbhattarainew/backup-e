const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
const ms = require("ms");
const db = require("quick.db");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");
const React = require("../reacts.json")

module.exports = {
  name: `exchange`,
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
    
              //----------------halloween Timer----------------
    
    let author2 = await db.fetch(`HalloweenTimer`)
  
    let timeout2 = 2534400000;
    
    let time2;
    
    if (author2 !== null && timeout2 - (Date.now() - author2) > 0) time2 = ms(timeout2 - (Date.now() - author2));
    
    if(time2 == undefined) time2 = "Event Ended"
    
    
    //----------------halloween Timer----------------
    
    if(message.author.id !== "598524997954306048") return message.reply("Event has ended!")
    
    let Channel = client.channels.cache.get("773072387881041930")
    if(!Channel) return message.reply("This command is having problem right now! [ERROR 101]")
    
  
    if(!args[0]) return message.reply("Please type what you want to exchange! [`o.exchange candy react`]")
    
    if(args[0] !== "candy") {
      return message.reply(`Given item is not available to exchange!`)
    }
    
    
     let Bal = db.get(`HalloweenCandy_${message.author.id}`)
    
    if(Bal < 600) return message.reply(`You dont have enough halloween candy to buy this react which cost 600 Halloween Candy! \nYou have ${Bal} Halloween Candy rightnow!`)
    
//      //--------------------------------------S T A R T-------------------------------------

//     //--------------------EMBEDS------------------------

    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}, Would you like to buy PepeHalloween React?`)
    .setDescription(`**React:** <a:PepeDance:904208209827471380>
    **React Id:** PepeDance
    **Price:** 600 Halloween Candy
    
    **Halloween Candy Rightnow:** ${Bal}
    **Halloween Candy After Transaction:** ${Bal - 600}`)
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
          
          
          let BalNew = db.get(`HalloweenCandy_${b.clicker.user.id}`)
    
     if(BalNew < 600) {
      
          button1.setStyle("grey")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
          
            MESSAGE.edit(`You dont have enough Halloween Candy to buy this react! [${BalNew}]`, { buttons: [button1, button2] });
          
            await b.reply.defer()
    }
      
           if(BalNew >= 600) {
             
              db.subtract(`HalloweenCandy_${b.clicker.user.id}`, 600)
          
          const embed1 = new Discord.MessageEmbed()
          .setDescription(`**${message.author.username}**, You bought **PepeDance** [<a:PepeDance:904208209827471380>] for **600 Halloween Candy**!`)
          .setColor("GREEN")
          .setTimestamp();
            

          button1.setStyle("green")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
  
          
            MESSAGE.edit(embed1, { buttons: [button1, button2] });
             
             const embedfinal = new Discord.MessageEmbed()
             .setTitle(`React Purchased with Halloween Candy by ${b.clicker.user.tag}!`)
             .setDescription(`       
Buyer: ${b.clicker.user.tag} | ${b.clicker.user.id}
React: <a:PepeDance:904208209827471380>
Price: 600 Halloween Candy
`)
             .addField("React Id:", `PepeDance`)
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