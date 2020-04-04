/**
 Created by Gray
 using WebStorm at
 14:22 on 22-Mar-20
 */
import React, { useRef } from 'react';
import { range } from "../../utils";
import PropTypes from "prop-types";
import { toInteger } from "../../utils/number";
import { _func } from "../../_helpers";

const EmptyTableRow = ({cols}) => (
  <tr>
    <td colSpan={cols} className="text-center">
      <div role="alert">
        There is no record
      </div>
    </td>
  </tr>
);
EmptyTableRow.defaultProps = {
  cols: 5
};

const TableRowsSkeleton = ({rows, cols}) => (
  range(rows).map((row, key) => (
    <tr className="table-data-skeleton" key={`skeletonRow${key}`}>
      <td
        className="table-rows-skeleton"
        style={{paddingTop: '1.5rem', paddingBottom: '1.5rem'}}
        colSpan={cols}
      />
    </tr>
  ))
);
TableRowsSkeleton.defaultProps = {
  rows: 10,
  cols: 5
};
TableRowsSkeleton.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number
};

const PerPageFilter = ({options, onSelectionChange}) => {
  const filterRef = useRef(null);

  const onChange = () => {
    onSelectionChange(toInteger(filterRef.current.value))
  };
  return (
    <label className="mb-2" htmlFor="perPage1">
      Show
      <select
        onChange={onChange}
        ref={filterRef}
        className="select-box-control mx-1"
        id="perPage1"
      >
        {
          options.map(option => (
            <option
              value={option._k}
              key={`per_page_val${option._k}`}
            >{option._l}</option>
          ))
        }
      </select>
      items
    </label>
  )
};
PerPageFilter.propTypes = {
  options: PropTypes.array,
  onSelectionChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};
PerPageFilter.defaultProps = {
  options: [],
  onSelectionChange: _func.noop,
  defaultOption: 10
};

export {
  TableRowsSkeleton,
  EmptyTableRow,
  PerPageFilter
}
