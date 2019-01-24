import { createAction } from '../utils'
import { MOVIE } from './types'

export const movie = {
  savePersonalInfo: payload => createAction(MOVIE.PERSONAL_INFO,
    payload),
  getMovies: payload => createAction(MOVIE.GET_POPULAR_MOVIES, payload),
  getMoviesSuccess: payload => createAction(MOVIE.GET_POPULAR_MOVIES_SUCCESS, payload),
  getSearchKeyword: payload => createAction(MOVIE.GET_SEARCH_KEYWORD, payload),
  getSearchKeywordSuccess: payload => createAction(MOVIE.GET_SEARCH_KEYWORD_SUCCESS, payload),
  failure: payload => createAction(MOVIE.FAILURE, payload),
}
export default movie
