# 5.2.2 - Structure

---

- Redux is a global store for your state
- Even very large apps -> one big global-state object

---

When Redux was released, people were skeptical about this.

---

Redux makes this practical by letting you "combine reducers".

---

# Example state

```js
const state = {
  user: {
    name: 'Bugs Bunny',
    species: 'Wabbit',
  },
  orders: [
    {
      date: '01/02/03',
      items: ['carrot', 'carrot', 'carrot', 'ACME powder'],
    },
  ],
};
```

This state kinda looks like 2 mini states, right?

---

What if we wrote two reducers?

```js
function userReducer(state, action) {
  switch (action.type) {
    case 'LOG_IN': {
      return {
        name: action.name,
        species: action.species,
      };
    }

    default:
      return state;
  }
}

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART': {
      return {
        ...state,
        items: [...state.items, action.itemName],
      };
    }

    default:
      return state;
  }
}
```

---

Redux encourages this workflow by letting you **combine reducers**:

```js
import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import orderReducer from './order-reducer';

export default combineReducers({
  user: userReducer,
  order: orderReducer,
});
```

---

The `keys` that you pass to `combineReducers` become a branch of the state.

---

# Exercises

Determine the initial state

---

```js
function colorReducer(state) {
  return 'red';
}

function numberReducer(state) {
  return 4;
}

export default combineReducers({
  color: colorReducer,
  number: numberReducer,
});

// What is the initial state?
{
  color: 'red',
  number: 4,
}
{

}
```

---

```js
function itemReducer(state) {
  return { hi: 5 };
}

function locationReducer(state) {
  return 'montreal';
}

export default combineReducers({
  item: itemReducer,
  location: locationReducer,
});

// What is the initial state?
{
  item: {hi: 5},
  location: 'montreal',
}
```

---

```js
function petReducer(state) {
  return 'cat';
}

function furnitureReducer(state) {
  return 'couch';
}

export default combineReducers({
  pet: petReducer,
  household: furnitureReducer,
});

// What is the initial state?
{
  pet: 'cat',
  household: 'couch',
  bacon: true,
}
```

---

```js
function modalReducer(state) {
  return null;
}

function tooltipReducer(state) {
  return null;
}

function uiReducer(state) {
  return combineReducers({
    modal: modalReducer,
    tooltip: tooltipReducer,
  });
}

function dataReducer(state) {
  return { entries: [] };
}

export default combineReducers({
  data: dataReducer,
  ui: uiReducer,
});

// What is the initial state?
{
  data: {
    {entries: []}
  }
  ui: {
    modal: null,
    tooltip: null,
  }
}
```

---

## How it works

When you dispatch an action, it calls _all_ of your reducers.

If that action doesn't match, it returns the current state. No problem.

---

```js
function userReducer(state, action) {
  switch (action.type) {
    case 'LOG_IN': {
      return {
        name: action.name,
        species: action.species,
      };
    }

    default:
      return state;
  }
}

// When `LOG_IN` is dispatched, it produces a new state.
// When `ADD_ITEM_TO_CART` is dispatched, it falls to the "default" case.
```

---

By splitting our code into reducers, we keep the code simple.

---

With practice, you'll learn how best to organize your Redux state.
