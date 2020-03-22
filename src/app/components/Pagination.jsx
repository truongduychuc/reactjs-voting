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
  const [localLimit, setLocalLimit] = useState(DEFAULT_BUTTON_LIMIT);
  const localNumberOfPages = 1;

  const {
    // eslint-disable-next-line no-unused-vars
    ellipsisText,
    onPageChanged
  } = props;
  const perPage = toInteger(props.perPage);
  const totalRows = toInteger(props.perPage);
  const localPage = toInteger(props.page);

  // eslint-disable-next-line no-unused-vars
  const firstPage = 1;
  // find last page
  const calculatedResult = Math.ceil(totalRows / perPage);
  const numberOfPages = !calculatedResult || calculatedResult < 1 ? 1 : calculatedResult;


  const sanitizeLimit = value => {
    const limit = toInteger(value) || 1;
    return limit < 1 ? DEFAULT_BUTTON_LIMIT : limit;
  };

  const sanitizeCurrentPage = (val, numberOfPages) => {
    const page = toInteger(val) || 1;
    return page > numberOfPages ? numberOfPages : page < 1 ? 1 : page;
  };

  const makePageArray = (startNumber, numberOfPages) => range(numberOfPages).map((val, i) => ({
    number: startNumber + i,
    classes: null
  }));
  // eslint-disable-next-line no-unused-vars
  const isActivePage = pageNum => pageNum === currentPage;
  // eslint-disable-next-line no-unused-vars
  const goToPage = page => evt => {
    evt.preventDefault();
    setCurrentPage(page);
    if (onPageChanged) {
      onPageChanged(page);
    }
  };
  useEffect(() => {
    setCurrentPage(sanitizeCurrentPage(localPage, localNumberOfPages));
    // eslint-disable-next-line
  }, []);
  const {page, limit} = props;
  useEffect(() => {
    setCurrentPage(sanitizeCurrentPage(localPage, localNumberOfPages));
    // eslint-disable-next-line
  }, [page]);
  useEffect(() => {
    setLocalLimit(sanitizeLimit(limit));
  }, [limit]);

  // calculate how many page need to be cut
  // prepare for rendering

  const paginationParams = () => {
    const limit = localLimit;
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
      if (limit > ELLIPSIS_THRESHOLD) {
        numberOfLinks = limit - 2;
      }
      startNumber = currentPage - Math.floor(numberOfLinks / 2);


    }
    // sanitize params
    if (startNumber < 1) {
      startNumber = 1;
    } else if (startNumber > numberOfPages - numberOfLinks) {
      startNumber = numberOfPages - numberOfLinks + 1;
    }
    if (startNumber < 4) {
      numberOfLinks += 2;
      startNumber = 1;
    }
    const lastPageNumber = startNumber + numberOfLinks - 1;
    if (lastPageNumber > numberOfPages - 3) {
      numberOfLinks += (lastPageNumber === numberOfPages - 2 ? 2 : 3);
    }

    if (limit < ELLIPSIS_THRESHOLD) {
      if (startNumber === 1) {
        numberOfLinks = Math.min(numberOfLinks + 1, numberOfPages, limit + 1);
      } else if (numberOfPages === startNumber + numberOfLinks - 1) {
        startNumber = Math.max(startNumber - 1, 1);
        numberOfLinks = Math.min(numberOfPages - startNumber + 1, numberOfPages, limit + 1);
      }
    }
    numberOfLinks = Math.min(numberOfLinks, numberOfPages - startNumber + 1);
    return {numberOfLinks, startNumber};
  };

  // eslint-disable-next-line no-unused-vars
  const pageList = () => {
    const {numberOfLinks, startNumber} = paginationParams();
    const pages = makePageArray(startNumber, numberOfLinks);
    if (pages.length > 3) {
      const idx = currentPage - startNumber;
      const classes = 'p-xs-down-none';

      if (idx === 0) {
        for (let i = 3; i < pages.length; i++) {
          pages[i].classes = classes;
        }
      } else if (idx === pages.length - 1) {
        for (let i = 0; i < pages.length - 3; i++) {
          pages[i].classes = classes;
        }
      } else {
        // hide all except current page, current page + 1, current page -1
        for (let i = 0; i < idx - 1; i++) {
          pages[i].classes = classes;
        }
        for (let i = pages.length - 1; i > idx + 1; i--) {
          pages[i].classes = classes;
        }
      }
    }
    return pages;
  };
  const buttons = [];
  buttons.push(
    <PaginationItem>
      <PaginationLink first>

      </PaginationLink>
    </PaginationItem>
  );
  buttons.push(
    <PaginationItem>
    <PaginationLink previous/>
    </PaginationItem>
  );
  return (
    <BPagination>
      {buttons}
    </BPagination>
  )
};
_Pagination.propTypes = {
  page: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
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
  ellipsisText: PropTypes.string,
  limit: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};
_Pagination.defaultProps = {
  totalRows: 1,
  perPage: 10,
  maxBoxes: 5,
  onPageChanged: _func.noop,
  page: 1,
  ellipsisText: '\u2026',
  limit: 5,
};

export const ModelPagination = _Pagination;

