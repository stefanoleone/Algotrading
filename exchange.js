const GeminiAPI = require("gemini-api").default;

const secret = "33CrMs2PTC1XXBNHoq1ebPTrXUzE";
const key ="account-qiuIF0YYGbRniqw8Rqfh";

const restClient = new GeminiAPI({key, secret, sandbox:true});

module.exports = {
  marketBuyBitcoin:function() {
    return restClient.newOrder({amount:1,
                                price:20000,
                                side:"buy",
                                symbol:"btcusd",
                                options:["immediate-or-cancel"]})
  },

  marketSellBitcoin:function() {
    return restClient.newOrder({amount:1,
                                price:1,
                                side:"sell",
                                symbol:"btcusd",
                                options:["immediate-or-cancel"]})
  },

  marketBuyBAT:function() {
    return restClient.newOrder({amount:10000,
                                price:20000,
                                side:"buy",
                                symbol:"batusd",
                                options:["immediate-or-cancel"]})
  },

  marketSellBAT:function() {
    return restClient.newOrder({amount:10000,
                                price:1,
                                side:"sell",
                                symbol:"batusd",
                                options:["immediate-or-cancel"]})
  },


  bitcoinPrice:function() {
    return restClient.getTicker("btcusd");
  },

  BATPrice:function() {
    return restClient.getTicker("batusd");
  }

}
