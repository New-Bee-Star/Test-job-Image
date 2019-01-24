import { fromJS } from 'immutable'
import { MOVIE } from '../actions/types'

const initialState = fromJS({
  personalData: [],
  movieData: {},
  searchData: {
    page: 0,
    person: {}
  },
  movie: {},
})

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIE.GET_POPULAR_MOVIES_SUCCESS:
      return state.merge({
        movieData: action.payload,
      })
    case MOVIE.GET_SEARCH_KEYWORD_SUCCESS:
      return state.merge({
        searchData: action.payload,
      })
    default:
      return state
  }
}
