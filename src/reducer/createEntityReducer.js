/* @flow */

import type {
	Action,
	FetchEntityAction,
	EntityFetchedAction
} from "../actions/types";
import type { EntitiesById } from "./types";

export type EntityState = {
	allIds: Array<string>,
	byId: EntitiesById,
	isFetching: boolean
};

export type ReducerOptions = {
	mergeEntities?: (oldEntities: EntitiesById, fetchedEntities: EntitiesById) => EntitiesById
};

export default function createEntityReducer(name: string, options?: ReducerOptions) {
	const initialState = {
		allIds: [],
		byId: {},
		isFetching: false
	};

	const reducer = (state: EntityState = initialState, action: Action): EntityState => {
		switch (action.type) {
			case "FETCH_ENTITY":
				return handleFetchEntity(state, action);
			case "ENTITY_FETCHED":
				return handleEntityFetched(state, action);
			default:
				return state;
		}
	};

	function handleFetchEntity(state: EntityState, action: FetchEntityAction): EntityState {
		if (action.meta.entityName === name) {
			return {
				...state,
				isFetching: true
			};
		}
		return state;
	}

	function handleEntityFetched(state: EntityState, action: EntityFetchedAction): EntityState {
		if (action.meta.entityName === name) {
			if (action.error) {
				return {
					...state,
					isFetching: false
				};
			}
			const entitiesById = mergeEntities(state.byId, action.payload);
			return {
				...state,
				isFetching: false,
				byId: entitiesById,
				allIds: Object.keys(entitiesById)
			};
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
