const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");

module.exports = {
  name: `rps`,
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
    
    let author = await db.fetch(`rpscd_${message.author.id}`)

    let timeout = 60000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to play Rock Paper Scissors again. 
      *dont think you will always!*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
  //  if(message.author.id !== "598524997954306048") return message.reply("This command is under testing! Please wait sometime until its finished.")
    
        let Channel = client.channels.cache.get("856026833735516180")
        
        //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: People thinks that number 3 is unlucky number!").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
        
        //--------------------------------------S T A R T---------------------------------------

    //--------------------EMBEDS------------------------

    const embed = new Discord.MessageEmbed()
    .setDescription(`${message.author} is playing Rock Paper Scissors game with Order It Economy!`)
    .setColor("YELLOW")
    .setTimestamp();
    
        //----------------COOLDOWN----------------
        db.set(`rpscd_${message.author.id}`, Date.now())

    //--------------------EMBEDS------------------------

    //--------------------Buttons------------------------

    let button1 = new MessageButton()
    .setLabel(`Rock`)
    .setID(`rock`)
    .setEmoji(`883252283880648704`)
    .setStyle("green");

    let button2 = new MessageButton()
    .setLabel(`Paper`)
    .setID(`paper`)
    .setEmoji(`📄`)
    .setStyle("green");

    let button3 = new MessageButton()
    .setLabel(`Scissors`)
    .setID(`scissors`)
    .setEmoji(`✂`)
    .setStyle("green");


    let row = new MessageActionRow()
    .addComponents(button1, button2, button3);

    //--------------------Buttons------------------------

    const MESSAGE = await message.channel.send(embed, row);
 
    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 20000 });

    collector.on('collect', async (b) => {

        if(b.id == "rock") {
          
          const embed1 = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, message.author.avatarURL())
          .setTimestamp();
            
          //-----------------------Selection------------------
          const RPS = ["Rock", "Paper", "Scissors"]
          const random = RPS[Math.floor(Math.random() * RPS.length)]

          embed1.addField(`${message.author.username}`, "`Rock`")
          embed1.addField(`Order It Economy`, "`"+ random +"`")          

  
          
          if(random == "Rock" ) {
            embed1.setDescription(`${message.author} picked Rock & Order It Economy picked Rock! [**Tie**] \n **+250 Order Coins**`);
            embed1.setColor("BLUE");
            
           client.economy.addBal(b.clicker.user.id, 250);
            
          }
          
          if(random == "Paper" ) {
            embed1.setDescription(`${message.author} picked Rock & Order It Economy picked Paper! [**Lost**] `);
            embed1.setColor("RED");
            
          }
          
          if(random == "Scissors" ) {
            embed1.setDescription(`${message.author} picked Rock & Order It Economy picked Scissors! [**Won**] \n **+500 Order Coins**`);
            embed1.setColor("GREEN");
            
            client.economy.addBal(b.clicker.user.id, 500);
          }

          button1.setStyle("green")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
          button3.setStyle("grey")
          button3.setDisabled(true)
          
            MESSAGE.edit(embed1, { buttons: [button1, button2, button3] });
          Channel.send(embed1)
          
           db.add(`rankuppoints_${b.clicker.user.id}`, 1)
        db.add(`totalrankpoints_${b.clicker.user.id}`, 1)
        //----------------COOLDOWN----------------
        //db.set(`rpscd_${b.clicker.user.id}`, Date.now())
          
            await b.reply.defer()

        }

        if(b.id == "paper") {
          
          const embed1 = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, message.author.avatarURL())
          .setTimestamp();
            
          //-----------------------Selection------------------
          const RPS = ["Rock", "Paper", "Scissors"]
          const random = RPS[Math.floor(Math.random() * RPS.length)]

          embed1.addField(`${message.author.username}`, "`Paper`")
          embed1.addField(`Order It Economy`, "`"+ random +"`")          

  
          
          if(random == "Rock" ) {
            embed1.setDescription(`${message.author} picked Paper & Order It Economy picked Rock! [**Won**] \n **+500 Order Coins**`)
            embed1.setColor("GREEN")
            
            client.economy.addBal(b.clicker.user.id, 500);
          }
          
          if(random == "Paper" ) {
            embed1.setDescription(`${message.author} picked Paper & Order It Economy picked Paper! [**Tie**] \n **+250 Order Coins**`)
            embed1.setColor("BLUE")
            
           client.economy.addBal(b.clicker.user.id, 250);
          }
          
          if(random == "Scissors" ) {
            embed1.setDescription(`${message.author} picked Paper & Order It Economy picked Scissors! [**Lost**]`)
            embed1.setColor("RED")
          }
          
          button1.setStyle("grey")
          button1.setDisabled(true)
          button2.setStyle("green")
          button2.setDisabled(true)
          button3.setStyle("grey")
          button3.setDisabled(true)
          
            MESSAGE.edit(embed1, { buttons: [button1, button2, button3] });
          Channel.send(embed1)
            
           db.add(`rankuppoints_${b.clicker.user.id}`, 1)
        db.add(`totalrankpoints_${b.clicker.user.id}`, 1)
        //----------------COOLDOWN----------------
        //db.set(`rpscd_${b.clicker.user.id}`, Date.now())
          
            await b.reply.defer()

        }

        if(b.id == "scissors") {
          
          const embed1 = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, message.author.avatarURL())
          .setTimestamp();
            
          //-----------------------Selection------------------
          const RPS = ["Rock", "Paper", "Scissors"]
          const random = RPS[Math.floor(Math.random() * RPS.length)]

          embed1.addField(`${message.author.username}`, "`Scissors`")
          embed1.addField(`Order It Economy`, "`"+ random +"`")          

  
          
          if(random == "Rock" ) {
            embed1.setDescription(`${message.author} picked Scissors & Order It Economy picked Rock! [**Lost**]`)
            embed1.setColor("RED")
          }
          
          if(random == "Paper" ) {
            embed1.setDescription(`${message.author} picked Scissors & Order It Economy picked Paper! [**Won**] \n **+500 Order Coins**`)
            embed1.setColor("GREEN")
            
            client.economy.addBal(b.clicker.user.id, 500);
          }
          
          if(random == "Scissors" ) {
            embed1.setDescription(`${message.author} picked Scissors & Order It Economy picked Scissors! [**Tie**] \n **+250 Order Coins**`)
            embed1.setColor("BLUE")
            
            client.economy.addBal(b.clicker.user.id, 250);
          }
          
          button1.setStyle("grey")
          button1.setDisabled(true)
          button2.setStyle("grey")
          button2.setDisabled(true)
          button3.setStyle("green")
          button3.setDisabled(true)
          
            MESSAGE.edit(embed1, { buttons: [button1, button2, button3] });
          Channel.send(embed1)
            
           db.add(`rankuppoints_${b.clicker.user.id}`, 1)
        db.add(`totalrankpoints_${b.clicker.user.id}`, 1)
        //----------------COOLDOWN----------------
        //db.set(`rpscd_${b.clicker.user.id}`, Date.now())
          
            await b.reply.defer()

        }


    })

    collector.on('end', (b) => {
      
        //----------------COOLDOWN----------------
       // db.set(`rpscd_${message.author.id}`, Date.now())
            
//           button1.setStyle("grey")
//           button1.setDisabled(true)
//           button2.setStyle("grey")
//           button2.setDisabled(true)
//           button3.setStyle("grey")
//           button3.setDisabled(true)
          
//             MESSAGE.edit({ buttons: [button1, button2, button3] });
    })

       //---------------------------------------E N D----------------------------------------
        
        
      }
  }
};
