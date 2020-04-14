import {GET_STUDENT_DATA, CHANGE_NAME , CHANGE_PROFILE_PIC, CHANGE_OBJECTIVE ,CHANGE_CONTACT_INFORMATION ,CHANGE_EDUCATION,CHANGE_EXPERIENCE,
CHANGE_SKILLS , DELETE_EXPERIENCE , DELETE_EDUCATION ,ADD_EXPERIENCE ,ADD_EDUCATION } from "../constants/action-types";

export function getStudentData(payload) {
  console.log("dispatching the getStudentData action")
  return { type: GET_STUDENT_DATA, payload };
}

export function changename(payload) {
  console.log("dispatching the change name action")
  return { type: CHANGE_NAME, payload };
}

export function changeProfilePic(payload) {
  console.log("dispatching the changeProfilePic action")
  return { type: CHANGE_PROFILE_PIC, payload };
}


export function changeObjective(payload) {
    console.log("dispatching the change objective action")
    return { type: CHANGE_OBJECTIVE, payload };
  }

  export function changeContactInformation(payload) {
    console.log("dispatching the change contact information action")
    return { type: CHANGE_CONTACT_INFORMATION, payload };
  }

  export function changeEducation(payload) {
    console.log("dispatching the change education action")
    return { type: CHANGE_EDUCATION, payload };
  }

  export function changeExperience(payload) {
    console.log("dispatching the change experience action")
    return { type: CHANGE_EXPERIENCE, payload };
  }

  export function changeSkills(payload) {
    console.log("dispatching the change skills action")
    return { type: CHANGE_SKILLS, payload };
  }
  export function addExperience(payload) {
    console.log("dispatching the addExperience action")
    return { type: ADD_EXPERIENCE, payload };
  }
  export function addEducation(payload) {
    console.log("dispatching the addEducation action")
    return { type: ADD_EDUCATION, payload };
  }
  export function deleteExperience(payload) {
    console.log("dispatching the DELETE_EXPERIENCE action")
    return { type: DELETE_EXPERIENCE, payload };
  }
  export function deleteEducation(payload) {
    console.log("dispatching the DELETE_EDUCATION action")
    return { type: DELETE_EDUCATION, payload };
  }