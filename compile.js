let path=require('path');
let fs=require('fs');
let solc=require('solc');
let lotteryPath=path.resolve(__dirname,"contract","lottery.sol");
let source=fs.readFileSync(lotteryPath,"utf-8");

// 

var input={
    language: 'Solidity',
    sources:{
        'lottery.sol':{
            content:source
        }
    },
    settings:{
        outputSelection: {
            "*":{
                "*":['*']
            }
        }
    }
};


