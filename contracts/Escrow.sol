// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Escrow {
    address payable public buyer;
    address payable public seller;
    
    uint256 public contractBal;

    receive() external payable {}

    // Set buyer and seller addresses only if they differ from the current values
    function SetAddress(address payable _buyer, address payable _seller) external {
        if (_buyer != buyer) {
            buyer = _buyer;
        }
        if (_seller != seller) {
            seller = _seller;
        }
    }

    // Deposit funds, only the buyer can deposit
    function depositFunds() external payable {
        require(msg.sender == buyer, "Only buyer can send the amount");
        require(msg.value > 0, "Amount should be greater than zero");
        contractBal += msg.value;
    }

  event FundsReleased(address indexed seller, uint256 amount);

function releaseFunds() external {
    require(msg.sender == buyer, "Only buyer can release the funds");
    require(contractBal > 0, "No funds to release");

    uint256 amount = contractBal;
    contractBal = 0; // Reset the balance before transferring (reentrancy protection)

    seller.transfer(amount);
    emit FundsReleased(seller, amount); // Emit the event
}

    // Return contract balance
    function getBalance() external view returns (uint256) {
        return contractBal;
    }
}
