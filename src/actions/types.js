/* @flow */

import type { FetchEntityAction, EntityFetchedAction } from "./fetchEntity";

export type ReduxEntityAction =
	| FetchEntityAction
	| EntityFetchedAction
	;

export type ThunkAction = (dispatch: Dispatch, getState: () => any) => any;
export type Dispatch = (action: ReduxEntityAction | ThunkAction | Array<ReduxEntityAction> | PromiseAction) => any;
export type PromiseAction = Promise<ReduxEntityAction>;
