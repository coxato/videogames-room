const router = require("express").Router() ;
const CodeService = require("../services/codesService");
// middlewares
const verifyToken = require("../middlewares/verifyToken");

// check code
router.get("/check", verifyToken, async (req, res) => {
    const { type, code } = req.query;
    const service = new CodeService();
    let checked;
    // just check for make a code, or check the codes
    if(code === "just make") checked = await service.createSimpleCode(type, req.userId);
    else checked = await service.checkCode(type, code, req.userId);
    // checked is like { success, fail, ?used } object
    res.status(200).send({...checked});  
})

module.exports = router;