const express = require("express");
const router = express.Router();
const {addMovie, getMyMovies} = require("../controllers/movieController.js");

const {protect} = require("../middleware/authMiddleware.js");

router.route("/").post(protect, addMovie).get(protect, getMyMovies);


module.exports = router;