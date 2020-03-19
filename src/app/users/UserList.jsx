import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap';
import PanelHeader from "../panel-header/PanelHeader";
import { apiService } from "../../services/api";
import { confirm, ModelPagination, SwitchButton } from "../components";
import { useIsMountedRef } from "../../hooks";
import { bindActionCreators } from "redux";
import { errorActions } from "../errors";
import { connect } from 'react-redux';
import { apiUrls } from "../../services";


const UserList = ({pushError}) => {
  // states
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    per_page: 10,
    page: 1
  });
  const isMountedRef = useIsMountedRef();
  // constants
  const tableFields = [
    {
      key: 'id',
      label: '#'
    },
    {
      key: 'display_name',
      label: 'Name'
    },
    {
      key: 'team_name',
      label: 'Team',
    },
    {
      key: 'role_name',
      label: 'Role'
    },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'actions',
      label: 'Actions'
    }
  ];

  const StatusCell = ({status, row}) => (
    <td>
      <SwitchButton
        onChange={currentValue => onStatusValChange(currentValue, row)}
        round={true}
        checked={!!status}
      />
    </td>
  );

  const HeadingRow = ({fields}) => (
    <tr>
      {fields.map((item, index) => (<th key={`Column heading ${index}`}>{item.label}</th>))}
    </tr>
  );
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
            case 'id' :
              return (
                <StandardCell
                  key={`row_col${rowIndex}_${colID}`}
                  value={rowIndex + 1}
                />);
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
    // eslint-disable-next-line
  }, [meta.page, isMountedRef]);


  // functions
  const onPageChanged = (nextPage) => {
    setMeta({
      ...meta,
      ...{
        page: nextPage
      }
    })
  };
  const getUserList = () => {
    apiService.get(apiUrls.API.USERS, meta)
      .then(res => {
        if (isMountedRef.current) {
          const {data, meta: serverMeta} = res;
          setUsers(data);
          setMeta(m => ({
            ...meta,
            ...serverMeta
          }))
        }
      }).catch(err => {
      pushError(err);
    });
  };


  const onStatusValChange = (currentValue, item) => {
    console.log(currentValue);
    confirm().then(ok => {
      apiService.patch(apiUrls.API.CHANGE_STATUS_USER + item.id, {
        status: currentValue
      }).then(success => {
          getUserList();
        }
      )
    }).catch(fail => {
      console.log('failed');
    })
  };

  const {total: totalRows, per_page: perPage} = meta;
  return (
    <>
      <PanelHeader size="sm"/>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h3">
              Employees
            </CardTitle>
            <div style={{fontSize: '0.75rem'}}>
              Note:
              <ul>
                <li>Active: currently working in the company</li>
                <li>Inactive: temporarily off or left the company</li>
              </ul>
            </div>
          </CardHeader>
          <CardBody>
            <Table borderless striped responsive="md">
              <thead>
                <HeadingRow fields={tableFields}/>
              </thead>
              <tbody>
              {
                users.map((row, index) => (
                  <TableRow
                    key={`user_row${index}`}
                    fields={tableFields}
                    rowIndex={index}
                    item={row}
                  />
                ))
              }
              </tbody>
            </Table>
            <div className="d-flex justify-content-end">
              <ModelPagination
                onPageChanged={onPageChanged}
                totalRows={totalRows}
                perPage={perPage}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
};


const mapDispatchToProps = dispatch => bindActionCreators({
  pushError: err => errorActions.add(err)
}, dispatch);

export default connect(null, mapDispatchToProps)(UserList);
