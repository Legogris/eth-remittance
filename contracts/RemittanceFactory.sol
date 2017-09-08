pragma solidity ^0.4.4;

import "./Remittance.sol";

contract RemittanceFactory {

  address[] public contracts;

  function getContractCount() 
    public
    constant
    returns(uint contractCount)
  {
    return contracts.length;
  }

  function newRemittance(bytes32 secretHash)
    public
    returns(address newContract)
  {
    Remittance c = new Remittance(secretHash);
    contracts.push(c);
    return c;
  }
}
