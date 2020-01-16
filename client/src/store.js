import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ParticipantReducer from "./Redux/participantReducer";
import thunk from "redux-thunk";
import adminReducer from "./Redux/adminReducer";
import userReducer from "./Redux/userReducer";
import ConferenceReducer from "./Redux/conferenceReducer";
const reducers = combineReducers({
     participant: ParticipantReducer,
     admin: adminReducer,
     user: userReducer,
    config: ConferenceReducer
});


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
const store = createStore(reducers, enhancer);



export default store;
