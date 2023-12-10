//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/**
 * @author AryanGodara 0xPrinc RIppER707
 */

contract FilecoinMetadataStore {
	address public immutable owner;
    // Mapping address to Filecoin metadata address
    mapping(address => string) public addressToHash;
	mapping(bytes32 => string) public keccaktoCID;

    // Event emitted when a user stores their metadata
    event MetadataStored(address indexed user, string metadataAddress);

	constructor() {
		owner = msg.sender;
	}

    // External payable function to get user's metadata address
    function getUserHash(address user) external payable returns (string memory) {
        // Return the metadata address
        return addressToHash[user];
    }

	function getHashMetadata(bytes32 kecc) external payable returns (string memory) {
		return keccaktoCID[kecc];
	}

    // Store user's metadata address
    function storeMetadata(string memory metadataAddress) public {
        addressToHash[msg.sender] = metadataAddress;
        emit MetadataStored(msg.sender, metadataAddress);
    }

	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */

	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}
	function withdraw() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}