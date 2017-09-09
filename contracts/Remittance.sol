pragma solidity ^0.4.4;

contract Remittance {
	bytes32 private secretHash;
	address private owner;

	// "secret" is the password Alice gives to Bob.
	// Alice hashes the address of Claire together with this password on contract creation.

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Kill();

	function Remittance(bytes32 _secretHash) payable {
		secretHash = _secretHash;
		owner = msg.sender;
	}

	function withdraw(bytes32 secret) returns (bool succes) {
		bytes32 _secretHash = sha3(msg.sender, secret);
		require(_secretHash == secretHash);
		Transfer(owner, msg.sender, this.balance);
		selfdestruct(msg.sender);
		return true;
	}
	function kill() returns (bool success) {
		require(msg.sender == owner);
		selfdestruct(owner);
		Kill();
		return true;
	}
}
