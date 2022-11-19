// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

/// @notice Beacon proxy using the Auction contract as its implementation
contract AuctionProxy is BeaconProxy {
    /// @notice Simply passes the beacon address without any additional data to superior constructor
    constructor(address _beacon) payable BeaconProxy(_beacon, "") {}

    /// @return address The beacon managing the implementation of this proxy
    function beacon() public view returns (address) {
        return _beacon();
    }

    /// @return address The address of current implementation
    function implementation() public view returns (address) {
        return _implementation();
    }
}
