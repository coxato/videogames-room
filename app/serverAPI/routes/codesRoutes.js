const router = require("express").Router() ;
const CodeService = require("../services/codesService");

// obtener los códigos
router.get("/data/codes", async (req, res) => {
    const service = new CodeService();
    let data = await service.getCodes();
    res.status(200).send(data);
})

// crear códigos
router.get("/create/code/:tipo", async (req, res) => {
    const service = new CodeService();
    let { tipo } = req.params;
    let codesCreated = await service.createCodes(tipo);
    res.status(200).send(codesCreated);
});

// cambiar configuraciones de códigos // falta autorización
router.put("/update/codes", async (req, res) => {
    const service = new CodeService();
    let codesUpdated = await service.actualizarDatosDeCodigos(req.body);
    res.send(codesUpdated);
});


module.exports = router;