// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Auction {
    address payable public beneficiary;
    uint256 public auctionEndTime;

    // allows users to add a time difference between the last bid, if the time is near closure time is added
    uint256 private auctionTimeDifference;


    // current state of the auction
    address public highestBidder;
    uint256 public highestbid;
    uint256 public minimumBid;
    bool ended;

    mapping(address => uint256) pendingReturns;

    event highestBidIncreased(address bidder, uint256 amount);
    event auctionEnded(address winner, uint256 amount);

    constructor(
        uint256 _biddingTime,
        address payable _beneficiary,
        uint256 _minimumBid
    ) {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
        minimumBid = _minimumBid;
        auctionTimeDifference = auctionEndTime + 5 minutes;
    }

    function bid() public payable {
        require(block.timestamp < auctionEndTime, "The Auction Time Is Over");
        require(msg.value >= minimumBid, "Minimum Bid Required")
        if (msg.value > highestbid) {
            if (pendingReturns[msg.sender] > 0) {
                uint256 amount = pendingReturns[msg.sender];
                payable(msg.sender).transfer(amount);
            }

            pendingReturns[msg.sender] = msg.value;
            highestBidder = msg.sender;
            highestbid = msg.value;
            emit highestBidIncreased(msg.sender, msg.value);
        } else {
            revert("sorry, the bid is not high enough!");
        }
       // if(auctionEndTime - block.timestamp)
    }

    function withdraw() public payable returns (bool) {
        require(ended, "You Cannot Withdraw Until The Auction Has Ended");
        uint256 amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
        }

        if (!payable(msg.sender).send(amount)) {
            pendingReturns[msg.sender] = amount;
        }
        return true;
    }

    function auctionEnd() public {
        require(
            block.timestamp > auctionEndTime,
            "The Auction Cannot End Before The Specified Time"
        );
        if (ended) revert("the auction is already over!");
        ended = true;
        emit auctionEnded(highestBidder, highestbid);
        beneficiary.transfer(highestbid);
    }
}
