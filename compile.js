const path = require("path");
const fs = require("fs-extra");

const solc = require("solc");

const exportPath = path.resolve(__dirname , "bin")
fs.removeSync(exportPath)

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
 try{
  const output = JSON.parse(solc.compile(JSON.stringify(input)),1);

  for (let contract in output.contracts["Inbox.sol"]) {
    fs.outputJSONSync(
      path.resolve(exportPath, "InboxABI.json"),
      output.contracts["Inbox.sol"][contract].abi
    );

    fs.outputJSONSync(
      path.resolve(exportPath, "InboxBytecode.json"),
      output.contracts["Inbox.sol"][contract].evm.bytecode.object
    );
  }

}catch(error){
  console.log(error);
}