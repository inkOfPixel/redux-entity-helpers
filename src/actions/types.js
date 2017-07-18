/* @flow */

import type { EntitiesById } from "../reducer/types";

export type Action = { type: $Subtype<string> };
export type ReduxEntityAction =
	| FetchEntityAction
	| EntityFetchedAction
	;

export type ThunkAction = (dispatch: Dispatch, getState: () => any) => any;
export type Dispatch = (action: ReduxEntityAction | ThunkAction | Array<ReduxEntityAction> | PromiseAction) => any;
export type PromiseAction = Promise<ReduxEntityAction>;

export type FetchEntityAction = {|
	type: "@@redux-entity-helpers/FETCH_ENTITY",
	meta: {
		entityName: string
	}
|};

export type EntityFetchedAction = {|
	type: "@@redux-entity-helpers/ENTITY_FETCHED",
	payload: EntitiesById,
	meta: {
		entityName: string,
		shouldMerge: boolean
	}
|} | {|
	type: "@@redux-entity-helpers/ENTITY_FETCHED",
	error: true,
	payload: Error,
	meta: {
		entityName: string
	}
|};
