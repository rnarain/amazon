import { ADD_BOOK , SIGN_IN , GET_STUDENT_DATA, CHANGE_NAME , SIGN_UP} from "../constants/action-types";
export function addBook(payload) {
  console.log("dispatching the action")
  return { type: ADD_BOOK, payload };
}

export function signin(payload) {
  console.log("dispatching the action")
  return { type: SIGN_IN, payload };
}

export function signup(payload) {
  console.log("dispatching the action")
  return { type: SIGN_UP, payload };
}
export function getStudentData(payload) {
  console.log("dispatching the getStudentData action")
  return { type: GET_STUDENT_DATA, payload };
}

export function changename(payload) {
  console.log("dispatching the change name action")
  return { type: CHANGE_NAME, payload };
}