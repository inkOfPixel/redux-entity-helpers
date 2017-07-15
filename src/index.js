/* @flow */

import { fetchEntity } from "./actions";
import { createEntityReducer } from "./reducer";

export default {
	createEntityReducer,
	fetchEntity
};

export { createEntityReducer } from "./reducer";
export { fetchEntity } from "./actions";
