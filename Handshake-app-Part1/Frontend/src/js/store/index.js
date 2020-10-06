import { createStore} from "redux";
import finalReducers from "../reducers";

const store = createStore(
    finalReducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
export default store;