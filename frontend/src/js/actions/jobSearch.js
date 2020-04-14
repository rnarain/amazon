import { UPDATE_FILTERED_JOBS ,JOB_SEARCH_PAGINATION  ,JOB_SEARCH_SORT} from "../constants/action-types";
    
    export function updateFilteredJobs(payload) {
      console.log("dispatching the updateFilteredJobs action")
      return { type: UPDATE_FILTERED_JOBS, payload };
    }

    export function jobSearchPaginatinon(payload) {
      console.log("dispatching the pagination action")
      return { type: JOB_SEARCH_PAGINATION, payload };
    }

    export function jobSearchSort(payload) {
      console.log("dispatching the sort action")
      return { type: JOB_SEARCH_SORT, payload };
    }

   

    