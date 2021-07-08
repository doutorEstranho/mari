const Discord = require('discord.js')
const mary = new Discord.Client()
const db = require("./db")
mary.login(process.env.token)
const config = require('config.json')
const express = require('express')
const app = express()
app.listen(3000)
app.get("/", (req,res) => {
    res.sendStatus(200)
})
mary.on('message', async(message) => {
    if(message.author.bot) return;
    if (message.channel.type == 'dm') return;
    let guild = message.guild;
    if(!guild) return;
     if (message.webhookID) return;
    /*
  if (message.content.includes(`<@!${mary.user.id}>` ||`<@${mary.user.id}>`)) { 
      message.reply(`Olá!\neu sou a mary uma simples bot pra discord!`)
  }
  */
  if(message.channel.id == "862506073554812949")
  {
      db.ref("/").once("value").then(l => {
let lol = l.val().contador
if(message.content != lol) return message.delete()
db.ref("/").update({
    contador: lol+1
}).then(() => {
    
   
   message.react("862506820194009098")
})
  })
  } else {
      let a = await db.ref(`level/${message.guild.id}/${message.author.id}`).once("value")
      let ab = a.val()
      if(!ab) db.ref(`level/${message.guild.id}/${message.author.id}`).set({level: 1,xp:0})
      let valor = Math.floor(Math.random() * 20)+1
      let xpProProximo = ab.level*100
      if(ab.xp >= xpProProximo) {
          db.ref(`level/${message.guild.id}/${message.author.id}`).set({
              xp: 0,
              level: ab.level+1
          })
          message.reply(`Parabéns!\nvocê subiu pro lvl ${ab.level}!`)
      } else {
           db.ref(`level/${message.guild.id}/${message.author.id}`).update({
               xp: ab.xp+valor
           })
      }
  }
  
 if(!message.content.startsWith(config.p)) return;

const args = message.content
			.trim()
			.slice(config.p.length)
			.split(/ +/g);
		const command = args.shift().toLowerCase()
     if (command.lenght === 0) return;
     try{
         const commandFile = require(`./commands/${command}.js`);
				 commandFile.run(client, message, args);
     }catch(e){
console.error(`erro: ${e}`)
 } 
 })
