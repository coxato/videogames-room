// check the code, return { success, fail, used }

async function checkCode(type, code = "just make", date=null){
	try{
		console.log("que es el mardito date ", date)

		let response = await fetch(`/api/codes/check/?type=${type}&code=${code}`, {
			method: 'POST',
			body: JSON.stringify({
				date: new Date()
			}),
			headers: {
				'x-access-token': sessionStorage.getItem('token'),
				'Accept': 'application/json',
				'Content-Type': 'application/json'
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