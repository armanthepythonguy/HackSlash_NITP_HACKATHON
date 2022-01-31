const example = artifacts.require('crowdFund.sol');
module.exports = function(deployer){
    deployer.deploy(example);
};