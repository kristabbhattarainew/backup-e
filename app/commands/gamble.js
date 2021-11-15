const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const math = require("discord-math");
const Discord = require(`discord.js`);
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `gamble`,
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
    
    let author = await db.fetch(`gamblecd_${message.author.id}`)

    let timeout = 10000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to gamble again. 
      *Bruh you are gambling addict*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
  //  if(message.author.id !== "598524997954306048") return message.reply("Bot is being transfer to new platform! Please wait sometime until its finished.")
    

   let member = await client.economy.getBal(message.author.id)
    const bet = args[0];
  if(!bet) return message.reply(`Put the money to gamble!!`)
  
  let num1 = Number(args[0]);
  const lostCoins = client.addCommas(num1);
  const prevCoins = client.addCommas(await client.economy.getBal(message.author.id));
  
  const currentCoins = (method, prevCoins, won_lostCoins) => {
    
    if(method === 'sub') {
      return client.addCommas(prevCoins - won_lostCoins);
    }
    
    if(method === 'add') {
      return client.addCommas(prevCoins + won_lostCoins);
    }
    
  }
  
  if(isNaN(num1)) return message.reply(`Provided amount is not in number!!`)

  let embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  You can't gamble negative coins`);
    if (message.content.includes('-')) { 
        return message.channel.send(embed3)
    }


    let embed4 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  You don't have that much coins`);
    if (member < args[0]) {
        return message.channel.send(embed4)
    }
  
  if(args[0] < 500) return message.reply(`You need to gamble more then 500 Order coins!!`)
  if(args[0] > 5000) return message.reply(`You need to gamble less then 5000 Order coins!!`)
    
   const playernum = Math.floor(Math.random() * 8);
    const botnum = Math.floor(Math.random() * 10);
 //--------------------------------------------------------lost embed
  
  const lostembed = new Discord.MessageEmbed()
  .setColor('#f20505')
  .setAuthor(`${message.author.username}'s losing the gambling` , message.author.avatarURL({ dynamic : true , format : `png` }))
  .setDescription(`You lost <:order_coins:800022593184596028> ${lostCoins}  \n\n**Your Balance was ** <:order_coins:800022593184596028> ${prevCoins} \n**Your current balance is** <:order_coins:800022593184596028> ${currentCoins('sub', member, num1)} \n\n`)
  .addField(`${message.author.username}         ` , "Point `" + playernum + "`" , true)
  .addField(`${client.user.username}` , "Point `" + botnum + "`" , true)
  .setFooter(`Losing is not the end`);
  
  //-----------------------------------------------------won embed
  const wonamount = math.calculate(2, `/`, num1)
  const displayWonAmt = client.addCommas(wonamount);
  
  const wonembed = new Discord.MessageEmbed()
  .setColor('#00ff00')
  .setAuthor(`${message.author.username}'s winning the gambling` , message.author.avatarURL({ dynamic : true , format : `png` }))
  .setDescription(`You won <:order_coins:800022593184596028> ${displayWonAmt}  \n\n**Your Balance was ** <:order_coins:800022593184596028> ${prevCoins} \n**Your current balance is** <:order_coins:800022593184596028> ${currentCoins('add', member, wonamount)} \n\n`)
  .addField(`${message.author.username}         ` , "Point `" + playernum + "`" , true)
  .addField(`${client.user.username}` , "Point `" + botnum + "`" , true)
  .setFooter(`Winning one time don't make you win everytime`);
  
  
  if(botnum > playernum) {
    client.economy.addBal(message.author.id, parseInt(`${-num1}`));
     //----------------COOLDOWN----------------
        db.set(`gamblecd_${message.author.id}`, Date.now())
    
    let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(lostembed)
    
      return message.reply(lostembed);
  }

   if (playernum > botnum) {
    client.economy.addBal(message.author.id, parseInt(`${wonamount}`));
      //----------------COOLDOWN----------------
        db.set(`gamblecd_${message.author.id}`, Date.now())
     
     let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(wonembed)
     
       return message.reply(wonembed);
   }
        
      }

  }
};
