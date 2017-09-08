pragma solidity ^0.4.4;

import "./Remittance.sol";

contract RemittanceFactory {

  address[] public contracts;
  event Created(address addr);

  function getContractCount() public constant returns(uint contractCount) {
    return contracts.length;
  }

  function createRemittance(bytes32 secretHash) public payable returns(address newContract) {
    require(secretHash != 0);
    Remittance c = (new Remittance).value(msg.value)(secretHash);
    contracts.push(c);
    Created(c);
    return c;
  }
}
