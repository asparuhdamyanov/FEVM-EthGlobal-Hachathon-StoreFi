const util = require("util");
const request = util.promisify(require("request"));

async function callRpc(method, params) {
  var options = {
    method: "POST",
    url: "https://wallaby.node.glif.io/rpc/v0",
    // url: "http://localhost:1234/rpc/v0",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: 1,
    }),
  };
  const res = await request(options);
  return JSON.parse(res.body).result;
}


task("setup-auction", "Calls the simple coin Contract to read the amount of SimpleCoins owned by the account.")
  .addParam("manager", "The address the AuctionManager contract")
  .addParam("auction", "The address the Auction contract")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.manager;
    const networkId = network.name
    const managerContract = await ethers.getContractFactory("AuctionManager")

    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas");

    const simpleCoinContract = new ethers.Contract(contractAddr, managerContract.interface, signer)
    let result = await simpleCoinContract.setupAuction(taskArgs.auction, {maxPriorityFeePerGas: priorityFee});
    console.log("Data is: ", result);
  })

module.exports = {}