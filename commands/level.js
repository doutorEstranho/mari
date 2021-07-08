const Discord = require('discord.js')
const db = require('../db')
exports.run = async(client, message, args) => {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author; 
    let deb = await db.ref(`level/${message.guild.id}/${user.id}`).once("value")
    deb=deb.val()
    if(!deb) return message.reply(`o(a) ${user} não tem conta na db!`)
}