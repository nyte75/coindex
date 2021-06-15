const KeyManager = require('../lib/KeyManager');
const CryptoAPI = require('../lib/CryptoAPI');

const check = {
    async price(cmd) {
        try {
            keyManager = new KeyManager();
            const key = keyManager.getKey();

            const api = new CryptoAPI(key);
            const priceOutputData = await api.getPriceData(cmd.coin, cmd.cur, cmd.rank);
            console.log(priceOutputData);
        } catch (error) {
            console.error(error.message.red);
        }
        //console.log(cmd.coin, cmd.cur);
    }
};
module.exports = check;