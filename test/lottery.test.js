let gancahe=require('ganache-cli')
let Web3=require('web3');
let provider=gancahe.provider();
let {strictEqual}=require('assert');
let assert=require('assert');
const { verify } = require('crypto');


let {abi,evm}=require("../compile");
const { it } = require('mocha');

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
    it("Contract Successfully  deployed",()=>{
        assert.ok(lottery.options.address);
    });

    it("The manager address should be equal to the one who deployed the contract",async()=>{
        const manager=await lottery.methods.manager().call();
        assert.strictEqual(manager,accounts[0]);
    });

    it("Should call the enter fun. to store the address of one player",async()=>{
        await lottery.methods.enter().send({from:accounts[0],
        value:web3.utils.toWei('0.2',
        'ether')});

        const player=await lottery.methods.getPlayers().call({
            from:accounts[0]
        });
        assert.strictEqual(player[0],accounts[0]);
        assert.strictEqual(1,player.length);

    });


    //! testing wether the enter function store multiple accounts or not
    
    it("Should the enter function to store the multiple address",async()=>{
     for(let i=0;i<3;++i){
        await lottery.methods.enter().send({
            from:accounts[i],
            value:web3.utils.toWei('0.2','ether')
        });

     }

     let player=await lottery.methods.getPlayers().call({
         from:accounts[0]
     })

     for(let i=0;i<3;++i){
         assert.strictEqual(player[i],accounts[i]);
     }
     assert.strictEqual(3,player.length);    
    })
})