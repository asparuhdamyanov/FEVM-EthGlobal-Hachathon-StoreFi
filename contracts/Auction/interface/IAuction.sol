// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IAuction {
    function initialize(
        uint256 _biddingTime,
        address payable _beneficiary,
        uint256 _minimumBid
    ) external;

    function bid() external payable;

    function withdraw() external payable returns (bool);

    function auctionEnd() external;

    function AuctionStartedTime() external view returns (uint256);

    function AuctionEndedTime() external view returns (uint256);

    function finished() external view returns (bool);
}
