import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap';
import PanelHeader from "../panel-header/PanelHeader";
import apiService from "../../services/api";
import { ModelPagination, SwitchButton } from "../components";
import confirmService from '../../services/confirm-service';
import { useIsMountedRef } from "../../hooks";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    per_page: 10,
    page: 1
  });
  const isMountedRef = useIsMountedRef();
  const tableFields = [
    {
      key: 'id',
      label: '#'
    },
    {
      key: 'full_name',
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

  const onPageChanged = (nextPage) => {
    setMeta({
      ...meta,
      ...{
        page: nextPage
      }
    })
  };

  useEffect(() => {
    apiService.get('http://localhost:8000/api/users', meta)
      .then(res => {
        const {data, meta: serverMeta } = res;
        setUsers(data);
        setMeta(m => ({
          ...meta,
          ...serverMeta
        }))
      })
  }, [isMountedRef, meta.page]);
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
                key={`row_col${rowIndex}_${colID}`}
                status={item[col.key]}
              />);
          case 'actions':
            return (
              <ActionsCell
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
const StatusCell = ({status}) => (
  <td>
    <SwitchButton
      onChange={onChange}
      round={true}
      checked={!!status}
    />
  </td>
);
const StandardCell = ({value}) => (
  <td>{value}</td>
);
const ActionsCell = () => (
  <td>
    <Button
      color="link"
    >
      Details
    </Button>
  </td>
);

const onChange = (currentValue) => {
  confirmService.show().then(result => {
    window.alert(result);
  });
};
export default UserList;
