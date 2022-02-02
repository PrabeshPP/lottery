let gancahe=require('ganache-cli')
let Web3=require('web3');
let provider=gancahe.provider();
let {equals}=require('assert');
let assert=require('assert');


let {abi,evm}=require("../compile");
const { verify } = require('crypto');
let byteCode=evm.bytecode.object;

let accounts;
let lottery;

let web3=new Web3(provider);

beforeEach(async()=>{
    accounts=await web3.eth.getAccounts();
    lottery=await new web3.eth.Contract(abi)
    .deploy({data:byteCode})
    .send({from:accounts[0],gas:'1000000'});
})

describe("Lottery Contract",()=>{
    it("should call the constructor to initialised the manager variable",()=>{
        assert.equal("hi","hi");
    });
})