import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import createEntityReducer from "./createEntityReducer.js";

describe("test createEntityReducer helper", () => {
	const productReducer = createEntityReducer("products");

	test("store initial state", () => {
		const store = configureStore(productReducer, undefined);
		expect(store.getState()).toEqual({
			allIds: [],
			byId: {},
			fetchingIds: [],
			requests: []
		});
	});

	test("store with partial initial state", () => {
		const reducers = combineReducers({ products: productReducer });
		const store = configureStore(reducers, {}, compose(applyMiddleware(thunkMiddleware)));
		expect(store.getState()).toEqual({
			products: {
				allIds: [],
				byId: {},
				fetchingIds: [],
				requests: []
			}
		});
	});

	test("fetch entity", () => {
		const reducers = combineReducers({ products: productReducer });
		const store = configureStore(reducers, {}, compose(applyMiddleware(thunkMiddleware)));
		store.dispatch({
			type: "@@redux-entity-helpers/FETCH_ENTITY",
			payload: {
				ids: ["1", "2"]
			},
			meta: {
				entityName: "products",
				requestId: "1"
			}
		});
		expect(store.getState()).toEqual({
			products: {
				allIds: [],
				byId: {},
				fetchingIds: ["1", "2"],
				requests: ["1"]
			}
		});
		store.dispatch({
			type: "@@redux-entity-helpers/ENTITY_FETCHED",
			payload: {
				1: "hello",
				2: "bye"
			},
			meta: {
				entityName: "products",
				requestId: "1"
			}
		});
		expect(store.getState()).toEqual({
			products: {
				allIds: ["1", "2"],
				byId: {
					1: "hello",
					2: "bye"
				},
				fetchingIds: [],
				requests: []
			}
		});
	});
});

function configureStore(rootReducer, initialState) {
	return createStore(rootReducer, initialState, compose(
		applyMiddleware(thunkMiddleware)
	));
}
