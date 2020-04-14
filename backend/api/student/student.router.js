const router = require("express").Router();
const passport = require('passport');



// const { checkToken } = require("../../auth/token_validation");
const {
  createStudent,
  login,
  getStudentDetails,
  updateStudentName,
  getAllStudents,
  updateStudentProfilePic,
  updateStudentObjective,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  updateStudentSkills,
  updateContactInformation

//   login,
//   getUserByUserId,
//   getUsers,
//   updateUsers,
//   deleteUser
} = require("./student.controller");

let checkAuth = passport.authenticate('jwt', { session: false });
// router.get("/", checkToken, getUsers);
 router.post("/createStudent", createStudent);
 router.get("/getStudentDetails/:id", getStudentDetails);
 router.get("/getAllStudents/:id", checkAuth,getAllStudents);

 router.post("/updateStudentName", checkAuth, updateStudentName);
 router.post("/updateStudentSkills", checkAuth, updateStudentSkills);
  router.post("/updateContactInformation", checkAuth,updateContactInformation);
 router.post("/updateStudentObjective", checkAuth ,updateStudentObjective);
 router.post("/addEducation", checkAuth ,addEducation);
 router.post("/updateEducation", checkAuth ,updateEducation);
 router.post("/deleteEducation", checkAuth ,deleteEducation); 
 router.post("/addExperience", checkAuth ,addExperience);
 router.post("/deleteExperience", checkAuth ,deleteExperience);
 router.post("/updateExperience", checkAuth ,updateExperience);
 router.post("/updateStudentProfilePic/:id", checkAuth ,updateStudentProfilePic);
 


 router.post("/login", login);

// router.get("/:id", checkToken, getUserByUserId);
// router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);

module.exports = router;