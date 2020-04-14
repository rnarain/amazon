import {GET_STUDENT_DATA, CHANGE_NAME , CHANGE_PROFILE_PIC,CHANGE_OBJECTIVE ,CHANGE_CONTACT_INFORMATION ,CHANGE_EDUCATION,CHANGE_EXPERIENCE,
  CHANGE_SKILLS , DELETE_EXPERIENCE , DELETE_EDUCATION } from "../constants/action-types";
import axios from 'axios';
import backendServer from '../../webConfig'


export  function handshakeMiddleWare({ dispatch }) {
  return function(next) {
    return async function(action) {
      console.log("in middleware")
        if (action.type === GET_STUDENT_DATA) {
        console.log(action.payload);
        console.log("in middleware of get data")
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.get(`${backendServer}/api/student/getStudentDetails/` +action.payload)
        .then(response => {
                    console.log(response);
                    action.payload = response.data.data[0];  
                } 
        ).catch( ex =>{
            console.log(ex);
        });
       }

       else if (action.type === CHANGE_NAME) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.post(`${backendServer}/api/student/updateStudentName`, action.payload)
            .then(response => {
                  let data={
                      fname:action.payload.fname,
                      lname : action.payload.lname
                    }
                      action.payload = data;  
                }
            ).catch( ex =>{
                console.log(ex);
            });
       }

       else if (action.type === CHANGE_PROFILE_PIC) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.post(`${backendServer}/api/student/updateStudentProfilePic/${localStorage.getItem('id')}` ,action.payload)
            .then(response => {
                    action.payload = response.data.data;  
                }
            ).catch( ex =>{
                console.log(ex);
            });
       }

       else if (action.type === CHANGE_OBJECTIVE) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.post(`${backendServer}/api/student/updateStudentObjective`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
       }

       else if (action.type === CHANGE_CONTACT_INFORMATION) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.post(`${backendServer}/api/student/updateContactInformation`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
       }

       else if (action.type === CHANGE_EDUCATION) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        if(action.payload.educationId!==null){
            console.log(action.payload.educationId)
            await axios.post(`${backendServer}/api/student/updateEducation`, action.payload)
            .then(response => {
                console.log(response)
                }
            ).catch( ex =>{
                console.log(ex);

            });
        }
        else{
            await axios.post(`${backendServer}/api/student/addEducation`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
        }
        }
        

       else if (action.type === CHANGE_EXPERIENCE) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        if(action.payload.experienceId!==null){
            console.log(action.payload.experienceId)
            await axios.post(`${backendServer}/api/student/updateExperience`, action.payload)
            .then(response => {
                console.log(response)
                }
            ).catch( ex =>{
                console.log(ex);

            });
        }
        else{
            await axios.post(`${backendServer}/api/student/addExperience`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
        }
        }
       else if (action.type === CHANGE_SKILLS) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.post(`${backendServer}/api/student/updateStudentSkills`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
       }
       else if (action.type === CHANGE_CONTACT_INFORMATION) {
        console.log(action.payload);
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.post(`${backendServer}/api/student/updateContactInformation`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
       }

       else if (action.type === DELETE_EDUCATION) {
        console.log(action.payload);
        if(action.payload.educationId!==null){
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            await axios.post(`${backendServer}/api/student/deleteEducation`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
        }
       }

       else if (action.type === DELETE_EXPERIENCE) {
        console.log(action.payload);
        if(action.payload.experienceId!==null){
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            await axios.post(`${backendServer}/api/student/deleteExperience`, action.payload)
            .then(response => {
                 //update store
                }
            ).catch( ex =>{
                console.log(ex);
            });
        }
       }
       
      return next(action);
    };
  };
}