const router = require("express").Router() ;
const NegocioService = require("../services/negocioService");
const EventoService = require("../services/eventoService");

// falta autorización
// *************************************  crear datos  ************************************
// crear primer negocio por default
router.get("/create/store", async (req, res) => {
    const service = new NegocioService();
    let created = await service.guardarNegocio();
    res.status(200).send(created);
});
// ############# eventos ##############
// crear evento
router.post('/create/event', async ( req, res ) => {
    const service = new EventoService();
    let createdId = await service.crearEvento(req.body);
    console.log(`evento creado, _id: ${createdId}`);
    res.send(createdId);
})
// obtener eventos
router.get("/eventos", async (req, res) => {
    const service = new EventoService();
    let eventos = await service.getEventos();
    res.send(eventos);
})
// ####################################


// ******** pedir datos ***********
// datos del negocio // falta autorización
router.get("/data/:categorydata", async (req, res) => {
    const service = new NegocioService();
    let { categorydata } = req.params;
    let data = await service.datosNegocio(categorydata);
    res.status(200).send(data);
})


// *****************************************  control de códigos  ****************************************
// crear codigos
router.post("/create/code/:tipo", async (req, res) => {
    const service = new NegocioService();
    let { tipo } = req.params;
    let codesCreated = await service.createCodes(tipo);
    res.status(200).send(codesCreated);
})

// cambiar configuraciones de codigos // falta autorización
router.put("/update/codes", async (req, res) => {
    const service = new NegocioService();
    let { divisorPremio, duracionHora, duracionPremio, cantidadCodigos } = req.body;
    let codesUpdated = await service.actualizarDatosDeCodigos({nombre: "masplay"} , divisorPremio, duracionHora, duracionPremio, cantidadCodigos);
    res.send(codesUpdated);
})


// **************************        *****************************       *******************************
// #####  actualización de datos del local  #####
// actualización general, = precio, juegos y horario
router.put("/update/general", async (req, res) => {
    const service = new NegocioService();
    let { precio, juegos, horario } = req.body;
    console.log("el req.body ",req.body);
    let updated = await service.actualizarDatosGenerales(precio, juegos, horario);
    res.send(updated);
})
// #####        #####       #####

module.exports = router;