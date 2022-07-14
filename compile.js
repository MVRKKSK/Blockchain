const path = require("path");
const fs = require("fs-extra");

const solc = require("solc");

// const exportPath = path.resolve(__dirname , "bin")
// fs.removeSync(exportPath)

const inboxPath = path.resolve(__dirname , "contracts" , "Inbox.sol");
const source = fs.readFileSync(inboxPath , 'utf-8');

const input = {
   language: 'Solidity',
   sources: {
     'Inbox.sol': {
       content: source,
     },
   },
   settings: {
     outputSelection: {
       '*': {
         '*': ['*']
       }
     }
   }
 };
 
 //compile contract


 const output = JSON.parse(solc.compile(JSON.stringify(input)));

 const interface = output.contracts["Inbox.sol"].Inbox.abi
 const bytecode = output.contracts['Inbox.sol'].Inbox.evm.bytecode.object;
 
 module.exports = {
     interface,
     bytecode,
 };