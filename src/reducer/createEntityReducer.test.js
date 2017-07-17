import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import createEntityReducer from "./createEntityReducer.js";

describe("test createEntityReducer helper", () => {
	const productReducer = createEntityReducer("products");
	const fetchEntityAction = {
		type: "FETCH_ENTITY",
		meta: {
			entityName: "products"
		}
	};
	const initAction = { type: "@@redux/INIT" };
	test("it returns a function", () => {
		expect(typeof productReducer).toBe("function");
	});

	test("initial state", () => {
		expect(productReducer(undefined, fetchEntityAction)).toEqual({
			allIds: [],
			byId: {},
			isFetching: true
		});
	});

	test("initial state", () => {
		expect(productReducer(undefined, initAction)).toEqual({
			allIds: [],
			byId: {},
			isFetching: false
		});
	});

	test("store initial state", () => {
		const store = configureStore(productReducer, undefined);
		expect(store.getState()).toEqual({
			allIds: [],
			byId: {},
			isFetching: false
		});
	});

	test("store with partial initial state", () => {
		// const mockReducer = jest.fn(productReducer);
		const reducers = combineReducers({
			products: productReducer
		});
		const store = configureStore(
			reducers,
			{},
			compose(applyMiddleware(thunkMiddleware))
		);
		expect(store.getState()).toEqual({
			products: {
				allIds: [],
				byId: {},
				isFetching: false
			}
		});
	});
});

function configureStore(rootReducer, initialState) {
	return createStore(rootReducer, initialState, compose(
		applyMiddleware(thunkMiddleware)
	));
}
