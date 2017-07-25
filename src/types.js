/* @flow */

export interface ID {
	toString(): string;
}

export type EntitiesById = { [id: ID]: any };

export type Action = { type: $Subtype<string> };
