/* @flow */

import type { EntitiesById, ID } from "types";
import type { Dispatch } from "actions/types";

let idCount = 0;

export type FetchEntityAction = {|
	type: "@@redux-entity-helpers/FETCH_ENTITY",
	payload: {
		ids?: Array<ID>
	},
	meta: {
		entityName: string,
		requestId: string
	}
|};

export type EntityFetchedAction = {|
	type: "@@redux-entity-helpers/ENTITY_FETCHED",
	payload: EntitiesById,
	meta: {
		entityName: string,
		shouldMerge: boolean,
		requestId: string
	}
|} | {|
	type: "@@redux-entity-helpers/ENTITY_FETCHED",
	error: true,
	payload: Error,
	meta: {
		entityName: string,
		requestId: string
	}
|};

type FetchOptions = {
	ids?: Array<ID>,
	shouldMerge?: boolean
};

export default function fetchEntity(name: string, promise: Promise<EntitiesById>, options?: FetchOptions) {
	return async (dispatch: Dispatch, getState: () => any) => {
		const requestId = `${++idCount}`;
		dispatch(fetchEntityAction(name, requestId, options));
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
					shouldMerge,
					requestId
				}
			});
		} catch (error) {
			dispatch({
				type: "@@redux-entity-helpers/ENTITY_FETCHED",
				error: true,
				payload: error,
				meta: {
					entityName: name,
					requestId
				}
			});
		}
	};
}

function fetchEntityAction(name: string, requestId: string, options?: FetchOptions): FetchEntityAction {
	const payload = {};
	if (options && Array.isArray(options.ids)) {
		payload.ids = options.ids;
	}
	return {
		type: "@@redux-entity-helpers/FETCH_ENTITY",
		payload,
		meta: {
			entityName: name,
			requestId
		}
	};
}

function selectEntity(name: string, state: any): any {
	return state.entities[name];
}
