import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ParticipantReducer from "./Redux/participantReducer";
import thunk from "redux-thunk";
const reducers = combineReducers({
     participant: ParticipantReducer,
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
