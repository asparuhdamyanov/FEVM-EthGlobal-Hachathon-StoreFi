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
  .setAction(async (taskArgs) => {
    const contractAddr = "0x0A84E9c547463B833d6c7B14592Ae300Da5a6539";
    const networkId = network.name
    const managerContract = await ethers.getContractFactory("AuctionManager")

    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas");

    const simpleCoinContract = new ethers.Contract(contractAddr, managerContract.interface, signer)
    let result = await simpleCoinContract.setupAuction("0x3C0C5B2Ae949523B6c9CE9c42835222B8B1f12A7", {maxPriorityFeePerGas: priorityFee});
    console.log("Data is: ", result);
  })

module.exports = {}