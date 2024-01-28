import React from 'react'
import PropTypes from 'prop-types'
import {
  PaginationButton,
  PaginationPage,
  PaginationSelect,
  PaginationSelectOption,
  Pagination as PaginationWrapper,
} from './PaginationStyles'

const Pagination = ({
  firstCall,
  prevCall,
  currentPage,
  pages,
  nextCall,
  lastCall,
  withSelect,
  onSelectChange,
}) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    onSelectChange(selectedValue)
  }

  return (
    <>
      <PaginationWrapper>
        <PaginationButton onClick={firstCall}>&lt;&lt;&lt;</PaginationButton>
        <PaginationButton onClick={prevCall}>&lt;</PaginationButton>
        <PaginationPage>
          {currentPage}/{pages}
        </PaginationPage>
        <PaginationButton onClick={nextCall}>&gt;</PaginationButton>
        <PaginationButton onClick={lastCall}>&gt;&gt;&gt;</PaginationButton>
        {withSelect && (
          <PaginationSelect onChange={handleSelectChange}>
            <PaginationSelectOption>10</PaginationSelectOption>
            <PaginationSelectOption>25</PaginationSelectOption>
            <PaginationSelectOption>50</PaginationSelectOption>
            <PaginationSelectOption>75</PaginationSelectOption>
            <PaginationSelectOption>100</PaginationSelectOption>
          </PaginationSelect>
        )}
      </PaginationWrapper>
    </>
  )
}

Pagination.propTypes = {
  firstCall: PropTypes.func,
  prevCall: PropTypes.func,
  currentPage: PropTypes.number,
  pages: PropTypes.number,
  nextCall: PropTypes.func,
  lastCall: PropTypes.func,
  withSelect: PropTypes.bool,
  onSelectChange: PropTypes.func,
}

export default Pagination
