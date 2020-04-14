import { createStore, applyMiddleware, compose } from "redux";
import combineReducers from "../reducers/combineReducers";
import { handshakeMiddleWare } from "../middleware/index";

// const store = createStore(rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      combineReducers,
      storeEnhancers(applyMiddleware(handshakeMiddleWare))
    );
    
    

    export default store;