pragma solidity ^0.4.4;

contract Remittance {
	bytes32 private secretHash;
	address private owner;

	// event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Remittance(bytes32 _secretHash) payable {
		secretHash = _secretHash;
		owner = msg.sender;
	}

	function withdraw(string secret) {
		require(keccak256(msg.sender, secret) == secretHash);
		// emit event
		selfdestruct(msg.sender);
	}
}
