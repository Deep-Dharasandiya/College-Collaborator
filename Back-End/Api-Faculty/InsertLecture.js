const express = require('express');
const router = express.Router()
const Mongoose = require('mongoose');
const Lecture = require('../Model-Faculty/LectureModel');

router.post("/InsertLecture", async (request, response) => {
    try {
        var data = new Lecture(request.body);
        var result = await data.save();
        response.json("1");
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;