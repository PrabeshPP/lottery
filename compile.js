let path=require("path");
let fs=require("fs");
let solc=require("solc");
let lotteryPath=path.resolve(__dirname,"contract","Lottery.sol");
let source=fs.readFileSync(lotteryPath,"utf-8");


let input={
    language:'Solidity',
    sources:{
        'Lottery.sol':{
            content:source
        }

    },

    settings:{
        outputSelection:{
            '*':{
                "*":['*']
            
            }
        }
    }

};


let output=JSON.parse(solc.compile(JSON.stringify(input)));

//
module.exports=output.contracts["Lottery.sol"].Lottery;

