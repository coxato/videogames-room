const express = require("express");
const Axios = require("axios").default;
const FormData = require("form-data");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}))
app.use(express.json());


function base64Encode(file) {
    let body = fs.readFileSync(file);
    return body.toString('base64');
}

app.get("/test", (req, res) => {
	res.send({message: 'allOk'})
})
    


app.post('/enviar-foto', (req, res) => {
	console.log("######## el body que llega ", req.body);
	let image = req.body.img;
 
	// axios part
 
	var bodyData = new FormData();
    //let b64File = base64Encode(image);
    bodyData.append('foto', image);
    Axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload?key=27f46fb090518523dd013c62763dd69b',
      data: bodyData,
      headers: bodyData.getHeaders()
    })
      .then((resolve) => {
        console.log(resolve.data);
        return res.send(resolve.data)
      })
      .catch((error) => {
      	console.log(error.response.data)
      	return res.send(error.response.data)
      });

})



app.listen(4000,()=>console.log("server created at port 4000"))