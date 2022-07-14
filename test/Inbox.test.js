const ganache = require("ganache")
const Web3 = require("web3")
const assert = require("assert")

const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface,bytecode} = require("../compile")



let accounts;
let inbox;



beforeEach(async() => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(interface).
    deploy({data: bytecode , arguments: ["hi, there!"]}).
    send({from: accounts[0] , gas:1500000})

    inbox.setProvider(provider);
})

describe("Inbox" , () => {
    it('deploys a contract' , () => {
        assert.ok(inbox.options.address)
    })

    it('has a passing message' , async() => {
        const message = await inbox.methods.message().call()
        assert.equal(message , 'hi, there!')
    })

    it('set new message' , async() => {
        await inbox.methods.setMessage('fuck off!').send({from: accounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message , 'fuck off!')
        
    })
})