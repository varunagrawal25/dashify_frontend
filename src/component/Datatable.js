import React, { useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
// import Result from '../components/result';
import arrow from './assets/arrow.png'
export default class WithMultipleCheckboxes extends React.Component  {
  state={
    columns:  [
     
      // {
      //   label: 'Name',
      //   field: 'name',
      //   width: 250,
      //   attributes: {
      //     'aria-controls': 'DataTable',
      //     'aria-label': 'Name',
      //   },
      // },
      // {
      //   label: 'Email',
      //   field: 'email',
      //   width: 400,
      // },
      // {
      //   label: 'Role',
      //   field: 'role',
      //   width: 200,
      // },
      // {
      //   label: 'Status',
      //   field: 'status',
      //   width: 150,
      // },
      // {
      //   label: 'Action',
      //   field: 'action',
      //   sort: 'disabled',
      //   width: 150,
      // }


              {
                        label: '',
                        field: 'img',
                        width: 50,
                        sort: 'disabled',
                      },
                      {
                        label: 'Name',
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
                        width: 500,
                      },
                      {
                        label: 'Role',
                        field: 'role',
                        width: 150,
                      },
                      {
                        label: 'Status',
                        field: 'status',
                        width: 150,
                      },
                      {
                        label: 'Action',
                        field: 'action',
                        sort: 'disabled',
                        width: 100,
                      }
        
    ],

    rows:  this.props.AllPeople
  }

  // showLogs2 = (e) => {
  //   setCheckbox1(e);
  // };
  componentDidMount(){
    if(this.props.AllPeople) 
    this.setState({rows:this.props.AllPeople});
    console.log("props c",this.props)
  }
  componentDidUpdate(){
    console.log("props did",this.props)
    if(this.state.rows !== this.props.AllPeople)
    this.setState({rows:this.props.AllPeople})
  }
 

  render(){
    console.log("state",this.state)
    
    
   
    // const [checkbox1, setCheckbox1] = React.useState([]);
  
    // var datatable={
    //   columns={this.state.Columns},
    //     rows={this.props.AllPeople}
    // }
  

    return ( 
       <MDBDataTableV5
        
        data={this.state}
        searching={true}
        sortable={true}
        
        scrollY={true}
        paging={false}
        paginationLabel={false}
       
        // checkbox
        // headCheckboxID='id6'
        // bodyCheckboxID='checkboxes6'
        // getValueCheckBox={(e) => {
        //   showLogs2(e);
        // }}
        // getValueAllCheckBoxes={(e) => {
        //   showLogs2(e);
        // }}
       // multipleCheckboxes
      />
      )
  
 
 
 


}}
// import React from 'react';
// import { MDBDataTableV5 } from 'mdbreact';

// function Datatable(props) {
//   console.log(props)
//   console.log(props.AllPeople)
//   const [datatable, setDatatable] = React.useState({
//     columns: [

//       {
//                 label: '',
//                 field: 'img',
//                 width: 50,
//                 sort: 'disabled',
//               },
//               {
//                 label: 'Name',
//                 field: 'name',
//                 width: 250,
//                 attributes: {
//                   'aria-controls': 'DataTable',
//                   'aria-label': 'Name',
//                 },
//               },
//               {
//                 label: 'Email',
//                 field: 'email',
//                 width: 400,
//               },
//               {
//                 label: 'Role',
//                 field: 'role',
//                 width: 200,
//               },
//               {
//                 label: 'Status',
//                 field: 'status',
//                 width: 150,
//               },
//               {
//                 label: 'Action',
//                 field: 'action',
//                 sort: 'disabled',
//                 width: 150,
//               }

//     ],
//     rows:[ {
//             img:'',
//             name: "ji" ,
//             email:"a.email_id",
//             role:"a.role",
//             status:'Active',
//             action:""
//           },
//           {
//             img:'',
//             name: "fgcvhi" ,
//             email:"a.email_id",
//             role:"a.role",
//             status:'Active',
//             action:""
//           },
//           {
//             img:'',
//             name: "hji" ,
//             email:"a.email_id",
//             role:"a.role",
//             status:'Active',
//             action:""
//           }]
//   });

//   return <MDBDataTableV5 hover data={datatable} />;
// }
// export default Datatable;