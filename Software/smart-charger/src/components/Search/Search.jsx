import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  SearchBar,
  SearchBarIcon,
  Search as SearchWrapper,
} from './SearchStyles'
import SearchIcon from '../../assets/search-icon.png'
import SearchCancelIcon from '../../assets/search-cancel.png'

const Search = ({ placeholder, search, showCancel, onCancel }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSearch = () => {
    if (inputValue.trim().length > 0) {
      search(inputValue.trim())
    }
  }

  const handleCancel = () => {
    onCancel()
    setInputValue('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }

    if (e.key === 'Escape') {
      onCancel()
      setInputValue('')
    }
  }

  return (
    <>
      <SearchWrapper>
        <SearchBar
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        {showCancel ? (
          <SearchBarIcon
            src={SearchCancelIcon}
            onClick={handleCancel}
            alt="Cancel icon"
          />
        ) : (
          <SearchBarIcon
            src={SearchIcon}
            onClick={handleSearch}
            alt="Search icon"
          />
        )}
      </SearchWrapper>
    </>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string,
  search: PropTypes.func,
  showCancel: PropTypes.bool,
  onCancel: PropTypes.func,
}

export default Search
