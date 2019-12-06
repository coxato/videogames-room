const router = require("express").Router();
//const upload = require("../../config/multer");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");

router.post("/upload", verifyIsAdmin, (req, res) => {
	// upload photo
    upload( req, res, (err) => {
        if(!err) {
            return res.status(200).send({
            	filename: req.file.filename,
            	ok: true
            });
        }
        console.log("####### multer error ", err)
        return res.status(500).send({
        	ok: false
        })
	})
});

module.exports = router;