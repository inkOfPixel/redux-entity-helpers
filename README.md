# Redux Entity Helpers

Entity helpers for Redux

[![npm](https://img.shields.io/npm/v/redux-entity-helpers.svg?style=flat-square)](https://www.npmjs.com/package/redux-entity-helpers)

:construction: This project is still in its early stages, you should expect things to break :construction:


### Table of Contents
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Usage](#usage)
* [Documentation](#documentation)

# Getting Started

## Installation

```bash
$ yarn add redux-entity-helpers
```
or
```bash
$ npm install --save redux-entity-helpers
```

You also need to install [Redux Thunk](https://github.com/gaearon/redux-thunk).

## Usage

:construction:

# Documentation

## Introduction

### Redux Entity State Shape

```javascript
{
	allIds: Array<string>,
	byId: EntitiesById,
	isFetching: boolean
};
```

### `EntitiesById`

Is a dictionary of entity organized by their id. The id must have a method `toString()`.

## API

:construction:

### Reducer Helpers

#### `createEntityReducer(name, [options])`

Creates the reducer that handles actions of an entity

##### `name: string`
The name of the entity (e.g. `products`)

##### `options: ReducerOptions`
- `mergeEntities`: an optional function that handles merging of entities (Defaults to simple Object merging with spread operator).

### Actions Helpers

#### `fetchEntity(name, promise, [options])`

Enables fetching entities

##### `name: string`
The name of the entity (e.g. `products`)

##### `promise: Promise<EntitiesById>`
A promise that should resolve to an `EntitiesById` object.

##### `options`
- `shouldMerge`: a `boolean` value that tell whether or not the fetched entities should be merged with existing entities (defaults to `false`)
- `ids`: an `Array<ID>` to be used when fetching entity with known ids.
