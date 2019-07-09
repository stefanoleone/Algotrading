const CCAPIKey = "396d41e4d1e15e2bd9c3d7b8c5a31c4f77e23964388998d10c01eadf044b0314";

const CryptoCompareAPI = require("cryptocompare");
CryptoCompareAPI.setApiKey(CCAPIKey);


module.exports = {


hourlyMovingAverage:function (asset, fiat, hours, callback) {
    if (hours >169) {
      console.error("Only up to 169 hours allowed!")
      return
    }


    CryptoCompareAPI.histoHour(asset, fiat, {limit:hours, exchange:"gemini"})
    .then(data => {
      data = data.reverse();
      
      var sum = 0;
      for (var i = 0;i<hours;i++) {
        sum+=data[i].close;

        //console.log(i + " " + data[i].close + "@" + data[i].time)
      }

      var movingAverage = Math.floor(sum/hours);
      callback(movingAverage)

      //console.log(data)
      //console.log(data.length)
    })
    .catch(console.error)

  }


}
