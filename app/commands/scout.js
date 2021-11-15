const { Message } = require(`discord.js`);
const Client = require("../structures/Client");
const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");

module.exports = {
  name: `scout`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let bancheck = db.get(`banned_${message.author.id}`);
    if (bancheck) {
          
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

    let author = await db.fetch(`scoutcd_${message.author.id}`);

    let timeout = 60000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      const Embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.avatarURL())
        .setDescription(
          `You need to wait **${time}** to search again. 
      *you are addicted to steal other money?*
      `
        )
        .setColor("RED")
        .setTimestamp();

      return message.channel.send(Embed);
    } else {
      //  if(message.author.id !== "598524997954306048") return message.reply("Bot is being transfer to new platform! Please wait sometime until its finished.")

      let Places1 = ["kp oli house", "everest studio", "forest", "pond"];

      const Place1 = Places1[Math.floor(Math.random() * Places1.length)];

      let Places2 = ["sky", "area51", "ufo", "toilet"];

      const Place2 = Places2[Math.floor(Math.random() * Places2.length)];

      let Places3 = ["hospital", "kristab house", "discord", "police station"];

      const Place3 = Places3[Math.floor(Math.random() * Places3.length)];

      let filter = m => m.author.id === message.author.id;
      
      //---------------------------Secret------------------
    
    let Number = Math.floor(Math.random() * 5);
    
    if(Number == "0") message.channel.send("Tips/Clues: The way I was following someone leads me to mysterious number 7").then(k => k.delete({ timeout : 20000 }))
    
    //---------------------------Secret------------------
      
      message.reply(
        `Where you want to search? \n\n` +
          "`" +
          Place1 +
          "`, " +
          "`" +
          Place2 +
          "`, " +
          "`" +
          Place3 +
          "`"
      );
      message.channel
        .awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(message => {
          message = message.first();

          if (message.content == Place1) {
            const Coins = Math.floor(Math.random() * 300) + 200;
            
            let Jobs = ["alive", "alive", "alive", "died", "died"];

            const Job = Jobs[Math.floor(Math.random() * Jobs.length)];

            let dialog;

            //------------------------KP OLI

            let olidead =
              "You were catched in K.P Oli House while you were stealing his coat and paid  `200 Order coins` to let you go alive.";
            let olialive = `You got K.P Oli coat in K.P Oli House and sold it for **${Coins} Order coins**. *You are op*`;

            if (Place1 == "kp oli house" && Job == "died") dialog = olidead;
            if (Place1 == "kp oli house" && Job == "alive") dialog = olialive;

            //---------------------everest studio

            let esdead =
              "You were catched by Kristab in Everest Studio while you were hacking Order It Economy bot and paid  `200 Order coins` to Kristab so he let you go.";
            let esalive = `You got **${Coins} Order coins** in Everest Studio by hacking Order It Economy bot. *Didn't you got caught by any Mods?*`;

            if (Place1 == "everest studio" && Job == "died") dialog = esdead;
            if (Place1 == "everest studio" && Job == "alive") dialog = esalive;

            //---------------------Forest

            let forestdead =
              "You were searching in forest and suddenly monkey appear and stole your `200 Order coins`. *Whose monkey was that?*";
            let forestalive = `You found **${Coins} Order coins** in the forest in Elephant poop. *Lol you still pick it up? sucks to be you*`;

            if (Place1 == "forest" && Job == "died") dialog = forestdead;
            if (Place1 == "forest" && Job == "alive") dialog = forestalive;

            //---------------------Pond

            let ponddead =
              "You were searching in pond but suddenly pirates appears and stole your `200 Order coins`. *wtf pirates in pond?*";
            let pondalive = `You were searching in pond and you found **${Coins} Order coins** which was floating in water. *must be rich person who throw it there*`;

            if (Place1 == "pond" && Job == "died") dialog = ponddead;
            if (Place1 == "pond" && Job == "alive") dialog = pondalive;

            const lostcoins = `200`;
            if (Job == "alive")
              client.economy.addBal(message.author.id, parseInt(`${Coins}`));
            if (Job == "died")
              client.economy.addBal(
                message.author.id,
                parseInt(`${-lostcoins}`)
              );
            if (Place1 == "everest studio" && Job == "died")
              client.economy.addBal(
                "598524997954306048",
                parseInt(`${lostcoins}`)
              );
            
            db.add(`TotalScout_${message.author.id}`, 1)

            db.add(`rankuppoints_${message.author.id}`, 1);
            db.add(`totalrankpoints_${message.author.id}`, 1);
            //----------------COOLDOWN----------------
            db.set(`scoutcd_${message.author.id}`, Date.now());

            let Colour;
            if (Job == "alive") Colour = "GREEN";
            if (Job == "died") Colour = "RED";
            

            const Embed = new Discord.MessageEmbed()
              .setAuthor(
                `${message.author.username}`,
                message.author.avatarURL({ dynamic: true, format: `png` })
              )
              .setDescription(`${dialog}`)
              .setColor(Colour)
              // .setFooter(`Rank ${Rank} [ +${coins} ]`);
            
            let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)

            return message.channel.send(Embed);
          }

          //-------------------------- PLACE 2----------------------------------------------------

          if (message.content == Place2) {
            const Coins = Math.floor(Math.random() * 300) + 200;

            let Jobs = ["alive", "alive", "alive", "died", "died"];

            const Job = Jobs[Math.floor(Math.random() * Jobs.length)];

            let dialog;

            //------------------------sky

            let skydead =
              "You were searching in sky and you saw some Order coins flying in the sky and you jump to catch it but You didn't notice that you were at edge of the building and you fell down and your hand and leg got broken and you paid  `200 Order coins` in hospital for fixing it. *Sucks to be you nerd*";
            let skyalive = `You were searching the sky and **${Coins} Order coins** fall in your head. *Must be given by the god?*`;

            if (Place2 == "sky" && Job == "died") dialog = skydead;
            if (Place2 == "sky" && Job == "alive") dialog = skyalive;

            //---------------------area51

            let area51dead =
              "You were shoot down by army and paid `200 Order coins` for rebirth. *wtf rebirth? is it roblox simulator game?*";
            let area51alive = `You got **${Coins} Order coins** while searching in area51's high security building. *Now run they saw you nerd*`;

            if (Place2 == "area51" && Job == "died") dialog = area51dead;
            if (Place2 == "area51" && Job == "alive") dialog = area51alive;

            //---------------------UFO

            let ufodead =
              "You saw jadu's ufo in forest and you gone to search it but jadu was clever so he stole your `200 Order coins` and fly in sky with ufo. *Need to call jadu again...*";
            let ufoalive = `You found **${Coins} Order coins** in the jadu's ufo. *I wonder do aliens also collect order coins?*`;

            if (Place2 == "ufo" && Job == "died") dialog = ufodead;
            if (Place2 == "ufo" && Job == "alive") dialog = ufoalive;

            //---------------------Toilet

            let toiletdead =
              "You were searching in public toilet and you feel like you need to poop so when you sit to poop your `200 Order coins` fell in toilet. *Thanks god you didn't pick it up :/*";
            let toiletalive = `You were searching in public toilet but you found **${Coins} Order coins** which was inside of toilet with sticking poop in it. *bruh did you pick it up? that order coins must be smelling poop rn*`;

            if (Place2 == "toilet" && Job == "died") dialog = toiletdead;
            if (Place2 == "toilet" && Job == "alive") dialog = toiletalive;

            const lostcoins = `200`;
            if (Job == "alive")
              client.economy.addBal(message.author.id, parseInt(`${Coins}`));
            if (Job == "died")
              client.economy.addBal(
                message.author.id,
                parseInt(`${-lostcoins}`)
              );
            
            db.add(`TotalScout_${message.author.id}`, 1)

            db.add(`rankuppoints_${message.author.id}`, 1);
            db.add(`totalrankpoints_${message.author.id}`, 1);
            //----------------COOLDOWN----------------
            db.set(`scoutcd_${message.author.id}`, Date.now());

            let Colour;
            if (Job == "alive") Colour = "GREEN";
            if (Job == "died") Colour = "RED";

           
            const Embed = new Discord.MessageEmbed()
              .setAuthor(
                `${message.author.username}`,
                message.author.avatarURL({ dynamic: true, format: `png` })
              )
              .setDescription(`${dialog}`)
              .setColor(Colour)
        
            let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)

            return message.channel.send(Embed);
          }

          //-------------------------- PLACE 3----------------------------------------------------

          if (message.content == Place3) {
            const Coins = Math.floor(Math.random() * 300) + 200;

            let Jobs = [
              "alive",
              "alive",
              "alive",
              "died",
              "died",
              "died",
              "died"
            ];

            const Job = Jobs[Math.floor(Math.random() * Jobs.length)];

            let dialog;

            //------------------------HOSPITAL

            let hospitaldead =
              "You were searching hospital and you tried to steel one patient Order coins who was sleeping in bed but he wakeup while you were stealing and he caught you and took your `200 Order coins`. *Never understimate the power you nub!*";
            let hospitalalive = `You were searching the hospital and you stole **${Coins} Order coins** from the paralyzed person. *bruh stole that that poor person Order coins. sucks to be you*`;

            if (Place3 == "hospital" && Job == "died") dialog = hospitaldead;
            if (Place3 == "hospital" && Job == "alive") dialog = hospitalalive;

            //---------------------Kristab house

            let kristabdead =
              "You got caught by Kristab and paid `200 Order coins` to not rekt you . *idk why Kristab even let you go alive*";
            let kristabalive = `You got **${Coins} Order coins** while searching in Kristab house. *i think Kristab was not in house this time*`;

            if (Place3 == "kristab house" && Job == "died")
              dialog = kristabdead;
            if (Place3 == "kristab house" && Job == "alive")
              dialog = kristabalive;

            //---------------------Discord

            let discorddead =
              "You were searching discord for free Order coins using some script and discord mod found that and you had to give `200 Order coins` for not banning you from discord. *did discord mod took corruption?*";
            let discordalive = `You found **${Coins} Order coins** in discord using some type of hack script. *I wonder how there was order coins?*`;

            if (Place3 == "discord" && Job == "died") dialog = discorddead;
            if (Place3 == "discord" && Job == "alive") dialog = discordalive;

            //---------------------Police station

            let policedead =
              "You got caught while stealing Order coins from police and you had to pay `200 Order coins` so they will let you go. *Thanks god you had that order coins if not you would in the prison :/*";
            let policealive = `You were searching in police station and you found **${Coins} Order coins** in the desk of police officer. *wasnt he there? bruh he is coming back now run!*`;

            if (Place3 == "police station" && Job == "died")
              dialog = policedead;
            if (Place3 == "police station" && Job == "alive")
              dialog = policealive;

            const lostcoins = `200`;
            if (Job == "alive")
              client.economy.addBal(message.author.id, parseInt(`${Coins}`));
            if (Job == "died")
              client.economy.addBal(
                message.author.id,
                parseInt(`${-lostcoins}`)
              );
            if (Place3 == "kristab house" && Job == "died")
              client.economy.addBal(
                "598524997954306048",
                parseInt(`${lostcoins}`)
              );
            
            db.add(`TotalScout_${message.author.id}`, 1)

            db.add(`rankuppoints_${message.author.id}`, 1);
            db.add(`totalrankpoints_${message.author.id}`, 1);
            //----------------COOLDOWN----------------
            db.set(`scoutcd_${message.author.id}`, Date.now());

            let Colour;
            if (Job == "alive") Colour = "GREEN";
            if (Job == "died") Colour = "RED";

            

            const Embed = new Discord.MessageEmbed()
              .setAuthor(
                `${message.author.username}`,
                message.author.avatarURL({ dynamic: true, format: `png` })
              )
              .setDescription(`${dialog}`)
              .setColor(Colour)
            
            let Channel = client.channels.cache.get("856026833735516180")
    Channel.send(Embed)


            return message.channel.send(Embed);
          } else {
            //----------------COOLDOWN----------------
            db.set(`scoutcd_${message.author.id}`, Date.now());

            return message.reply("Huh? You cannot search there!");
          }
        })
        .catch(collected => {
          //----------------COOLDOWN----------------
          db.set(`scoutcd_${message.author.id}`, Date.now());

          message.reply("Stop sleeping kid!");
        });
    }
  }
};
