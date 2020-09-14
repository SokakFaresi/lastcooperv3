const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let x = args[0];
  if (!x) return message.reply(`Bir kateogri seç! \`alınacak-rol | verilecek-rol | kanal | log-kanal\``)
  
  if (x === "alınacak-rol"){
    let rol = message.mentions.roles.first();
    if (!rol) return message.reply('Bir rol etiketleyiniz!')
    
    db.set(`kayitA_${message.guild.id}`, rol.id);
    
    message.channel.send('başarı ile ayarlandı!')
  } else if (x === "verilecek-rol"){
    let rol = message.mentions.roles.first();
    if (!rol) return message.reply('Bir rol etiketleyiniz!')
    
    db.set(`kayitV_${message.guild.id}`, rol.id);
    
    message.channel.send('başarı ile ayarlandı!')
  } else if (x === "kanal"){
    let kanal = message.mentions.channels.first();
    if (!kanal) return message.reply('Bir kanal etiketleyiniz!')
    
    db.set(`kayitC_${message.guild.id}`, kanal.id);
    
    message.channel.send('başarı ile ayarlandı!')
  } else if (x === "log-kanal"){
    let kanal = message.mentions.channels.first();
    if (!kanal) return message.reply('Bir kanal etiketleyiniz!')
    
    db.set(`kayitLC_${message.guild.id}`, kanal.id);
    
    message.channel.send('başarı ile ayarlandı!')
  }
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıt-ayarla"],
  permLevel: 3
}
exports.help = {
  name: "kayıt-ayar",
  description: "Kayıt sistemi komutlarını gösterir.",
  usage: "kayıt-ayar"
}
