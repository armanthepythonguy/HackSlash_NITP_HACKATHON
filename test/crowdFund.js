const crowdFund = artifacts.require('crowdFund.sol');
contract('example', ()=>{
    it('example', async ()=> {
        const storage = await crowdFund.new();
        await storage.setDonations("First crowdfund", "This is the first crowdfund in this network.","0xbA46496e7E5A61a7A9DF5e54Ea330aD20C006d00", 1000);
        data = await storage.getDonations(1);
        assert(data['amount'].toString() === "1000" && data['title'].toString() === "First crowdfund");
    });
});