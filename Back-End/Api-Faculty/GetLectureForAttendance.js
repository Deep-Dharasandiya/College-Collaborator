const express = require('express');
const router = express.Router()
const Class = require('../Model-Admin/CreateClassroomModel');
const Facultys = require('../Model-Admin/FacultyRegisterModel');
const Subjects = require('../Model-Admin/SubjectRegisterMdel');
const Students = require('../Model-Admin/StudentRegisterModel');
router.post("/GetLectureForAttendance", async (request, response) => {
    try {
      var ClassroomDetails = await Class.find({collage_id:request.body.collage_id}).populate([
        { 
          path: 'subclasses',
         populate: {
             path: 'students',
             model:'students'
            }
           },
        {
          path:'counselor',
        },
        { 
        path: 'shedual',
        populate: {
          path: 'subjectid',
          model:'subjects'
         }
        },
        { 
          path: 'shedual',
          populate: {
            path: 'facultyid',
            model:'facultys'
           }
          },
           { 
             path: 'subjects',
             populate: {
               path: 'subject',
               model:'subjects'
              }
             },
             { 
                path: 'subjects',
                populate: {
                  path: 'facultys',
                  model:'facultys'
                 }
                },
                { 
                  path: 'subjects',
                  populate: {
                    path: 'students',
                    model:'students'
                   }
                  },             

    ]).exec();

      response.json(ClassroomDetails);
    } catch (error) {
        response.status(500).json('0');
    }
  });
  module.exports = router;