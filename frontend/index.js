var account = null;
var test = '';
        const address = '0x52A868439FEa090Bcf7a5a0d8483187d3095C58F';
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
				"inputs": [],
				"name": "getAllDonations",
				"outputs": [
					{
						"components": [
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
							},
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
						"internalType": "struct crowdFund.donation[]",
						"name": "",
						"type": "tuple[]"
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
        contract = new web3.eth.Contract(ABI, address);
        getData();
		var element = document.getElementById("account");
		element.innerHTML = account;
		element = document.getElementById("message");
		element.style.visibility = "hidden";
    }else{
		alert("Please install metamask !!!")
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

const getData = async()=>{
	var data = await contract.methods.getAllDonations().call();
	var output_data = '<div class="flex flex-col"><div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"><div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"><div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th><th scope="col" class="relative px-6 py-3"><span class="sr-only">Edit</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"></tbody>';
	for(var i=0; i<data.length;i++){
		test = data[i];
		output_data+="<tr>";
		output_data+='<td class="px-6 py-4 whitespace-nowrap"> <div class="flex items-center"> <div class="ml-4"> <div class="text-sm font-medium text-gray-900">'+test[4]+'</div></div></div></td>';
		output_data+='<td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-900">'+test[4]+'</div></td>';
		output_data+='<td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold text-green-800">'+test[2]/10**18+'</span></td>';
		output_data+='<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'+test[1]+'</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> <a href="#" class="text-indigo-600 hover:text-indigo-900">Donate</a></td>';
		output_data+="<tr>";
		console.log(output_data);
	}
	output_data+='</tbody></table></div></div></div></div>';
	test = output_data;
	document.getElementById("table").innerHTML = output_data;
}