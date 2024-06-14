// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StoreContract {
    // Struct to represent a data entry
    struct Metadata {
        address owner;
        string network;
        uint createdAt;
        string name;
        string description;
        uint256 balance;
        string recipientName;
        address recipientAddress;
        string cid; // optional cid pointer to attachment/s
        uint validatedAt;
        string signature;
    }

    // owner
    address private owner;
    // metadata
    Metadata private metadata;

    // Event to log balance verification
    event FundVerified(address verifier, uint256 balance, string signature);

    constructor(
        string memory _name,
        string memory _description,
        uint256 _balance,
        string memory _recipientName,
        address _recipientAddress,
        string memory _cid,
        string memory _network
    ) {
        // Constructor to initialize the contract
        owner = msg.sender;
        metadata = Metadata(
            msg.sender,
            _network,
            block.timestamp,
            _name,
            _description,
            _balance,
            _recipientName,
            _recipientAddress,
            _cid,
            0,
            ""
        );
    }

    // get owner
    function getOwner() public view returns (address) {
        return owner;
    }

    function validate(string memory _signature) public returns (Metadata memory) {
        // verify address
        // get balance of sender
        uint256 balance = address(msg.sender).balance;
        uint256 targetBalance = metadata.balance;
        // only the recipient address can validate
        require(
            msg.sender == metadata.recipientAddress,
            "Only the intended recipient can validate their balance"
        );
        // require at least balance of the metadata
        require(balance >= targetBalance, "Balance is less than expected");
        // only validate once
        require(metadata.validatedAt == 0, "Balance already validated");
        // set validatedAt timestamp
        metadata.validatedAt = block.timestamp;
        metadata.signature = _signature;
        // emit event
        emit FundVerified(msg.sender, balance, _signature);
        return metadata;
    }

    // get metadata
    function getMetadata() public view returns (Metadata memory) {
        return metadata;
    }
}
