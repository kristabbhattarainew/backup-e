const { Message } = require(`discord.js`);
const Discord = require("discord.js");
const Client = require("../structures/Client");
const db = require("quick.db");
const Item = require("../shop-items.json");

module.exports = {
  name: `lb`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (args[0] && args[0].toLowerCase() == "rank") {
      let points = db
        .all()
        .filter(data => data.ID.startsWith(`rank_`))
        .sort((a, b) => b.data - a.data);
      points.length = 10;
      var finalLb = "";
      for (var i in points) {
        finalLb += `**${points.indexOf(points[i]) + 1}. ${
          client.users.cache.get(points[i].ID.split("_")[1])
            ? client.users.cache.get(points[i].ID.split("_")[1]).tag
            : `Unknown User`
        }** - ${points[i].data} Rank\n`;
      }

      const embed = new Discord.MessageEmbed()
        .setTitle(`Top 10 Rank Player`)
        .setDescription(finalLb + "\nType `o.help` to get start.")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("© 2021 Order It Economy");
      message.channel.send(embed);

      let Channel = client.channels.cache.get("856026833735516180");
      return Channel.send(embed);
    }

    if (args[0]) {
      let Code = args[0];

      //if(Item[Code]) message.reply("True!")
      // if(!item[Code]) message.reply("False!")
      let T = "`";

      if (Item[Code]) {
        let item = Item[Code];


        if (Code == "luckycoupon") return message.reply(`This item leaderboard is not available!`)

        let points = db
          .all()
          .filter(data => data.ID.startsWith(`${item.dbid}_`))
          .sort((a, b) => b.data - a.data);
        points.length = 10;
        var finalLb = "";
        for (var i in points) {
          finalLb += `**${points.indexOf(points[i]) + 1}. ${
            client.users.cache.get(points[i].ID.split("_")[1])
              ? client.users.cache.get(points[i].ID.split("_")[1]).tag
              : `Unknown User`
          }** - ${points[i].data} ${item.name}\n`;
        }

        const embed = new Discord.MessageEmbed()
          .setTitle(`Top 10 Player With ${item.name}`)
          .setDescription(finalLb + "\nType `o.help` to get start.")
          .setColor("GREEN")
          .setTimestamp()
          .setFooter("© 2021 Order It Economy");
        message.channel.send(embed);

        let Channel = client.channels.cache.get("856026833735516180");
        return Channel.send(embed);
      }
      else {
        return message.reply(`Given item doesnot exist!`)
      }
    }

    const data = await client.economy.getTopBal(); //array
    const showLeaders = 20;

    await data.sort(function(a, b) {
      return b.Coins - a.Coins;
    });

    const leaderBoardWithId = data.slice(0, showLeaders);
    let leaderboard = "";
    let index = 1;

    leaderBoardWithId.forEach(leader => {
      let name = leader.User;
      const coins = client.addCommas(leader.Coins);
      name.toString();

      leaderboard +=
        "`" +
        index++ +
        ".`" +
        `**${
          client.users.cache.get(name)
            ? client.users.cache.get(name).tag
            : "Unknown User"
        }** : ${coins} \n`;
    });

    if (leaderboard !== undefined) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Top 20 Order Coins Richest Users`)
        .setDescription(leaderboard + "\nType `o.help` to get start.")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("© 2021 Order It Economy");
      message.channel.send(embed);

      let Channel = client.channels.cache.get("856026833735516180");
      return Channel.send(embed);
    }
  }
};
