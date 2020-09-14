const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment');
const ayarlar = require('./ayarlar.json')
const express = require("express");
const http = require("http");
const app = express();
require('./util/eventLoader')(client);

const prefix = ayarlar.prefix;
 

client.on('ready', async () => {
  console.log("Bot giriş yaptı!", client.user.username)
})
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
client.on('guildMemberAdd', async member => {
  let rol = await db.fetch(`otoR_${member.guild.id}`)
  let kanal = await db.fetch(`otoK_${member.guild.id}`)
  
  if (!rol) return
  if (!kanal) return
  
  member.addRole(member.guild.roles.get(rol))
  client.channels.get(kanal).send(`${member} kullanıcısına **${member.guild.roles.get(rol).name}** rolü verildi!`)
})
client.on('guildMemberAdd', async member => {
  let sayi = await db.fetch(`sayac_${member.guild.id}`)
  let kanal = await db.fetch(`sayacK_${member.guild.id}`)
  
  if (!sayi) return
  if (!kanal) return
  
  client.channels.get(kanal).send(`:inbox_tray: ${member} Sunucuya katıldı! **${sayi}** kişi olmamıza **${sayi - member.guild.members.size}** üye kaldı!`)
})
client.on('guildMemberRemove', async member => {
  let sayi = await db.fetch(`sayac_${member.guild.id}`)
  let kanal = await db.fetch(`sayacK_${member.guild.id}`)
  
  if (!sayi) return
  if (!kanal) return
  
  client.channels.get(kanal).send(`:outbox_tray: ${member} Sunucudan ayrıldı! **${sayi}** kişi olmamıza **${sayi - member.guild.members.size}** üye kaldı!`)
})
client.on('guildMemberAdd', async member => {
  let tag = await db.fetch(`tag_${member.guild.id}`)
  
  if (!tag) return
  
  member.setNickname(tag.replace('{uye}', member.user.username))
})
client.on('message', async message => {
  let ke = await db.fetch(`kufur_${message.guild.id}`)
  
  if (ke === "kapali" || ke === undefined || ke === null){
    return;
  } else if (ke === "acik") {
    let küfür = ["amk", "amcık", "yarrak", "sik", "amına koyduğum", "kaltak", "yavşak", "orospu", "piç", "ananı sikim", "sikik", "göt", "pezevenk", "gavat", "meme"]
    if (küfür.some(word => message.content.includes(word))){
        if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        message.channel.send("Kurucuya gönderdim!!! Bir daha küfür etme!")
        message.guild.owner.send("Sunucunuzda bir kişi küfür etti. \nKullanıcı: "+ message.author.tag +" \nMesaj: **"+ message +"** ")
      }
    }
    
  }
})
client.on('message', async message => {
  let ke = await db.fetch(`reklam_${message.guild.id}`)
  
  if (ke === "kapali" || ke === undefined || ke === null){
    return;
  } else if (ke === "acik") {
    let reklam = ["discord.gg/", "https://", ".org", ".com", ".cf", ".tk", ".xyz"]
    if (reklam.some(word => message.content.includes(word))){
        if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        message.channel.send("Kurucuya gönderdim!!! Bir daha reklam yapma!")
        message.guild.owner.send("Sunucunuzda bir kişi reklam yaptı. \nKullanıcı: "+ message.author.tag +" \nMesaj: **"+ message +"** ")
      }
    }
    
  }
})


client.login(ayarlar.token)