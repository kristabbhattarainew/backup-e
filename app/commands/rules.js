const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
const { MessageActionRow, MessageButton } = require("discord-buttons");
const db = require("quick.db")

module.exports = {
  name: `rules`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    
    //--------------------------------------S T A R T---------------------------------------
  

  
  let Check = db.get(`RulesAccepted_${message.author.id}`)
//if(Check) db.delete(`RulesAccepted_${message.author.id}`)
  let accCount = db.get(`RulesAcceptedCount`)
  if(!accCount) accCount = 0

    //--------------------EMBEDS------------------------

    const Embed = new Discord.MessageEmbed()
    .setAuthor(`Order It Economy Rules`, client.user.avatarURL({dynamic : true , format : `png`}))
    .setDescription(`
*If you want use any command of Order It Economy, You will agree these rules!*

↳ You are not allowed to use your alts account for earning Order Coins.
↳ Abusing any found glitch or bug of the bot is not allowed
↳ You are not allowed to use ur alt as bank where you store Order coins.


↪ If found breaking these rules then your account will be banned from Order It Economy.
`)
    .setColor("RED")
    .setFooter(`Accepted by ${accCount} Users`);
  
  if(Check !== "True") Embed.addField("__Reward__", "Accept the rule and get 5k Order Coins & 5 Order Box")
    

    //--------------------EMBEDS------------------------

    //--------------------Buttons------------------------

    let button1 = new MessageButton()
    .setLabel(`Accept`)
    .setID(`accept`)
    .setEmoji(`✅`)
    .setStyle("blurple");

  if(Check == "True") {
    button1.setDisabled(true)
    button1.setLabel("Accepted!")
    button1.setStyle("green")
  }


    let row = new MessageActionRow()
    .addComponents(button1);

    //--------------------Buttons------------------------

    const MESSAGE = await message.channel.send(Embed, row);
 
    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 20000 });

    collector.on('collect', async (b) => {

        if(b.id == "accept") {
          
          if(Check == "True") return message.reply(`You have already claimed your reward!`)

          //---------------------Rewards------------------
          client.economy.addBal(message.author.id, 5000);
          db.add(`OrderBoxes_${b.clicker.user.id}`, 5);
           //---------------------Rewards------------------
          
          db.set(`RulesAccepted_${b.clicker.user.id}`, "True")
          db.add(`RulesAcceptedCount`, 1)
          
          const embed1 = new Discord.MessageEmbed()
          .setAuthor(`${message.author.username}`, message.author.avatarURL())
          .setDescription(`You just accepted the Order It Economy Rules!
          
          You claimed your Accepting Reward!`)
          .setColor("GREEN")
          .setTimestamp();
      

          button1.setStyle("green")
          button1.setLabel("Accepted!")
          button1.setDisabled(true)
          
          
            MESSAGE.edit(embed1, { buttons: [button1] });
            await b.reply.defer()

        }

        


    })

    collector.on('end', (b) => {
            
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
};
