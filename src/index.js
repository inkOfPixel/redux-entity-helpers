/* @flow */

import { fetchEntity } from "./actions";
import createEntityReducer from "./reducer/createEntityReducer";

export default {
	createEntityReducer,
	fetchEntity
};

export { default as createEntityReducer } from "./reducer/createEntityReducer";
export { fetchEntity } from "./actions";
