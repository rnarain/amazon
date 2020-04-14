import {GET_STUDENT_DATA, CHANGE_NAME ,CHANGE_PROFILE_PIC,CHANGE_OBJECTIVE ,CHANGE_CONTACT_INFORMATION ,CHANGE_EDUCATION,CHANGE_EXPERIENCE,
  CHANGE_SKILLS , ADD_EDUCATION , ADD_EXPERIENCE   , DELETE_EDUCATION ,DELETE_EXPERIENCE} from "../constants/action-types";
const initialState = {
    fname : null,
    lname : null,
    email : null,
    phone : null,
    dob : null,
    skills : null,
    careerObjective : null,
    profilePicURL : null,
    education :[],
    experience : [],
};

function studentProfileReducer(state = initialState, action) {
    if(action.type === GET_STUDENT_DATA){
        console.log(action.payload);
        return Object.assign({}, state, action.payload);
    }
    else if(action.type === CHANGE_NAME){
      console.log(action.payload);
      return Object.assign({}, state, {
          fname: action.payload.fname,
          lname: action.payload.lname
      });
    }

    else if(action.type === CHANGE_PROFILE_PIC){
      console.log(action.payload);
      return Object.assign({}, state, {
          profilePicURL: action.payload
      });
    }
    else if(action.type === CHANGE_OBJECTIVE){
      console.log(action.payload);
      return Object.assign({}, state, {
        careerObjective: action.payload.careerObjective,
      });
    }
    else if(action.type === CHANGE_CONTACT_INFORMATION){
      console.log(action.payload);
      return Object.assign({}, state, {
          email: action.payload.email,
          phone: action.payload.phone
      });
    }
    else if(action.type === CHANGE_EDUCATION){
      console.log(action.payload);
      var foundIndex = state.education.findIndex(x => x._id === action.payload._id);
      state.education[foundIndex] = action.payload;
    }
    else if(action.type === CHANGE_EXPERIENCE){
      console.log(action.payload);
      var foundIndex = state.experience.findIndex(x => x._id === action.payload._id);
      state.experience[foundIndex] = action.payload;
    }
    else if(action.type === CHANGE_SKILLS){
      console.log(action.payload);
      return Object.assign({}, state, {
          skills: action.payload.skills
      });
    }

    else if(action.type === ADD_EDUCATION){
      console.log(action.payload);
      return Object.assign({}, state, {
          education : state.education.concat(action.payload)
      });
    }
    else if(action.type === DELETE_EDUCATION){
      console.log(action.payload);
      return Object.assign({}, state, {
          education : state.education.filter((education) => {
            return (education._id !== action.payload.educationId)
          }
      )
      });
    }
    else if(action.type === ADD_EXPERIENCE){
      console.log(action.payload);
      return Object.assign({}, state, {
        experience : state.experience.concat(action.payload)
      });
    }
    else if(action.type === DELETE_EXPERIENCE){
      console.log(action.payload);
      return Object.assign({}, state, {
        experience : state.experience.filter((experience) => {
            return (experience._id !== action.payload.experienceId)
          }
      )
      });
    }
    return state;
  }
  
export default studentProfileReducer;