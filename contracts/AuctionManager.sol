//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Auction/AuctionFactory.sol";
import "./Auction/AuctionBeacon.sol";

/// @notice Ownable contract used to manage the Auction system - the factory and the beacon contracts
contract AuctionManager is Ownable {
    AuctionBeacon public auctionBeacon;
    AuctionFactory public auctionFactory;

    event ImplementationChanged(
        address indexed previousImplementation,
        address indexed newImplementation
    );

    event AuctionOwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /// @notice Ownable contract used to manage the Auction system - the factory and the beacon contracts
    /// @param implementation_ The address of the Auction implementation that is initially used by the beacon

    function setupAuction(address implementation_) external onlyOwner {
        auctionBeacon = new AuctionBeacon(implementation_);
        auctionFactory = new AuctionFactory(address(auctionBeacon));
    }

    /// @notice Changes the address of the logic/implementation contract used in the Auction system
    /// @param newImplementation The address of the new implementation that is going to be used by the Auction proxies
    /// @notice advice In future add a timer (fe. of 2 weeks) before the actual change happens so users can get informed and ready
    function changeImplementation(address newImplementation) external onlyOwner {
        address previousImplementation = auctionBeacon.implementation();
        auctionBeacon.upgradeTo(newImplementation);
        emit ImplementationChanged(previousImplementation, newImplementation);
    }

    /// @notice Calls the deployAuctionProxy function of the factory
    function deployAuctionProxy(
        uint256 _biddingTime,
        address payable _beneficiary,
        uint256 _minimumBid
    ) external onlyOwner {
        auctionFactory.deployAuctionProxy(_biddingTime, _beneficiary, _minimumBid);
    }

    /// @notice Transfers both the beacon and factory ownership to a single account
    /// @param newOwner The address of the new Auction manager
    /// @dev It is highly recommended that the new manager is a contract (multisig wallet, DAO etc) that implements the same method
    function transferAuctionOwnership(address newOwner) external onlyOwner {
        auctionBeacon.transferOwnership(newOwner);
        auctionFactory.transferOwnership(newOwner);
        emit AuctionOwnershipTransferred(address(this), newOwner);
    }
}
