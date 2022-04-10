const express = require('express');
const router = express.Router()
const Subjects = require('../Model-Admin/SubjectRegisterMdel');

router.post("/GetSubjectDetails", async (request, response) => {
    try {
      var SubjectsDetails = await Subjects.find({ collage_id: request.body.collage_id}).exec()
      response.json(SubjectsDetails);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;