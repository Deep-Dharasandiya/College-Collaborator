const express = require('express');
const router = express.Router()
const Facultys = require('../Model-Admin/FacultyRegisterModel');

router.post("/GetFacultyDetails", async (request, response) => {
    try {
      var FacultyDetails = await Facultys.find({ collage_id: request.body.collage_id},{_id:1,faculty_firstname:1,faculty_lastname:1,co_no:1,faculty_email:1,profile:1}).exec()
      response.json(FacultyDetails);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;