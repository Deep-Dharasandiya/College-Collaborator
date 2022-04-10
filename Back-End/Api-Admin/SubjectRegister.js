const express = require('express');
const router = express.Router()
const Subjects = require('../Model-Admin/SubjectRegisterMdel');

router.post("/SubjectRegister", async (request, response) => {
    try {
      var check = await Subjects.find({ subject_name: request.body.subject_name},{_id:1}).exec()
      if(check==''){
        var data = new Subjects(request.body);
        var result = await data.save();
        response.json('1');
      }else{
          response.json("2");
      }
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;