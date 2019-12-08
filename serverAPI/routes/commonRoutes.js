const router = require("express").Router() ;
const NegocioService = require("../services/negocioService");
const CodesService = require("../services/codesService");

// get simple store data 
router.get('/general', async (req, res) => {
	const service = new NegocioService();
	// get data
	let data = await service.datosNegocio();
	res.status(200).send(data);
});

// get simple codes data, like necessary hours
router.get("/codes", async (req, res) => {
	const service = new CodesService();
	let data = await service.getSimpleData();
	res.status(200).send(data);
})


module.exports = router;