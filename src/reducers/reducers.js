import { combineReducers } from 'redux';

import { SET_FILTER, SET_SORT_COLUMN, SET_MOVIES, SET_USER, SET_FAVORITES } from '../actions/actions';

function visibilityFilter( state = '', action){
  switch (action.type){
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function sortColumn(state = 'title', action){
  switch (action.type){
    case SET_SORT_COLUMN:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action){
  switch (action.type){
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function profile(state = [], action){
  switch (action.type){
    case SET_USER:
      return action.value;
    default:
    return state;
  }
}

function favorites(state = [], action){
  switch (action.type){
    case SET_FAVORITES:
      return action.value;
    default:
    return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  sortColumn,
  movies,
  profile,
  favorites
})

export default moviesApp;
