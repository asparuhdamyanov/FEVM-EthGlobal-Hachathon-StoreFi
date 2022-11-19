// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract IAuction {
       function initialize(
        uint256 _biddingTime,
        address payable _beneficiary,
        uint256 _minimumBid
    ) external;

    function bid() external payable {}

    function withdraw() public payable returns (bool) {}

    function auctionEnd() public {}

    function started() external view returns(uint256) {}

    function ended() external view returns(uint256) {
}