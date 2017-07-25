/* @flow */

import type { Action, EntitiesById, ID } from "types";
import type { FetchEntityAction, EntityFetchedAction } from "actions/fetchEntity";

export type EntityState = {
	allIds: Array<string>,
	byId: EntitiesById,
	fetchingIds: Array<ID>,
	requests: Array<string>
};

export type ReducerOptions = {
	mergeEntities?: (oldEntities: EntitiesById, fetchedEntities: EntitiesById) => EntitiesById
};

export default function createEntityReducer(name: string, options?: ReducerOptions) {
	const initialState = {
		allIds: [],
		byId: {},
		fetchingIds: [],
		requests: []
	};

	const reducer = (state: EntityState = initialState, action: Action): EntityState => {
		switch (action.type) {
			case "@@redux-entity-helpers/FETCH_ENTITY":
				return handleFetchEntity(state, action);
			case "@@redux-entity-helpers/ENTITY_FETCHED":
				return handleEntityFetched(state, action);
			default:
				return state;
		}
	};

	function handleFetchEntity(state: EntityState, action: FetchEntityAction): EntityState {
		const { meta, payload } = action;
		if (meta.entityName === name) {
			const newState = {
				...state,
				requests: [...state.requests, meta.requestId]
			};
			if (Array.isArray(payload.ids) && payload.ids.length > 0) {
				newState.fetchingIds = [...newState.fetchingIds, ...payload.ids];
			}
			return newState;
		}
		return state;
	}

	function handleEntityFetched(state: EntityState, action: EntityFetchedAction): EntityState {
		const { meta, payload } = action;
		if (meta.entityName === name) {
			const newState = { ...state };
			newState.requests = newState.requests.filter(request => request !== meta.requestId);
			newState.byId = mergeEntities(state.byId, payload);
			newState.allIds = Object.keys(newState.byId);
			const receivedIds = Object.keys(payload);
			newState.fetchingIds = newState.fetchingIds.filter(id => !receivedIds.includes(id));
			return newState;
		}
		return state;
	}

	function mergeEntities(oldEntities: EntitiesById, newEntities: EntitiesById) {
		if (options && typeof options.mergeEntities === "function") {
			return options.mergeEntities(oldEntities, newEntities);
		}
		return { ...oldEntities, ...newEntities };
	}

	return reducer;
}
