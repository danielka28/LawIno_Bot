const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5603215368:AAE9jhv15di3gugcdXroSoreVHk8rAFgy4s'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async(chatId) => {
    await bot.sendMessage(chatId, `Lets play a game`)
    await bot.sendSticker(chatId, 'https://d16u9y6cg00afk.cloudfront.net/piilakino/6357847.512.webp')
    await bot.sendMessage(chatId, `Guess the number from 0 to 9`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendSticker(chatId, 'https://d16u9y6cg00afk.cloudfront.net/piilakino/6357851.512.webp', gameOptions)
            
}

const start = () => {
    
    bot.setMyCommands([
        {command: '/start', description: 'Welcome message'},
        {command: '/info', description: 'I know your name)))'},
        {command: '/game', description: 'Lets play a game'}
    ])
    
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === `/start`){
            await bot.sendMessage(chatId, `Welcome to the LawIno Bot!`)
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/735/cf8/735cf8f3-42ef-4d8b-a2dc-388c93457c24/192/4.webp')
            await bot.sendMessage(chatId, `Available commands: /start , /info, /game OR send me a message`)
        }
        if(text === `/info`){
            await bot.sendMessage(chatId, `Your Name is ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if(text != `/info` && text != `/start` && text != `/game`){
            await bot.sendMessage(chatId, `You wrote to me ${text}`)
        }
        if(text === `/game`){
            return startGame(chatId);
        }
       
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === `/again`){
            return startGame(chatId);
        }
        if (parseInt(data) === chats[chatId]){
            await bot.sendMessage(chatId, `Congrats, that is a right number!!!`)
            return await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/2.webp', againOptions)
        } else {
            await bot.sendMessage(chatId, `Wrooong!!! I chose ${chats[chatId]}`)
            return await bot.sendSticker(chatId, 'https://d16u9y6cg00afk.cloudfront.net/piilakino/6357846.512.webp', againOptions)
        }
    })

}

start()