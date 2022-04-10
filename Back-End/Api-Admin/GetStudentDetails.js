const express = require('express');
const router = express.Router()
const Students = require('../Model-Admin/StudentRegisterModel');

router.post("/GetStudentDetails", async (request, response) => {
    try {
      var StudentDetails = await Students.find({ collage_id: request.body.collage_id},{_id:1,student_firstname:1,student_lastname:1,student_en_no:1,student_email:1,profile:1}).exec()
        response.json(StudentDetails);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;