const Remittance = artifacts.require("./Remittance.sol");
const ethereumABI = require('ethereumjs-abi');


const amount = web3.toBigNumber(web3.toWei(1, 'ether'));
contract('Remittance', accounts  => {
  const hash = '0x' + ethereumABI.soliditySHA3(
    [ "address", "bytes32"],
    [ accounts[0], '0x1337' ]
  ).toString('hex');

  it('should not allow withdraw with incorrect secret', () =>
    Remittance.new(hash).then(instance =>
      instance.withdraw('0x1338')
    ).then(assert.fail)
    .catch(err => assert.include(err.message, 'invalid opcode')));

  it('should not allow withdraw for other sender', () =>
    Remittance.new(hash).then(instance =>
      instance.withdraw('0x1337', { from: accounts[1] })
    ).then(assert.fail)
    .catch(err => assert.include(err.message, 'invalid opcode')));

  it('should allow withdraw with correct secret', () => {
    const oldBalance = web3.eth.getBalance(accounts[0]);
    return Remittance.new(hash, { value: amount, from: accounts[1] }).then(instance =>
      Promise.all([instance.withdraw('0x1337'), web3.eth.getBalance(instance.contract.address)])
    ).then(([{ tx, receipt }, balance]) => {
      const gasCost = web3.eth.getTransaction(tx).gasPrice.mul(receipt.gasUsed);
      const expectedBalance = amount.add(oldBalance).sub(gasCost);
      assert.isTrue(web3.eth.getBalance(accounts[0]).eq(expectedBalance), 'should have one more ether');
    })
   });
   it('should only allow owner to kill', () => {
    return Remittance.new(hash, { value: amount, from: accounts[1] })
      .then(instance => instance.kill({ from: accounts[2] }))       
      .then(assert.fail)                                            
      .catch(err => assert.include(err.message, 'invalid opcode', 'should not allow randoms to kill'));                                
  });
  // TODO: Test kill
});
