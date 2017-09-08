var RemittanceFactory = artifacts.require("RemittanceFactory.sol");
var Remittance = artifacts.require("Remittance.sol");

module.exports = function(deployer) {
  deployer.deploy(RemittanceFactory);
  deployer.link(RemittanceFactory, Remittance);
};
