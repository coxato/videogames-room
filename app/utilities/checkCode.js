// check the code, return { success, fail, used }

async function checkCode(type, code = "just make"){
	try{

		let response = await fetch(`/api/codes/check/?type=${type}&code=${code}`, {
			headers: {
				'x-access-token': sessionStorage.getItem('token')
			}
		});
		let checked = await response.json();
		console.log("el mensaje traído del backend", checked);
		return checked;

	}catch(err){
		console.log(err);
	}
}

export default checkCode;