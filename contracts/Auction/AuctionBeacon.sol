// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @notice Beacon contract used to manage the implementation of the AuctionProxy
contract AuctionBeacon is UpgradeableBeacon {
    /// @notice Simply passes the implementation to superior constructor
    constructor(address implementation_) UpgradeableBeacon(implementation_) {}
}
