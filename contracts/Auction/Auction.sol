// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error TransactionFailed();

contract Auction {
    address payable public beneficiary;
    uint256 public auctionEndTime;
    uint256 public auctionStartTime;
    // allows users to add a time difference between the last bid, if the time is near closure time is added
    //uint256 private auctionTimeDifference;

    // current state of the auction
    address public highestBidder;
    uint256 public highestbid;
    uint256 public minimumBid;
    bool ended;

    mapping(address => uint256) pendingReturns;

    event highestBidIncreased(address bidder, uint256 amount);
    event auctionEnded(address winner, uint256 amount);
    event Withdraw(address indexed withdrawer);

    // event Bid(address indexed bidder);

    constructor(
        uint256 _biddingTime,
        address payable _beneficiary,
        uint256 _minimumBid
    ) {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
        minimumBid = _minimumBid;
        auctionStartTime = block.timestamp;
        //auctionTimeDifference = auctionEndTime + 5 minutes;
    }

    function bid() public payable {
        require(block.timestamp < auctionEndTime, "The Auction Time Is Over");
        require(!ended, "Auction Ended");
        require(msg.value >= minimumBid, "Minimum Bid Required");
        if (msg.value > highestbid) {
            pendingReturns[msg.sender] = msg.value;
            highestBidder = msg.sender;
            highestbid = msg.value;
            emit highestBidIncreased(msg.sender, msg.value);
        } else {
            revert("sorry, the bid is not high enough!");
        }
        // if(auctionEndTime - block.timestamp)
    }

    function withdrawBeforeEnd() public payable returns (bool) {
        require(!ended, "You Cannot Withdraw When The Auction Has Ended");
        uint256 _amount = pendingReturns[msg.sender];
        require(_amount > 0, "Can't Return, you havent bid");
        require(_amount * 5 <= highestbid, "Can't return, highest bid is not high enough");

        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender);
        return true;
    }

    function withdraw() public payable returns (bool) {
        require(ended, "You Cannot Withdraw Until The Auction Has Ended");
        require(pendingReturns[msg.sender] != 0, "You have not bid");

        uint256 _amount = pendingReturns[msg.sender];

        pendingReturns[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: _amount}("");
        if (!success) revert TransactionFailed();
        emit Withdraw(msg.sender);

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
        // @dev needs to invoke make a deal function
        beneficiary.transfer(highestbid);
    }

    function AuctionStartedTime() external view returns (uint256) {
        return auctionStartTime;
    }

    function AuctionEndedTime() external view returns (uint256) {
        return auctionEndTime;
    }

    /* @notice Tracks whether the sale has finished
     * @return bool A boolean showing whether the sale has finished
     */
    function finished() public view returns (bool) {
        return block.number > auctionEndTime;
    }
}
