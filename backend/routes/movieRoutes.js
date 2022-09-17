const express = require("express");
const router = express.Router();
const {addMovie} = require("../controllers/movieController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.route("/").post(protect, addMovie);


module.exports = router;