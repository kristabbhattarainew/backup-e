const { Client, Collection } = require("discord.js");
const express = require('express');
const app = express();
const Topgg = require('@top-gg/sdk');
const React = require("../reacts.json")
const ms = require("ms");
const Item = require("../shop-items.json") 


const webhook = new Topgg.Webhook(process.env.topggauth);

app.listen(3000);

const db = require("quick.db");


class EconomyClient extends Client {
  constructor() {
    super();
    this.discord = require("discord.js");
    this.fs = require("fs");
    this.path = require("path");
    this.ms = require("ms");
    this.mongoose = require("mongoose");
    this.commands = new Collection();
    this.timeouts = new Collection();
    this.config = {
      prefix: `o.`,
    };
    
    const disbut = require("discord-buttons")
disbut(this);
    
    //add commas to numbers
    this.addCommas = num => {
      return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    
    //item id
    this.Itemid = item => {

      let ck = db.get(`ItemID_${item}`)
      let ITEMemoji = Item[ck].emoji
      
      return item.replace(item, "`"+ck+"` [" + ITEMemoji+ "]")
    }

    //item amount
    this.Itemamount = item => {

      let ck = db.get(`ItemAmount_${item}`)
      return item.replace(item, "`x"+ck+"`")
    }
    
    this.schema = this.mongoose.model(
      `economy`,
      new this.mongoose.Schema({
        User: String,
        Coins: Number,
      })
    );
    const self = this;
    
    this.economy = {
      async getBal(User) {
        return await self.schema
          .findOne({ User })
          .then((d) => (d ? d.Coins : 0));
      },
      
      async getTopBal() {
        return await self.schema
          .find({})
      },
      
      
      async addBal(User, Coins) {
        return await self.schema.findOne({ User }, async (err, data) => {
          if (err) throw err;
          if (data) {
            data.Coins += Coins;
          } else {
            data = new self.schema({ User, Coins });
          }
          data.save();
        });
      },
    };
  }
  commandHandler(path) {
    this.fs.readdirSync(this.path.normalize(path)).map((f) => {
      const File = require(this.path.join(__dirname, `..`, path, f));
      this.commands.set(File.name, File);
    });
  }
  getCommand(cmd) {
    return this.commands.has(cmd) ? this.commands.get(cmd) : false;
  }
  start(token, path) {
    this.commandHandler(path);
    this.login(process.env.token);
    this.mongoose.connect(
      process.env.dbConnect,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    this.mongoose.connection.on("connected", () => console.log("DB connected"));
      
  
    
    this.on("ready", async () => {
    console.log(`Order It Economy Bot is now online`)
      console.log(`Order It Economy is in ${this.guilds.cache.size} servers.`)

    setInterval(() => {
      const statuses = [
        // `Collect Order coins`,
        // `o.help`,
        // "o.rules",
        // `${this.guilds.cache.size} Servers`
         `Happy Halloween y'all`
      ]
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      this.user.setActivity(status);
    }, 10000)
});
    this.on("message", async (message) => {
      if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(this.config.prefix)
      )
        return;
      const args = message.content
        .slice(this.config.prefix.length)
        .trim()
        .split(/ +/g);
      const cmd = args.shift().toLowerCase();
      const command = this.getCommand(cmd);
      if (!command) return;
      if (command.timeout) {
        if (this.timeouts.has(`${command.name}${message.author.id}`))
          return message.channel.send(
            this.embed(
              {
                description: `Please wait ${this.ms(
                  this.timeouts.get(`${command.name}${message.author.id}`) -
                    Date.now(),
                  { long: true }
                )} before using this command again!`,
              },
              message
            )
          );
        command.run(this, message, args).catch(console.error);
        this.timeouts.set(
          `${command.name}${message.author.id}`,
          Date.now() + command.timeout
        );
        setTimeout(() => {
          this.timeouts.delete(`${command.name}${message.author.id}`);
        }, command.timeout);
      } else return command.run(this, message, args).catch(console.error);
    });

//------------------------EVENTS---------------------------------------------
    
    this.on("message", async (message) => {
    
     // if(message.author.id !== "598524997954306048") return;
      
      let Checkrp = db.get(`rankuppoints_${message.author.id}`)
      if(!Checkrp) return;
      
      let Checkrank = db.get(`rank_${message.author.id}`)
      
//       if(Checkrank >= 6) {
//         db.subtract(`rank_${message.author.id}`, 1)

//         let finalrank = db.get(`rank_${message.author.id}`)
        
//         message.reply(`Your rank has been decreased from ${Checkrank}  to ${finalrank}`)
//       } 
      
      let rank1 = 500
      let rank2 = 1000
      let rank3 = 1500
      let rank4 = 2000
      let rank5 = 2500
      let rank6 = 3000
      let rank7 = 3500
      let rank8 = 4000
      let rank9 = 4500
      let rank10 = 5000
      
      let reqrp = 99999
      if(Checkrank == undefined || Checkrank == null || Checkrank == 0) reqrp = rank1
      if(Checkrank == 1) reqrp = rank2
      if(Checkrank == 2) reqrp = rank3
      if(Checkrank == 3) reqrp = rank4
      if(Checkrank == 4) reqrp = rank5
      if(Checkrank == 5) reqrp = rank6
      if(Checkrank == 6) reqrp = rank7
      if(Checkrank == 7) reqrp = rank8
      if(Checkrank == 8) reqrp = rank9
      if(Checkrank == 9) reqrp = rank10
      
      
      if(Checkrp >= reqrp) {
        db.add(`rank_${message.author.id}`, 1)
        db.delete(`rankuppoints_${message.author.id}`)
        
        let Rank = db.get(`rank_${message.author.id}`)
        return message.reply(`<a:giveaway:728645863445889074> Congratulation, You just got to **Rank ${Rank}** ! <a:GG:728649034042179624>`)
      }
})
  //------------------------EVENTS---------------------------------------------    
    
    app.post('/dblwebhook', webhook.middleware(), (req, res) => {
  // req.vote is your vote object e.g 221221226561929217
  console.log(`${req.vote.user} Voted the Order It Economy!!`) 
  
  
  db.add(`votesnew_${req.vote.user}`, 1)
  //----------------COOLDOWN----------------
   db.set(`votecdcd_${req.vote.user}`, Date.now())
  //----------------COOLDOWN----------------
      
  //----------------REWARDS----------------
  db.set(`Coupon_${req.vote.user}`, "True")
 
  db.add(`OrderBoxes_${req.vote.user}`, 2)
 // db.add(`HalloweenBoxes_${req.vote.user}`, 5)
      
  //db.add(`HalloweenCandy_${req.vote.user}`, 20)
  
  this.economy.addBal(req.vote.user, 5000);
  //----------------REWARDS----------------
      
  //----------------Coupon Timer----------------
      
   db.set(`CouponTimer_${req.vote.user}`, Date.now())
      
  //----------------Coupon Timer----------------
      
  let votescount = db.get(`votesnew_${req.vote.user}`);
 
  const votingchannel = this.channels.cache.get(`806564328450424845`);
  if(!votingchannel) return;
  
  
  const voterid = req.vote.user
  const voter = this.users.cache.get(voterid)
  if(voter) {
  
const DM = new this.discord.MessageEmbed()
.setDescription("You just received `5,000 Order Coins`, `1 Lucky Coupon [Valid for 5hrs]`, `2 Order Box`")
.setFooter(`Thanks for voting me in top.gg!`)
.setColor(`GREEN`)

voter.send(DM)
}
  
const embed = new this.discord.MessageEmbed()
  .setDescription(`<@!${req.vote.user}>, **Thanks for voting Order It Economy.
  
  Thanks for your great support!!
  
  <@!${req.vote.user}> Total Votes: ${votescount}**
  
[Click here to vote Order It Economy!!](https://top.gg/bot/762324132045914112/vote)
  
 **__VOTING REWARDS__**
 5k Order Coins
 <:LuckyCoupon:866973938897387560> Lucky Coupons [ Get 10% more luck while opening boxes for 5hrs]
 2 <:OrderBox:866972740173955073> Order Box
 `)
  .setFooter(`You can vote every 12hours!`)
  .setTimestamp()
  .setColor(`BLUE`)
  .setThumbnail(this.user.avatarURL({ dynamic: true , format: "png" }))
  
  votingchannel.send(embed)
  
  // res.sendStatus(200)
  

})
    
    
    this.on('guildCreate', (guild) => {

    const joinembed = new this.discord.MessageEmbed()
    .setTitle(`📥 Guild Joined`)
    .setColor(`#0ff020`)
    .addField(`Guild Name:` , `${guild.name}`)
    .addField(`Guild Members:` , `${guild.memberCount}`)
    .addField(`Guild Id:` , `${guild.id}`)
    .addField(`Guild Owner:` , `<@${guild.ownerID}> | Id: ${guild.ownerID}`)
    .setFooter(`New Guild Size: ${this.guilds.cache.size} Servers |`)
    .setTimestamp()
    .setThumbnail(guild.iconURL({ dynamic: true, format: `png` }))


    let botjoinmessagechannel = '780381748776534037'

    const sendchannel = this.channels.cache.get(botjoinmessagechannel)
    if(!sendchannel) return ;

    sendchannel.send(joinembed)

      let defaultChannel = "";
      guild.channels.cache.forEach((channel) => {
        if(channel.type == "text" && defaultChannel == "") {
          if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
            defaultChannel = channel;
          }
        }
      })

      defaultChannel.send(`**Thx for inviting me**
      This bot is maining based on **Order It** and **discord-react** bot.
      You can joined the server below to use your Order coins to get best features in those bots.
      Also get this server link anytime by typing **o.server**
      🔗 https://discord.gg/EZDfrer
      `)
        //.then(k => k.delete({ timeout : 120000}));
      });


  this.on('guildDelete', (guild) => {

        if(!guild.available) return;


        const leaveembed = new this.discord.MessageEmbed()
        .setTitle(`📤 Guild Leaved`)
        .setColor(`#e90b0b`)
        .addField(`Guild Name:` , guild.name)
        .addField(`Guild Members:` , guild.memberCount)
        .setFooter(`New Guild Size: ${this.guilds.cache.size} Servers |`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic: true, format: `png` }));
    
        let botjoinleavemessagechannel = '780381748776534037'
    
        const sendchannel = this.channels.cache.get(botjoinleavemessagechannel)
        if(!sendchannel) return ;
    
        sendchannel.send(leaveembed)
        
      });


    

