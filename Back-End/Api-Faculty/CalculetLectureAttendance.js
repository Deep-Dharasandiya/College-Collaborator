const express = require('express');
const router = express.Router()
const Lecture = require('../Model-Faculty/LectureModel');
const Class = require('../Model-Admin/CreateClassroomModel');
const Facultys = require('../Model-Admin/FacultyRegisterModel');
const Subjects = require('../Model-Admin/SubjectRegisterMdel');
const Students = require('../Model-Admin/StudentRegisterModel');
router.post("/CalculateLectureAttendance", async (request, response) => {
    try {
      var Lectures = await Lecture.find({collage_id:request.body.collage_id,faculty_id:request.body.faculty_id,class_id:request.body.class_id,subject_id:request.body.subject_id}).populate([
    
        {
          path:'faculty_id',
        },
        {
            path:'subject_id',
        },
        {
            path:'class_id',
            select: { 'subjects': 1},
            populate: {
                path: 'subjects',
                populate: {
                    path: 'students',
                    model:'students'
                   }
               }
        },
    ]).exec();


      response.json(Lectures);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;