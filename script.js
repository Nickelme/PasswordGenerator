const lowers = "abcdefghijklmnopqrxtuvwxyz";
const uppers = "ABCDEFGHIJKLMNOPQRXTUVWXYZ";
const numbers = "1234567890";
const specials = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
const BIG = 8096

// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");
var generateBigBtn = document.querySelector("#generate-big");

var bigInterval;

var bigPass = "";

function pullParams(){
	var params = {};
	params.Length = parseInt(document.querySelector("#nmbLength").value);
	params.useLowers = document.querySelector("#ckbLowers").checked;
	params.useUppers = document.querySelector("#ckbUppers").checked;
	params.useNumbers = document.querySelector("#ckbNumber").checked;
	params.useSpecials = document.querySelector("#ckbSpecials").checked;

	return params;
}

function generatePassword(){
	var params = pullParams();
	var cset = "";
	var pass = "";
	if(params.useLowers) cset+= lowers;
	if(params.useUppers) cset+= uppers;
	if(params.useSpecials) cset+=specials;
	if(params.useNumbers) cset+=numbers;

	if(cset.length == 0){
		return "You need to select at least one character set"
	}

	var secureRndArray = new Uint32Array(params.Length);
	window.crypto.getRandomValues(secureRndArray);
	for(var i = 0; i < params.Length; i++){
		pass += cset.charAt(secureRndArray[i]%cset.length);
	}

	return pass;
	

}

// Write password to the #password input
function writePassword() {
	clearInterval(bigInterval);
	var password = generatePassword();

	passwordText.value = password;

}

function updateScroll(){
    var element = document.querySelector("#password");
    element.scrollTop = element.scrollHeight;
}

function writeMoreBig(){
	if(bigPass.length < BIG){
		bigPass += generatePassword();
		passwordText.value = bigPass;
		console.log("Wrote: " + bigPass.length);
		updateScroll();
	}else{
		alert("Password is " + bigPass.length + " characters long");
		clearInterval(bigInterval);
	}
}

function writeBig(){
	bigPass = "";
	document.querySelector("#nmbLength").value = 5;
	clearInterval(bigInterval);
	bigInterval = setInterval(writeMoreBig, 25);
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
generateBigBtn.addEventListener("click", writeBig);
