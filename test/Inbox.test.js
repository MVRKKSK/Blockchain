const ganache = require("ganache-cli")
const Web3 = require("web3")
const assert = require("assert")
const {interface , bytecode} = require("../compile")

const web3 = new Web3(ganache.provider())

let accounts;
let inbox;
console.log(interface)
console.log(bytecode)

beforeEach(async() => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface)).
    deploy({data: bytecode , arguments: ["hi, there!"]}).
    send({from: accounts[0]})
})

describe("Inbox" , () => {
    it('deploys a contract' , () => {console.log(inbox)})
})