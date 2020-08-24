import { combineReducers } from "redux";

import { reducer as offline } from "redux-offline-queue";
import { reducer as repositories } from "./repositories";
import reducers from '../../redux/reducers'
export default combineReducers({
    offline,
    repositories,
    reducers
});
