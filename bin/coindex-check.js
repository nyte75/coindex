const program = require('commander');
const check  = require('../commands/check');

program
.command('price')
.description("Check prices of coins")
.option('--coin <type>', 
    'Add specific coin types in CSV format', 
    'BTC, ETH, XRP'
)
.option('--cur <currency>', 
    "Change the currency", 
    'USD'
)
.action(cmd => check.price(cmd));

program.parse(process.argv);