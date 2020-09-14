const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();
  
  if (!rol) return message.reply('Otorol için Bir rol ve kanal etiketlemelisin!')
  if (!kanal) return message.reply('Otorol için Bir rol ve kanal etiketlemelisin!')
  
  db.set(`otoR_${message.guild.id}`, rol.id);
  db.set(`otoK_${message.guild.id}`, kanal.id);
  
  message.channel.send(`Otorol \`${rol.name}\` Kanalı ${kanal} olarak ayarlandı!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol"],
  permLevel: 3
}
exports.help = {
  name: "otorol",
  description: "Otorol ayarlama komutudur.",
  usage: "c!otorol <@üye>"
}
