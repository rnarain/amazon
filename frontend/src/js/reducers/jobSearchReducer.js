import { UPDATE_FILTERED_JOBS , JOB_SEARCH_PAGINATION ,JOB_SEARCH_SORT} from '../constants/action-types';
import {paginate, pages} from '../../helperFunctions/paginate'
import {dynamicSort} from '../../helperFunctions/dynamicSort'

  const initialState = {
      jobs : [{
        companyID : null,
        companyName : null,
        location : null,
        postedDate : null,
        deadLineDate :null ,
        salary : null,
        description : null,
        category : null,
        title : null,
        jobApplicants : [ 
            {
                studentID : null,
                studentName : null,
                status : null,
                applicationDate :null ,
                resumeURL : null
            }
        ]
    }],
    filteredJobs:[],
  };
  
  function jobSearchReducer(state = initialState, action) {
      if(action.type === UPDATE_FILTERED_JOBS){
        return Object.assign({}, state, 
            {
                ...action.payload,
                filteredJobs: paginate(action.payload.jobs, 1 , 10),
                pages : pages(action.payload.jobs, 10)
                        }
        );
      }
      else if(action.type === JOB_SEARCH_PAGINATION){
        console.log(action.payload);
        return Object.assign({}, state, {
            filteredJobs: paginate(state.jobs,action.payload,10)
        });
     }
     else if(action.type === JOB_SEARCH_SORT){
      console.log(action.payload);
      return Object.assign({}, state, {
          filteredJobs: state.jobs.sort(dynamicSort(action.payload.sortField ,action.payload.sortOrder ))
      });
   }
      return state;
    }
    
  export default jobSearchReducer;