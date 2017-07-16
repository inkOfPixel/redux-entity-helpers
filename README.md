# Redux Entity Helpers

Entity helpers for Redux

:construction: This project is still in its early stages, you should expect things to break :construction:

```bash
$ yarn add redux-entity-helpers
```
or
```bash
$ npm install --save redux-entity-helpers
```

You also need to install [Redux Thunk](https://github.com/gaearon/redux-thunk).

## Redux Entity State Shape

```js
{
	allIds: Array<string>,
	byId: EntitiesById,
	isFetching: boolean
};
```

### `EntitiesById`

Is a dictionary of entity organized by their id.

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
