/**
 Created by Gray
 using WebStorm at
 15:48 on 08-Mar-20
 */
import React, { useEffect, useState } from 'react';
import { Pagination as BPagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from 'prop-types';

export const ModelPagination = ({totalRows, perPage, onPageChanged}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];
  // find last page
  const lastPage = Math.ceil(totalRows / Number(perPage));
  // create page arrays
  for (let i = 1; i <= lastPage; i++) {
    pages.push(i);
  }
  const goToPage = page => evt => {
    evt.preventDefault();
    setCurrentPage(page);
    if (onPageChanged) {
      onPageChanged(page);
    }
  };
  useEffect(() => {
    if (currentPage !== 1) {
      goToPage(1);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <BPagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink onClick={goToPage(1)} first href="#"/>
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink onClick={goToPage(currentPage - 1)} previous href="#"/>
      </PaginationItem>
      {
        pages.map(page => (
          <PaginationItem active={page === currentPage} key={`pageNav${page}`}>
            <PaginationLink onClick={goToPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))
      }
      <PaginationItem disabled={currentPage === lastPage}>
        <PaginationLink onClick={goToPage(currentPage + 1)} next href="#"/>
      </PaginationItem>
      <PaginationItem disabled={currentPage === lastPage}>
        <PaginationLink onClick={goToPage(lastPage)} last href="#"/>
      </PaginationItem>
    </BPagination>
  )
};
ModelPagination.propTypes = {
  totalRows: PropTypes.number,
  /**Callback
   * for example function onPageChanged(currentPage) {
   *
   * }
   * */
  onPageChanged: PropTypes.func
};
