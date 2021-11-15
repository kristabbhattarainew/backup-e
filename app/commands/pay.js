const Discord = require(`discord.js`);
const Client = require("../structures/Client");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `pay`,
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
    
     let Check = db.get(`RulesAccepted_${message.author.id}`)
    if(Check !== "True") return message.reply("You have to first accept rules to pay someone!  Do `o.rules` to accept.")
    
    let author = await db.fetch(`paycd_${message.author.id}`)

    let timeout = 5000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
      
  let time = ms(timeout - (Date.now() - author));
      
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.avatarURL())
      .setDescription(`You need to wait **${time}** to pay again. 
      *hold your horses dude*
      `)
      .setColor("RED")
      .setTimestamp()
      
     return message.channel.send(Embed)
      
      } else {
    
    // if(!message.content.startsWith('o.'))return;

    let user = message.mentions.users.first() 
  
    let member = await client.economy.getBal(message.author.id)

    let embed1 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  Mention someone to pay`);
    if (!user) {
        return message.channel.send(embed1)
    }


    let embed6 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  You cannot pay to yourself`);
    if (message.author.id == user.id) {
        return message.channel.send(embed6)
    }

    let embed9 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  You cannot pay to bot`);
    if (user.bot) {
        return message.channel.send(embed9)
    }


    let embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  Specify an amount to pay`);
    if (!args[1]) {
        return message.channel.send(embed2)
    }



    let embed7 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  This is not valid amount to pay`);
    if(isNaN(args[1])){
        return message.channel.send(embed7)
    }


    let embed8 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  You need to pay more then 1 coins`);
    if(args[1] < 1) {
    return message.channel.send(embed8);
    }


    let embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  You can't pay someone negative coins`);
    if (message.content.includes('-')) { 
        return message.channel.send(embed3)
    }


    let embed4 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`❎  You don't have that much coins`);
    if (member < args[1]) {
        return message.channel.send(embed4)
    }
    
    
    const presentCoins = client.addCommas(args[1]);
        
  
    let embed5 = new Discord.MessageEmbed()
    .setColor("#0ff020")
    .setDescription(`✅  **${message.author.username}** have paid ${user.username} <:order_coins:800022593184596028> ${presentCoins} `);
    message.channel.send(embed5)
        
         let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(embed5)

    const GiveCoins = args[1];

    client.economy.addBal(user.id, parseInt(`${GiveCoins}`));
    client.economy.addBal(message.author.id, parseInt(`${-GiveCoins}`));

         //----------------COOLDOWN----------------
        db.set(`paycd_${message.author.id}`, Date.now())
      }
  }
};