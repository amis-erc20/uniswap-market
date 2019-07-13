const slip = 0.001;
var assumption = document.getElementById("assumption");
var univ1dai_tot_supply = document.getElementById("univ1dai_tot_supply");
var univ1_in_univ1= document.getElementById("univ1_in_univ1");
var eth_in_univ1 = document.getElementById("eth_in_univ1");
var eth_in_univ1univ1 = document.getElementById("eth_in_univ1univ1");
var internal_price = document.getElementById("internal_price");
var internal_price_m = document.getElementById("internal_price_m");
var internal_price_p = document.getElementById("internal_price_p");
var market_price = document.getElementById("market_price");
var ufeem = document.getElementById("ufeem");
var ufeep = document.getElementById("ufeep");
var market_price_m = document.getElementById("market_price_m");
var market_price_p = document.getElementById("market_price_p");
//var market_price_m2 = document.getElementById("market_price_m2");
//var market_price_p2 = document.getElementById("market_price_p2");
var buy_dai_dex = document.getElementById("buy_dai_dex");
var sell_dai_dex = document.getElementById("sell_dai_dex");
var trading_amount = document.getElementById("trading_amount");

var supply;
var uniuni;
var eth_in;
var eth_uniuni;
var dai_in_univ1;
var eth_dai_price
var iprice;
var ipricem;
var ipricep;
var mprice;
var mpricem;
var mpricep;
var mpricem2;
var mpricep2;
var a_ufee_primitive = 0.3;
var a_ufee = a_ufee_primitive;
var a_ufee2 = a_ufee_primitive * 1.5;
var dexag_rate_buy_dai;
var dexag_rate_buy_dai_inv;
var dexag_dex_buy_dai;
var amount = 1000;
var half_amount;
var amount_eth;

/*
   ufeem2.innerHTML = "-" + a_ufee2.toFixed(2) + "%" ;
   ufeep2.innerHTML = "+" + a_ufee2.toFixed(2) + "%" ;
   */


function get_supply(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x09cabec1ead1c0ba254b09efb3ee13841712be14&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			supply = data.result * 1e-18;
			univ1dai_tot_supply.innerHTML = supply.toFixed(3);
			resolve(supply);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);

function get_eth_in_univ1(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=balance&address=0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			eth_in = data.result * 1e-18;
			eth_in_univ1.innerHTML = eth_in.toFixed(3)
				resolve(eth_in);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};


function get_uniuni(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x09cabec1ead1c0ba254b09efb3ee13841712be14&address=0x601c32E0580D3aef9437dB52D09f5a5D7E60eC22&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			uniuni = data.result * 1e-18;
			univ1_in_univ1.innerHTML = uniuni.toFixed(3)
				resolve(uniuni);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);

