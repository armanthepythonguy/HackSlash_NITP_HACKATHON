var account = null;
        const address = '0x34924D69f564290387D999ab71e2Cd0CdC405A63';
        const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "fund_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount_got",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "aggregator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getDonations",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount_got",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getTransactions",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "givers",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amount_given",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "timestamp",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "sendBal",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_details",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "setDonations",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
(async () => {
    if(window.ethereum){
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        console.log(account);
        contract = new web3.eth.Contract(ABI, address);
        addDonation();
        getFunds();
        getTransactions();
    }else{
        alert('Please install Metamask')
    }
})();

const getFunds = async()=> {
    if(contract){
        var data = await contract.methods.getDonations(0).call();
        console.log(data);
    }
}

const sendFunds = async()=> {
    var transaction = await contract.methods.sendBal(0).send({from:account, value: web3.utils.toWei('0.05', 'ether')});
    console.log(transaction);
}

const addDonation = async()=>{
    var data = await contract.methods.setDonations('second','second','second','0xbA46496e7E5A61a7A9DF5e54Ea330aD20C006d00', 1).send({from:account});
    console.log(data);
}

const getTransactions = async()=>{
    var data = await contract.methods.getTransactions(0).call();
    console.log(data);
}