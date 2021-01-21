import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
// import Result from '../components/result';
import arrow from './assets/arrow.png'
export default function WithMultipleCheckboxes() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Name',
        field: 'img',
        width: 50,
      },
      {
        label: '',
        field: 'name',
        width: 250,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Email',
        field: 'email',
        width: 400,
      },
      {
        label: 'Role',
        field: 'role',
        width: 200,
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'disabled',
        width: 150,
      }
    ],
    rows: [
      {
        img:<img src={arrow}/> ,
        name: 'Dennis Brinn' ,
        email:'info@oasismedia.com',
        role:'Admin',
        status:'Active',
        action:''
      },
      
    ],
  });
  const [checkbox1, setCheckbox1] = React.useState([]);

  const showLogs2 = (e) => {
    setCheckbox1(e);
  };

  return (
    <>
      <MDBDataTableV5
      style={{opacity:'1'}}
        hover 
        data={datatable}
        searching={true}
        sortable={true}
        scrollY={true}
        paging={false}
        paginationLabel={false}
        checkbox
        headCheckboxID='id6'
        bodyCheckboxID='checkboxes6'
        getValueCheckBox={(e) => {
          showLogs2(e);
        }}
        getValueAllCheckBoxes={(e) => {
          showLogs2(e);
        }}
        multipleCheckboxes
      />

      {/* <Result>
        {' '}
        {checkbox1 && (
          <p>
            {JSON.stringify(
              checkbox1.map((e) => {
                console.log(e);
                delete e.checkbox;
                return e;
              }) && checkbox1
            )}
          </p>
        )}
      </Result> */}
    </>
  );
}