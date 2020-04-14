const {
  createStudent,
  login,
  getStudentProfileDetails,
  updateStudentName,
  updateStudentProfilePic,
  updateStudentObjective,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  deleteExperience,
  updateExperience,
  updateStudentSkills,
  updateContactInformation,
  getAllStudents,
} = require("./student.service");

const jwt = require('jsonwebtoken');
const { secret } = require('../../config/configValues');
var kafka = require('../../kafka/client');

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
//const { sign } = require("jsonwebtoken");
const url = require('url');
var multer = require('multer')
var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../Frontend/public/Uploads/Profile-Pic')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      console.log(file.mimetype);
      return cb({
        success: 0,
        data: "Only images allowed"
      });
    }
  }
}).single('file');


module.exports = {
  createStudent: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createStudent(body, (err, results) => {
      if (err) {
        return res.status(400).json({
          success: 0,
          message: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Sign up Successful"
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    login(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database error"
        });
      }
      else {
        if (results.length == 0) {
          return res.json({
            success: 0,
            message: "email or password incorrect"
          });
        }
        if (compareSync(body.password, results.password)) {
          const payload = { _id: results._id, type: 0 , name:result.fName , profilePicURL : result.profilePicURL};
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          return res.json({
            success: 1,
            data: token,
            message: "Signin Successful"
          });
        }
        else {
          return res.status(200).json({
            success: 0,
            message: "email id or password incorrect"
          });
        }
      }

    });
  },


  getStudentDetails: (req, res) => {
    const id = req.params.id;
    const data = {
      id: id,
      path: 'get_student_details'
    }
    // kafka.make_request('student',data,(err, results) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //       return res.json({
    //       success: 1,
    //       data: results
    //       });
    //   });
    getStudentProfileDetails(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },






  updateStudentName: (req, res) => {
    const body = req.body;
    updateStudentName(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  updateStudentSkills: (req, res) => {
    const body = req.body;
    updateStudentSkills(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  updateStudentObjective: (req, res) => {
    const body = req.body;
    updateStudentObjective(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  updateEducation: (req, res) => {
    const body = req.body;
    updateEducation(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  deleteEducation: (req, res) => {
    const body = req.body;
    deleteEducation(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  addEducation: (req, res) => {
    const body = req.body;
    addEducation(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  updateExperience: (req, res) => {
    const body = req.body;
    updateExperience(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  deleteExperience: (req, res) => {
    const body = req.body;
    deleteExperience(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  addExperience: (req, res) => {
    const body = req.body;
    addExperience(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  getAllStudents: (req, res) => {
    const id = req.params.id;
    getAllStudents(id,(err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  updateCompanyProfilePic: (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(req.file.mimetype)
      const data = {
        profilePicURL: "/Uploads/Profile-Pic/" + req.file.originalname,
        id: req.params.id
      }
      updateCompanyProfilePic(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    });
  },

  updateStudentProfilePic: (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(req.file.mimetype)
      const data = {
        profilePicURL: "/Uploads/Profile-Pic/" + req.file.originalname,
        id: req.params.id
      }
      updateStudentProfilePic(data, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: data.profilePicURL
        });
      });
    });
  },


  getCompanyProfileDetails: (req, res) => {
    const id = req.params.id;

    getCompanyProfileDetails(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  updateCompanyDetails: (req, res) => {
    const body = req.body;
    updateCompanyDetails(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      updateContactInformation(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      })
    });
  },

  updateContactInformation: (req, res) => {
    const body = req.body;
    updateContactInformation(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    })
  },


}