const router = require("express").Router() ;
const CodeService = require("../services/codesService");
// middlewares
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");


// crear la configuración básica por defecto de los códigos
// ejecutar solo 1 vez
router.get("/data/firstconfig", async (req, res) => {
    const service = new CodeService();
    let data = await service.getCodes();
    // asegurarse de que solo se ejecuta 1 vez
    if(data){
        res.status(200).send({message: 'codes default config is already created!'});
    }else{
        let configCreated = await service.createCodesConfig();
        res.status(200).send({message: 'default codes config created'});
    }
})

// obtener los códigos
router.get("/data/codes", verifyIsAdmin, async (req, res) => {
    const service = new CodeService();
    let data = await service.getCodes();
    res.status(200).send(data);
})

// crear códigos
router.get("/create/code/:tipo", verifyIsAdmin, async (req, res) => {
    const service = new CodeService();
    let { tipo } = req.params;
    let codesCreated = await service.createCodes(tipo);
    res.status(200).send(codesCreated);
});

// cambiar configuraciones de códigos 
router.put("/update/codes", verifyIsAdmin, async (req, res) => {
    const service = new CodeService();
    let codesUpdated = await service.actualizarDatosDeCodigos(req.body);
    res.send(codesUpdated);
});


module.exports = router;