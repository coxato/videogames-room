const router = require("express").Router() ;
const NegocioService = require("../services/negocioService");
const EventoService = require("../services/eventoService");
// middlewares
const verifyIsAdminToken = require("../middlewares/verifyIsAdmin");

// falta autorización
// crear primer negocio por default
router.get("/create/store", async (req, res) => {
    const service = new NegocioService();
    let created = await service.guardarNegocio();
    res.status(200).send(created);
});

// datos del negocio 
router.get("/data/general", async (req, res) => {
    const service = new NegocioService();
    let data = await service.datosNegocio();
    res.status(200).send(data);
});

// #####  actualización de datos del local  #####
// actualización general, = precio, juegos y horario
router.put("/update/general", verifyIsAdminToken, async (req, res) => {
    const service = new NegocioService();
    let { precio, juegos, horario } = req.body;
    console.log("el req.body ",req.body);
    let updated = await service.actualizarDatosGenerales(precio, juegos, horario);
    res.send(updated);
});

module.exports = router;