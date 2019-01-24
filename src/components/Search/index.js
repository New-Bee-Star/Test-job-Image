import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'

import './Search.scss'

import { connect } from 'react-redux'
import { movie } from '../../actions'

import BottomScrollListener from 'react-bottom-scroll-listener'
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.searchItems = this.searchItems.bind(this)
    this.clearOption = this.clearOption.bind(this)
    this.trackScrolling = this.trackScrolling.bind(this)
  }

  clearOption(id) {
    const { savePersonalInfo, searchData } = this.props;
    let filterValue = searchData.results.filter(e => e.id === id);
    savePersonalInfo(filterValue);
  }

  searchItems(event) {
    const { getSearchKeyword, searchData } = this.props
    const currentValue = event.target.value
    this.setState({ value: currentValue })
      getSearchKeyword({keyword: currentValue, page: 0})
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling () {
    const { getSearchKeyword, searchData } = this.props

    getSearchKeyword({keyword: this.state.value, page: searchData.page + 1, results: searchData.results})

  };
  render() {
    const { searchData } = this.props
    const { value } = this.state

    return (
      <div className="search">
        <input className="search__field" type="text" value={value} onChange={this.searchItems} placeholder="Search with keywords" />
          <BottomScrollListener onBottom={this.trackScrolling}>
          {
            scrollRef => (
              <ul ref={scrollRef} className="search__list" id="search-list">
                  {searchData.results && Object.keys(searchData.results).length > 0 && searchData.results.map((ele, index) => (
                    <li key={`${ele.id.toString()}__${index}`} className="search__list__item">
                      <div className="search__list__item__link" onClick={e => this.clearOption(ele.id)}>
                        <img src={ele.profile_image.medium} alt="Image" className="search__list__item__image" />
                        <h4 className="search__list__item__title">{ ele.name }</h4>
                        <p className="search__list__item__year">{ moment(ele.updated_at).format('YYYY-MM-DD') }</p>
                      </div>
                    </li>
                  ))}
                </ul>

            )
          }
          </BottomScrollListener>
      </div>
    )
  }
}

Search.propTypes = {
  getSearchKeyword: PropTypes.func.isRequired,
  searchData: PropTypes.object,
}

Search.defaultProps = {
  searchData: {},
}
const mapStateToProps = state => ({
  searchData: state.get('movieData').toJS().searchData,
})

const mapDispatchToProps = {
  getSearchKeyword: movie.getSearchKeyword,
  savePersonalInfo: movie.savePersonalInfo

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
