import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'
import { connect } from 'react-redux'
import { movie } from '../../actions'

const MovieItem = props => {
  const { movie } = props

  return (
    <div className="movie-list__item__link">
      <div className="movie-list__item__poster">
        <div className={`movie-list__item__rating movie-list__item__rating--${Math.round(movie.likes/10)*10}`}>
          { movie.likes }
        </div>
        {
          movie.urls !== null &&
          <img src={movie.urls.regular} alt={movie.description} className="movie-list__item__poster__image" />
        }
      </div>
      <h3 className="movie-list__item__title">{ movie.description }</h3>
      <p className="movie-list__item__year">{ moment(movie.created_at).format('YYYY-MM-DD') }</p>
    </div>
  )
}

MovieItem.propTypes = {
  movie: PropTypes.object,
}

MovieItem.defaultProps = {
  movie: {},
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)
