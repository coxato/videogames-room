// upload a photo
// all ok return {ok: true, filename: 'myPhoto.jpg'}
// if fail return {ok: false}

async function uploadPhotoFromForm(file,inputName, restEndPoint) {

	try{
		// crear un FormData para enviarlo por fetch
		const formData = new FormData();
	        formData.append(inputName, file);
	        const config = {
	            method: 'POST',
	            body: formData,
	            headers: {
	                'x-access-token': sessionStorage.getItem("token")
	            }
	        };
	        console.log(`####### restEndPoint ${restEndPoint} #########`)
	        let response = await fetch(restEndPoint, config);
	        let json = await response.json();
	        // all ok
	        if(json.ok){
	        	return { ok: true, filename: json.filename}
	        }
	        // file error
	        return { ok: false }

	}catch(err){
		console.log('error in this utilitie. ',err);
		return { ok: false }
	}
}

export default uploadPhotoFromForm;