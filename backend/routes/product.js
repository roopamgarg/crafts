const express = require("express");
const router = express.Router();
const productHandler = require("../controllers/product");

router.post("/add",productHandler.create);
router.put("/edit/:id",productHandler.edit);
router.delete("/delete/:id",productHandler.delete);
router.get("/fetch",productHandler.fetchAll);
router.get("/fetch_by_tags",productHandler.fetchByTags);
router.get("/fetchone/:id",productHandler.fetchOne);



module.exports = router;
