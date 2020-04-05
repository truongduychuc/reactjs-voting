import React, { useEffect, useRef, useState } from "react";
import { useIsMountedRef } from "../../hooks";
import {
  confirm,
  EmptyTableRow,
  Filter, NowUiIcon,
  PerPageFilter,
  SearchInput,
  SwitchButton,
  TableRowsSkeleton
} from "../components";
import { Button, Col, Row, Table } from "reactstrap";
import { apiService, apiUrls } from "../../services";
import { toInteger } from "../../utils/number";
import { perPageOptions } from "../utils";
import ReactPaginate from "react-paginate";
import { bindActionCreators } from "redux";
import { consumers as errorConsumer } from "../errors";
import { connect } from "react-redux";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeadingRow } from "../components/TableChildren";

const List = ({pushError}) => {
  // states
  const [users, setUsers] = useState([]);
  const [isRequestingUsers, setRequestingUsers] = useState(false);
  const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);
  const [queryParams, setQueryParams] = useState({
    _rK: '', // role key
    _sK: '', // search key
  });
  const [roleOptions, setRoleOptions] = useState([]);
  const [sortingMeta, setSortingMeta] = useState({
    sort_col: 'id',
    sort_desc: false
  });

  const [meta, setMeta] = useState({
    per_page: 10,
    page: 1
  });

  const isMountedRef = useIsMountedRef();
  const isMounted = () => !!isMountedRef.current;
  // constants
  const tableFields = [
    {
      key: 'id',
      label: '#',
      sortable: true
    },
    {
      key: 'display_name',
      label: 'Name',
      sortable: false
    },
    {
      key: 'team_name',
      label: 'Team',
      sortable: false
    },
    {
      key: 'role_name',
      label: 'Role',
      sortable: false
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false
    }
  ];

  const StatusCell = ({status, row}) => {
    const switchRef = useRef(null);

    return (<td>
        <SwitchButton
          ref={switchRef}
          onChange={currentValue => onStatusValChange(currentValue, row, switchRef.current)}
          round={true}
          checked={!!status}
        />
      </td>
    )
  };


  const TableRow = ({fields, item, rowIndex}) => (
    <tr>
      {
        fields.map((col, colID) => {
          switch (col.key) {
            case 'status':
              return (
                <StatusCell
                  row={item}
                  key={`row_col${rowIndex}_${colID}`}
                  status={item[col.key]}
                />);
            case 'actions':
              return (
                <ActionsCell
                  id={item.id}
                  key={`row_col${rowIndex}_${colID}`}
                />
              );
            default:
              return (
                <StandardCell
                  key={`row_col${rowIndex}_${colID}`}
                  value={item[col.key]}
                />)
          }
        })
      }
    </tr>
  );

  const StandardCell = ({value}) => (
    <td>{value}</td>
  );
  const ActionsCell = ({id}) => (
    <td>
      <Button color="link">
        Details
      </Button>
    </td>
  );


  // effects
  useEffect(() => {
    getUserList();
    return () => setRequestingUsers(false);
    // eslint-disable-next-line
  }, [
    meta.page,
    queryParams,
    meta.per_page,
    sortingMeta
  ]);

  useEffect(() => {
    roleFilterProvider();
    // eslint-disable-next-line
  }, []);

  const isTableEmpty = () => {
    return users.length === 0;
  };

  const resolveParams = () => {
    const except = [
      'current_page',
      'from',
      'to',
      'total',
      'count',
      'path',
      'last_page'
    ];
    let usedMeta = {};
    Object.keys(meta).forEach(key => {
      if (!except.includes(key)) {
        usedMeta[key] = meta[key];
      }
    });
    return {
      ...usedMeta,
      ...sortingMeta,
      ...queryParams
    }
  };

  const onPerPageChanged = value => {
    if (isMounted()) {
      setMeta(prev => ({
        ...prev,
        per_page: value
      }))
    }
  };
  const onSortingMetaChanged = ({sortDesc, sortColumn}) => {
    setSortingMeta({
      sort_desc: sortDesc,
      sort_col: sortColumn
    });
  };
  const roleFilterProvider = () => {
    apiService.getData(apiUrls.API.ROLE_FILTER_PROVIDER).then(data => {
      if (isMounted()) {
        setRoleOptions(data);
      }
    }).catch(err => {
      // pushError(err);
    })
  };

  const getUserList = () => {
    if (isMounted()) {
      setRequestingUsers(true);
    }
    apiService.get(apiUrls.API.USERS, resolveParams())
      .then(res => {
        if (isMounted()) {
          const {data, meta: serverMeta} = res;
          setUsers(data);
          setMeta(m => ({
            ...meta,
            ...serverMeta
          }));
          if (!firstTimeLoaded) {
            setFirstTimeLoaded(true);
          }
        }
      }).catch(err => {
      // pushError(err);
    }).finally(() => {
      if (isMounted()) {
        setRequestingUsers(false);
      }
    });
  };


  const onStatusValChange = (currentValue, item, switchObject) => {

    confirm().then(ok => {
      apiService.patch(apiUrls.API.CHANGE_STATUS_USER + item.id, {
        status: currentValue
      }).then(success => {
          getUserList();
        }
      ).catch(fail => {
        switchObject.restoreValue();
        // pushError(fail);
      })
    }).catch(rj => {
      switchObject.restoreValue();
    })
  };

  const {last_page} = meta;
  const numberOfPages = toInteger(last_page);
  const paginationConfig = {
    pageClassName: "page-item",
    pageLinkClassName: "page-link",
    containerClassName: "pagination",
    nextClassName: 'page-item',
    nextLinkClassName: 'page-link',
    previousClassName: 'page-item',
    previousLinkClassName: 'page-link',
    nextLabel: '\u203A', // >,
    previousLabel: '\u2039', // <,
    disabledClassName: 'disabled',
    activeClassName: 'active',
    hrefBuilder: () => '#',
    pageRangeDisplayed: 2,
    onPageChange: (selectedItem) => {
      setMeta({
        ...meta,
        page: selectedItem.selected + 1
      })
    }
  };
  const onSearchInputChanged = value => {
    if (isMounted()) {
      setQueryParams(prevState => (
        {
          ...prevState,
          _sK: value,
        }
      ))
    }
  };
  const onFilterChanged = value => {
    if (isMounted()) {
      setQueryParams(prevState => (
        {
          ...prevState,
          _rK: value
        }
      ))
    }
  };

  return (
    <>
      <div style={{fontSize: '0.75rem'}}>
        Note:
        <ul>
          <li>Active: currently working in the company</li>
          <li>Inactive: temporarily off or left the company</li>
        </ul>
      </div>
      <Row>
        <Col className='mb-2' md={4} xl={3}>
          <SearchInput
            onChange={onSearchInputChanged}
          />
        </Col>
        <Col className='mb-2' md={3} xl={2}>
          <Filter
            options={roleOptions}
            onSelectionChange={onFilterChanged}
          />
        </Col>
        <Col className="mb-2" md={2}>
          <Button onClick={getUserList} title="Refresh" color="link">
            <NowUiIcon icon="loader_refresh"/>
          </Button>
        </Col>
      </Row>
      <Table borderless striped responsive="md">
        <thead>
        <HeadingRow
          fields={tableFields}
          onSortingChanged={onSortingMetaChanged}
        />
        </thead>
        <tbody>
        {
          isRequestingUsers ? (
              <TableRowsSkeleton cols={6}/>
            ) :
            !isTableEmpty() ?
              users.map((row, index) => (
                <TableRow
                  key={`user_row${index}`}
                  fields={tableFields}
                  rowIndex={index}
                  item={row}
                />
              )) : (
                <EmptyTableRow
                  cols={tableFields.length}
                />
              )
        }
        </tbody>
      </Table>
      <Row className="mt-2">
        <Col className="text-center text-md-left" md={6}>
          <PerPageFilter
            options={perPageOptions}
            onSelectionChange={onPerPageChanged}
          />
        </Col>
        <Col className="d-flex justify-content-center justify-content-md-end" md={6}>
          {firstTimeLoaded && !isTableEmpty() ? (
            <ReactPaginate
              pageCount={numberOfPages}
              {...paginationConfig}
            />
          ) : null}
        </Col>
      </Row>
    </>
  )
};

const mapDispatchToProps = dispatch => bindActionCreators({
  pushError: err => errorConsumer.add(err)
}, dispatch);
const ConnectedList = connect(null, mapDispatchToProps)(List);
export {
  ConnectedList
}
