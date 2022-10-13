const express = require("express");
const router = express.Router();
const {addMovie, getMyMovies, deleteMovie, rateMovie, getUserMovies} = require("../controllers/movieController.js");

const {protect} = require("../middleware/authMiddleware.js");

//user interaction with movies 
router.route("/").post(protect, addMovie).get(protect, getMyMovies);
router.route("/:id").delete(protect, deleteMovie)
router.route("/rate/:id/:rating").get(protect, rateMovie)

//other users movies
router.route("/user/:name").get(getUserMovies)
module.exports = router;