function get_eth_uniuni(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=balance&address=0x601c32E0580D3aef9437dB52D09f5a5D7E60eC22&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			eth_uniuni = data.result * 1e-18;
			eth_in_univ1univ1.innerHTML = eth_uniuni.toFixed(3)
				resolve(eth_uniuni);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
function get_dai_in_univ1(){
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359&address=0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14&tag=latest&apikey=RYS83IQGH4XYNFC1HAC7UIU94NXEJHS3CQ",
			dataType:"json",
		})
		.done((data)=>{console.log(data);
			dai_in_univ1 = data.result * 1e-18;
			console.log(dai_in_univ1);
			resolve(dai_in_univ1);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};//);

function get_buy_dai_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=ETH&to=DAI&toAmount="+ String(val.toFixed(3)) +"&dex=best",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			console.log(data.metadata.source.price)
				console.log(data.metadata.source.dex)

				resolve([
						data.metadata.source.price,
						data.metadata.source.dex
				]);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
function get_sell_dai_info(val){
	console.log(val);
	return new Promise(function(resolve){
		$.ajax({
			url:"https://api.dex.ag/trade?from=DAI&to=ETH&fromAmount="+ String(val.toFixed(3)) +"&dex=best",
			dataType:"json",
		})

		.done((data)=>{console.log(data);
			console.log(data.metadata.source.price)
				console.log(data.metadata.source.dex)

				resolve([
						data.metadata.source.price,
						data.metadata.source.dex
				]);
		})
		.fail((data)=>{console.log(data.responceText);})
			.always((data)=>{console.log(data);});
	})
};
	Promise.all([
			get_uniuni(), //0
			get_eth_uniuni(),//1
			get_supply(), //2
			get_eth_in_univ1(),//3
			get_dai_in_univ1()//4
	])
	.then(function(data){
		console.log(data);
		iprice = data[3] * 2 / data[2];
		internal_price.innerHTML = iprice.toFixed(3) ;

		mprice = data[1] / data[0];
		market_price.innerHTML = mprice.toFixed(3);



		mpricem2 = data[1] / data[0] * (1 - a_ufee2 / 100);
		//market_price_m2.innerHTML = mpricem2.toFixed(3);

		mpricep2 = data[1] / data[0] * (1 + a_ufee2 / 100);
		//market_price_p2.innerHTML = mpricep2.toFixed(3);

		console.log("diff: " + String(Math.abs(1 - iprice/mprice) * eth_uniuni));
		console.log(dai_in_univ1);
		eth_dai_price = dai_in_univ1 / eth_in;
		console.log(eth_dai_price);
		//amount = Math.abs(1 - iprice/mprice) * eth_uniuni * eth_dai_price;
		amount = slip * eth_uniuni * eth_dai_price;
		//Divide for optimal amount
		//amount = Math.sqrt(amount);
		//Divide for buy half dai
		half_amount = amount / 2;
		console.log(amount);
		amount_eth = amount / eth_dai_price;


		assumption.innerHTML = String(amount_eth.toFixed(2)) 
			+ " ETH (~" + String(amount.toFixed(0))+ " DAI)";

		Promise.all([
				get_buy_dai_info(half_amount),
				get_sell_dai_info(half_amount),
		]).then(function(data2){
			//dexag etc
			var eth_price = eth_dai_price;
			var buy_dai_price = data2[0][0];
			var a_buy_dai_dex = data2[0][1];
			var sell_dai_price = data2[1][0];
			var a_sell_dai_dex = data2[1][1];
			var buy_dai_spread = buy_dai_price * eth_price;
			var sell_dai_spread = sell_dai_price * eth_price;
			var ipricep = (0.5 + 0.5 * buy_dai_spread) * iprice;
			var ipricem = (0.5 + 0.5 * sell_dai_spread) * iprice;
			internal_price_m.innerHTML = ipricem.toFixed(3) ;
			internal_price_p.innerHTML = ipricep.toFixed(3) ;
			buy_dai_dex.innerHTML = "buy " + String(half_amount.toFixed(0)) + " DAI"
				+ " with ETH at " + String(a_buy_dai_dex) + "* and band";
			sell_dai_dex.innerHTML = "unband and sell " + String(half_amount.toFixed(0)) 
				+ " DAI for ETH at " + String(a_sell_dai_dex) + "*";
			trading_amount.innerHTML = half_amount.toFixed(0);
			
			//uniswap price calculation from https://docs.uniswap.io/frontend-integration/swap
			numeratorp = amount_eth * uniuni * (1 - a_ufee /100);
			denominatorp = eth_uniuni + amount_eth * (1 - a_ufee / 100);
			output = numeratorp / denominatorp;
			mpricep = amount_eth / output;
			market_price_p.innerHTML = mpricep.toFixed(3);
			
			spread = 2 * (mpricep - mprice) / (mpricep + mprice);
			mpricem = (1 - spread) * mprice;

			market_price_m.innerHTML = mpricem.toFixed(3);
			console.log(spread);

			description = String(amount_eth.toFixed(2)) + " ETH"
			ufeem.innerHTML = "sell for " + description;
			ufeep.innerHTML = "buy with " + description ;
			if(iprice > mprice){
			market_price_m.innerHTML = "";
			ufeem.innerHTML = "" ;
			}else{
				market_price_p.innerHTML = "";
				ufeep.innerHTML = "" ;
			}

		});
	});
