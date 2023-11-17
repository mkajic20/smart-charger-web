import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SearchBar,
  SearchBarIcon,
  Search as SearchWrapper,
} from "./SearchStyles";
import SearchIcon from "../../assets/search-icon.png";
import SearchCancelIcon from "../../assets/search-cancel.png";

const Search = ({ onChange, placeholder, search, showCancel }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  const handleSearch = () => {
    search && search(inputValue);
  };

  const handleCancel = () => {
    setInputValue("");
  };

  return (
    <>
      <SearchWrapper>
        <SearchBar
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        {showCancel ? (
          <SearchBarIcon src={SearchCancelIcon} onClick={handleCancel} />
        ) : (
          <SearchBarIcon src={SearchIcon} onClick={handleSearch} />
        )}
      </SearchWrapper>
    </>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  search: PropTypes.func,
};

export default Search;
