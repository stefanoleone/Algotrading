global.fetch = require("node-fetch");
const exchange =  require("./exchange.js");
const indicators =  require("./indicators.js");

const ma_long_hours = 5*24;
const ma_short_hours = 2*24;

const timeout = 10000;
var hasPosition = false;

var last_ma_short;
var last_ma_long;

var strategy = function() {

//  When MA(S) goes up and crosses MA(L) it means “buy”.
//  When MA(S) starts going down and crosses MA(L) it means “sell”.

  console.log("  ");
  console.log("======================");
  console.log("Executing the strategy");

  indicators.hourlyMovingAverage("BTC", "USD", ma_short_hours, function(ma_short) {

        indicators.hourlyMovingAverage("BTC", "USD", ma_long_hours, function(ma_long) {

                      exchange.bitcoinPrice()
                      .then(result => {

                                    var price = result.last;

                                    console.log("MA short(" + ma_short_hours + "): ", ma_short + "  (last: " + last_ma_short + ")");
                                    console.log("MA long(" + ma_long_hours + "): ", ma_long + "  (last: " + last_ma_long + ")");

                                    console.log("last BTC price: ", result.last)

                                    if (ma_short == ma_long)  {
                                      console.log("incrocio: MAS(" + ma_short +") MAL(" + ma_long + ")")
                                      if (last_ma_short < ma_short && !hasPosition) {
                                        console.log("last MAS: " + last_ma_short + "==> BUY!")
                                        hasPosition = true;
                                      } else if (last_ma_short > ma_short && hasPosition){
                                        console.log("last MAS: " + last_ma_short + "==> SELL!")
                                        hasPosition = false;
                                      }

                                    } else {
                                      console.log("HOLD!");

                                    }
                                    last_ma_short = ma_short;
                                    last_ma_long = ma_long;
                                    setTimeout(strategy, timeout);

                      })

        });
  });


}

strategy();
