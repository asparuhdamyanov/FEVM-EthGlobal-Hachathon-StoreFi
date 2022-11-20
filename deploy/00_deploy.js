require("hardhat-deploy");
require("hardhat-deploy-ethers");

const ethers = require("ethers");
const fa = require("@glif/filecoin-address");
const util = require("util");
const { JsonRpcProvider } = require("@ethersproject/providers");
const request = util.promisify(require("request"));

const DEPLOYER_PRIVATE_KEY = process.env.PRIVATE_KEY; // network.config.accounts[0];

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return new Uint8Array(bytes);
}

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

const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, new ethers.providers.JsonRpcProvider("https://wallaby.node.glif.io/rpc/v0"));

module.exports = async ({ deployments }) => {
  const { deploy } = deployments;


  const priorityFee = await callRpc("eth_maxPriorityFeePerGas");
  const f4Address = fa.newDelegatedEthAddress(deployer.address).toString();
  const nonce = await callRpc("Filecoin.MpoolGetNonce", [f4Address]);

  console.log("Wallet Ethereum Address:", deployer.address);
  console.log("Wallet f4Address: ", f4Address)


  // await deploy("SimpleCoin", {
  //   from: deployer.address,
  //   args: [],
  //   // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
  //   // a large gasLimit. This should be addressed in the following releases.
  //   // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
  //   // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
  //   maxPriorityFeePerGas: priorityFee,
  //   log: true,
  // });

  await deploy("MinerAPI", {
    from: deployer.address,
    args: [0x0000001],
    // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
    // a large gasLimit. This should be addressed in the following releases.
    // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
    // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
    maxPriorityFeePerGas: priorityFee,
    log: true,
    
  });

  await deploy("MarketAPI", {
    from: deployer.address,
    args: [],
    // since it's difficult to estimate the gas before f4 address is launched, it's safer to manually set
    // a large gasLimit. This should be addressed in the following releases.
    // since Ethereum's legacy transaction format is not supported on FVM, we need to specify
    // maxPriorityFeePerGas to instruct hardhat to use EIP-1559 tx format
    maxPriorityFeePerGas: priorityFee,
    log: true,
  });

  await deploy("Auction", {
    from: deployer.address,
    args: [],
    maxPriorityFeePerGas: priorityFee,
    log: true
  }).then(async (auction) => {
    await deploy("AuctionManager", {
      from: deployer.address,
      args: [],
      maxPriorityFeePerGas: priorityFee,
      log: true
    }).then(async (manager) => {
      const managerContract = new ethers.Contract(manager.address, manager.abi, deployer);
      // managerContract.populateTransaction.setupAuction(auction.address);
      const populatedTrx = await deployer.populateTransaction(await managerContract.populateTransaction.setupAuction(auction.address));
      // const signedTrx = await deployer.signTransaction(populatedTrx);
      // console.log(signedTrx.hash);
      // await (new UncheckedJsonRpcSigner("https://wallaby.node.glif.io/rpc/v0")).sendTransaction(signedTrx);
      // await deployer.sendTransaction(signedTrx);
      // await managerContract.setupAuction(auction.address /*, {gasLimit: 100000}*/);
    });
  });
  };


module.exports.tags = ["MinerAPI", "MarketAPI", "Auction", "AuctionManager"];