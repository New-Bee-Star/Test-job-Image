import {
  put, call, takeLatest, all,
} from 'redux-saga/effects'
import axios from 'axios'

import Unsplash, {toJson} from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "09186ac0f67f90b7afc3e5cbe35d57076723180416986ef12c0dbef3b37cce59",
  secret: "869cea2efdd09c2b7d89aab5fa2db2fc1d1faff2b89038dbb20ef4a792b55789",
  callbackUrl: "localhost:3000"
});

import { MOVIE } from '../actions/types'

import { movie } from '../actions'
import { Remote } from '../utils'

function* getPersonalData(action) {
  try {
    let result = [];
    const response = yield unsplash.users.photos(action.payload[0].username, 1, 100).then(toJson)

    yield put(movie.getMoviesSuccess({ ...response }))

  } catch (e) {
    yield put(movie.failure({ error: { ...e } }))
  }
}

function* getMovies(action) {
  if (action.payload === '') { yield put(movie.getMoviesSuccess({ })) } else {
    try {
      const response = yield unsplash.photos.getRandomPhoto({count: 20}).then(toJson);

      yield put(movie.getMoviesSuccess({ ...response }))
    } catch (e) {
      yield put(movie.failure({ error: { ...e } }))
    }
  }
}

function* getSearchKeyword(action) {
  if (action.payload !== '') {
    try {

      const response = yield unsplash.search.users(action.payload.keyword, action.payload.page, 30).then(toJson);
      let result = response.results;
      if (action.payload.results)
      {
        result = result.concat(action.payload.results);
      }
      yield put(movie.getSearchKeywordSuccess({ ...response, results: result, page: action.payload.page }))
    } catch (e) {
      yield put(movie.failure({ error: { ...e } }))
    }
  } else {
    yield put(movie.getSearchKeywordSuccess({}))
  }
}

function* watchExampleSagas() {
  yield all([
    takeLatest(MOVIE.GET_POPULAR_MOVIES, getMovies),
    takeLatest(MOVIE.GET_SEARCH_KEYWORD, getSearchKeyword),
    takeLatest(MOVIE.PERSONAL_INFO, getPersonalData)
  ])
}

export default watchExampleSagas
