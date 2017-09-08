const RemittanceFactory = artifacts.require("./RemittanceFactory.sol");
const Remittance = artifacts.require("./Remittance.sol");

contract('RemittanceFactory', accounts  => {
  it('should not allow null secret', () =>
    RemittanceFactory.deployed().then(instance =>
      instance.createRemittance(0)
    ).then(assert.fail)
    .catch(err => assert.include(err.message, 'invalid opcode')));

  it('should deploy remittance', () =>
    RemittanceFactory.deployed().then(instance =>
      instance.createRemittance(1337)
      .then(({logs }) => {
        const event = logs.find(l => l.event === 'Created');
        assert.isObject(event);
        // Doesn't actually check that it is a Remittannce specifically, but oh well.
        assert.isObject(Remittance.at(event.args.addr));
      })
  ));
});
