var Royalty = artifacts.require("./Royalty.sol");

module.exports = function(deployer) {
  deployer.deploy(Royalty);
};
