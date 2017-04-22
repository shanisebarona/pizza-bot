const pizzapi = require('dominos')

module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention', 'ambient'], (bot, message) => {
      bot.reply(message, `Okay! <@${message.user}>. I found some nearby stores!`)
      findStores(bot, message)
    })
  },
  help: {
    command: 'hungry',
    text: `Oh no! Tell me "I want a pizza" so I can order one for you!`
  }
}

function findStores (bot, message) {
  pizzapi.Util.findNearbyStores(
    '11 Times Square, New York, NY, 10036',
    'Delivery',
    function (storeData) {
        const messagestring = storeData.result.Stores.filter(function (Store) {
            return Store.IsOnlineCapable &&
                   Store.IsOnlineNow &&
                   Store.IsOpen
        }).map(function (Store) {
          return `${Store.StoreID}, ${Store.AddressDescription}`
        }).join('\n')
        console.log(messagestring)
        bot.reply(message, messagestring)
    }
)

  
}
