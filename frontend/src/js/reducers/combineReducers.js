import { combineReducers } from 'redux';
import  studentProfileReducer  from './studentProfileReducer';
import  jobSearchReducer  from './jobSearchReducer';


export default combineReducers({
    studentProfileReducer,
    jobSearchReducer
});