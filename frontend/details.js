var account = null;
var test = '';
var id = '';

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
        getFunds();
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
        var output_data = `<div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">CrowdFund Project Details</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">The project details helps you out to figure if you really want to help them or not.</p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Project name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">`+data['title']+`</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Category</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">`+data['title'] +`</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Amount Collected</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">`+data['amount_got']/(10**18)+`</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Amount Required</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">`+data['amount']+`</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Details</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">`+data['details']+`</dd>
            </div>
          </dl>
        </div>
      </div>`;
      test = output_data;
    document.getElementById("data").innerHTML = output_data;
    }
}

const sendFunds = async()=> {
    var transaction = await contract.methods.sendBal(0).send({from:account, value: web3.utils.toWei(String(document.getElementById("amount").value), 'ether')});
    console.log(transaction);
}

const getTransactions = async()=>{
    var data = await contract.methods.getTransactions(0).call();
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
    console.log(data);
}
