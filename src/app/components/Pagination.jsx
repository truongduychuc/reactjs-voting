/**
 Created by Gray
 using WebStorm at
 15:48 on 08-Mar-20
 */
import React, { useEffect, useState } from 'react';
import { Pagination as BPagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from 'prop-types';
import { _func } from "../../_helpers";
import { toInteger } from "../../utils/number";
import { range } from "../../utils";

const _Pagination = (props) => {
  //
  const ELLIPSIS_THRESHOLD = 3;
  //
  const DEFAULT_BUTTON_LIMIT = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];
  const perPage = Number(props.perPage);
  const totalRows = Number(props.totalRows);
  const onPageChanged = props.onPageChanged;

  const firstPage = 1;
  // find last page
  const calculatedResult = Math.ceil(totalRows / perPage);
  const numberOfPages = !calculatedResult || calculatedResult < 1 ? 1 : calculatedResult;
  const {
    ellipsisText
  } = props;


  // create page arrays
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  const sanitizeLimit = value => {
    const limit = toInteger(value) || 1;
    return limit < 1 ? DEFAULT_BUTTON_LIMIT : limit;
  };

  const sanitizeCurrentPage = (val, numberOfPages) => {
    const page = toInteger(val) || 1;
    return page > numberOfPages ? numberOfPages : page < 1 ? 1 : page;
  };


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
  // calculate how many page need to be cut
  // prepare for rendering

  const paginationParams = () => {
    const limit = DEFAULT_BUTTON_LIMIT;
    // amount of clickable link
    let numberOfLinks = limit;
    let startNumber = 1;

    // if the amount has not come to limit, just display all number link // 1,2,3,4,5 for instance
    if (numberOfPages <= limit) {
      numberOfLinks = numberOfPages;
    } else if (currentPage < limit - 1 && limit > ELLIPSIS_THRESHOLD) {
      // in this case, the current page still has not reached the last limit page
      // current page is 3
      // for example [<<] [<] [1] [2] [/3/] [4] [5][...][>][>>]
      // we need to plus the first and the last page button here, that's why we subtract 1
      numberOfLinks = limit - 1;

      numberOfLinks = Math.min(numberOfLinks, limit);
    } else if (numberOfPages - currentPage + 2 < limit && limit > ELLIPSIS_THRESHOLD) {
      // in case the current page has come after the limit, and going to approach the last page
      // for instance [<<][<][...][\7\][8][9][>][>>]
      startNumber = numberOfPages - numberOfLinks + 1;
    } else {
      // and now the pointer is between two above cases

    }
  };

  return (
    <BPagination>
      <PaginationItem disabled={currentPage === firstPage}>
        <PaginationLink onClick={goToPage(1)} first href="#"/>
      </PaginationItem>
      <PaginationItem disabled={currentPage === firstPage}>
        <PaginationLink onClick={goToPage(currentPage - 1)} previous href="#"/>
      </PaginationItem>
      {
        range(numberOfPages).map(page => (
          <PaginationItem active={page === currentPage} key={`pageNav${page}`}>
            <PaginationLink onClick={goToPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))
      }
      <PaginationItem disabled={currentPage === numberOfPages}>
        <PaginationLink onClick={goToPage(currentPage + 1)} next href="#"/>
      </PaginationItem>
      <PaginationItem disabled={currentPage === numberOfPages}>
        <PaginationLink onClick={goToPage(numberOfPages)} last href="#"/>
      </PaginationItem>
    </BPagination>
  )
};
_Pagination.propTypes = {
  totalRows: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  perPage: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  maxBoxes: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  /**Callback
   * for example function onPageChanged(currentPage) {
   *
   * }
   * */
  onPageChanged: PropTypes.func,
  ellipsisText: PropTypes.string
};
_Pagination.defaultProps = {
  totalRows: 1,
  perPage: 10,
  maxBoxes: 5,
  onPageChanged: _func.noop,
  ellipsisText: '\u2026'
};

export const ModelPagination = _Pagination;

