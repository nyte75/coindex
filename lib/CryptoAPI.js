const axios = require('axios');
const colors = require('colors');

class CryptoAPI {
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.nomics.com/v1/currencies/ticker';
    }

    async getPriceData(coinOpt, curOpt, rnkOpt){
        try {
            //Formater for currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: curOpt
            });
          const res = await axios.get(`${this.baseUrl}?key=${this.apiKey}&ids=${coinOpt}&convert=${curOpt}&attribut`);

          let output = '';
          res.data.forEach(coin => {
              output += `Coin: ${coin.symbol.yellow} (${coin.name}) | Rank: ${coin.rank.magenta} | Price: ${formatter.format(coin.price).green}\n`;
          });
          return output;
        } catch (error) {
            handleAPIError(error);
        }
    }
}
function handleAPIError(err){
    //to Check if the user is connected to the intenet
        //If the User is connected, checking for response errors
   if(err.response){
    if(err.response.status === 401){
        throw new Error('Your API is invalid.\nCheck your API key again or go to https://nomics.com to get a free API key')
    }else if (err.response.status === 404){
        throw new Error('Your API is not responding. Check Network connectivity');
    }
   }
   //if the user is not connected ...
   else{
        throw new Error('Something is not right. Please Check if your intenet connection');
    }
}

module.exports = CryptoAPI;