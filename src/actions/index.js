/* @flow */

import type {
	Dispatch,
	ReduxEntityAction
} from "./types";

import type { EntitiesById } from "../reducer/types";

type FetchOptions = {
	shouldMerge?: boolean
};

export function fetchEntity(name: string, promise: Promise<EntitiesById>, options?: FetchOptions) {
	return async (dispatch: Dispatch, getState: () => any) => {
		dispatch(fetchEntityAction(name));
		try {
			let data = await promise;
			if (options && options.shouldMerge) {
				const state = getState();
				const oldData = selectEntity(name, state).byId;
				if (typeof options.mergeEntities === "function") {
					data = options.mergeEntities(oldData, data);
				} else {
					data = { ...oldData, ...data };
				}
			}
			const shouldMerge = options !== undefined && options !== null && options.shouldMerge === true;
			dispatch({
				type: "@@redux-entity-helpers/ENTITY_FETCHED",
				payload: data,
				meta: {
					entityName: name,
					shouldMerge
				}
			});
		} catch (error) {
			dispatch({
				type: "@@redux-entity-helpers/ENTITY_FETCHED",
				error: true,
				payload: error,
				meta: {
					entityName: name
				}
			});
		}
	};
}

function fetchEntityAction(name: string): ReduxEntityAction {
	return {
		type: "@@redux-entity-helpers/FETCH_ENTITY",
		meta: {
			entityName: name
		}
	};
}

function selectEntity(name: string, state: any): any {
	return state.entities[name];
}
