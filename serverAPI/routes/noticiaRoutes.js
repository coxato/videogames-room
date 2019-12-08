const router = require("express").Router();
const NoticiaService = require("../services/noticiaService");
// middlewares
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");
const verifyIsAdminSimple = require("../middlewares/verifyIsAdminSimple");

// crear noticias
router.post("/crear", verifyIsAdmin, async (req, res) => {
	let noticia = req.body;
	const service = new NoticiaService();
	let created = await service.crear(noticia);
	res.status(200).send("noticia creada");
});
 

// obtener noticias
router.get("/all", verifyIsAdminSimple, async (req, res) => {
	const service = new NoticiaService();
	let noticias = await service.getMany();
	// user is admin or not
	let { isAdmin } = res.locals;
	res.status(200).send({noticias, isAdmin});
});


// obtener noticia
router.get("/noticia/:id", async (req, res) => {
	let { id } = req.params;
	console.log("##### el id ", id);
	const service = new NoticiaService();
	let noticia = await service.getOne(id);
	res.status(200).send(noticia);
});


// modificar noticia
router.put("/update/:id", verifyIsAdmin, async (req, res) => {
	let { id } = req.params;
	let newValues = req.body;
	console.log("##### nuevos valores ", newValues);
	const service = new NoticiaService();
	let updated = await service.actualizar(id, newValues);
	res.status(200).send("noticia actualizada");
});

// eliminar noticia
router.delete("/delete/:id", verifyIsAdmin, async (req, res) => {
	let { id } = req.params;
	const service = new NoticiaService();
	let deleted = await service.borrar(id);
	res.status(200).send("noticia borrada");
});

module.exports = router;