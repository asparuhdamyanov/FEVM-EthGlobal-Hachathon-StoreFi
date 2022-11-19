// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IAuction.sol";
import "./AuctionProxy.sol";

error OnlyOneAuctionAtTime();

contract AuctionFactory is Ownable {
    /**
     * @dev addresses of beacon
     */
    address public immutable BEACON_ADDRESS;
    address[] _deployedAuctionProxies;

    event NewAuctionDeployed(address indexed newAuction);

    /// @notice Constructs the contract setting the needed dependecies' addresses
    constructor(address _beaconAddress) {
        BEACON_ADDRESS = _beaconAddress;
    }

    /**
     *  @param  _biddingTime  the time the Auction closes
        @param  _beneficiary  the address of the Auctioner
        @param _minimumBid    the minimum starting bid required
     */

    function deployAuctionProxy(
        uint256 _biddingTime,
        address payable _beneficiary,
        uint256 _minimumBid
    ) external onlyOwner {
        address _latestAuctionProxy = latestAuctionProxy();
        if (_latestAuctionProxy != address(0x0) && !IAuction(_latestAuctionProxy).finished())
            revert OnlyOneAuctionAtTime();

        address newAuctionProxy;
        newAuctionProxy = address(new AuctionProxy(BEACON_ADDRESS));

        IAuction(newAuctionProxy).initialize(_biddingTime, _beneficiary, _minimumBid);
        _deployedAuctionProxies.push(newAuctionProxy);

        emit NewAuctionDeployed(newAuctionProxy);
    }

    /// @notice Returns an array of the addresses of all the deployed proxies ever
    /// @return _deployedAuctionProxies All the deployed proxies ever
    function deployedAuctionProxies() public view returns (address[] memory) {
        return _deployedAuctionProxies;
    }

    /// @notice Returns the latest Auction proxy deployed
    /// @return _latestAuctionProxy The latest Auction proxy deployed
    function latestAuctionProxy() public view returns (address _latestAuctionProxy) {
        address[] memory deployedAuctionProxies_ = _deployedAuctionProxies;
        deployedAuctionProxies_.length == 0
            ? _latestAuctionProxy = address(0x0)
            : _latestAuctionProxy = deployedAuctionProxies_[deployedAuctionProxies_.length - 1];
    }
}