this.on("message", message => {
  
  if(message.channel.id !== "773072387881041930") return;
  
  if(message.author.id !== "742381114076823622") return;
  
  if(!message.embeds) return;
  
  message.embeds.forEach((embed) => {
     if(embed.fields && embed.footer) {
       
       if(embed.title.includes("React Refunded to")) {
        
       let reactID = embed.fields[0].value
       
      let userID = embed.footer.text
   
      
      let refund = ms(React[reactID].price)
      
      this.economy.addBal(userID, refund);
      
      return message.channel.send(`Successfully refunded **${refund} Order Coins** for the already owned react!`)

       }
       
       
       if(embed.title.includes("Refuned Halloween Candy to")) {
        
       
      let userID = embed.footer.text
   
      
      let refund = 600
      
      db.add(`HalloweenCandy_${userID}`, 600)
      
      return message.channel.send(`Successfully refunded **600 Halloween Candy** for the already owned Halloween react!`)

       }
  
     }
     })
});

    
    this.on("message", message => {
  
  if(message.channel.id !== "903535380735877170") return;
  
  if(message.author.id !== "742381114076823622") return;
  
  if(!message.embeds) return;
  
  message.embeds.forEach((embed) => {
     if(embed.fields) {
       
       if(embed.title.includes("Achievement of Order It Economy claimed by")) {
        
       let userID = embed.fields[0].value
       if(!userID) return message.channel.send(`Error while getting userid! [${userID}]`)
         
       let check = db.get(`a2_${userID}`)
       if(check == "True") return message.channel.send("This user have already claimed the achievement!")
      
        // message.channel.send(`${userID}, ${check}`)
       this.economy.addBal(userID, 20000)
         
         db.set(`a2_${userID}`, "True")
      return message.channel.send(`Successfully given 20k Order Coins to ${userID}!`)
      }
     }
     })
});

    
    
//------------------------EVENTS---------------------------------------------    
  }
  embed(data, message) {
    return new this.discord.MessageEmbed({
      ...data,
      color: `RED`,
    }).setFooter(
      message.author.tag,
      message.author.displayAvatarURL({ dynamic: true, format: `png` })
    );
  }




  
}
module.exports = EconomyClient;
