const express = require("express");
const router = express.Router();

const Shelter = require("../controllers/Shelter");

router.get("/", (req, res) => {
  Shelter.handleMainGet(req, res);
});

router.get("/:id", (req, res) => {
  Shelter.handleGetById(req, res);
});

router.post("/", (req, res) => {
  Shelter.handleMainPost(req, res);
});

router.put("/", (req, res) => {
  Shelter.handleMainPut(req, res);
});

module.exports = router;
