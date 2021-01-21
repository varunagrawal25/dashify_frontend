import React, { useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
// import Result from '../components/result';
import arrow from './assets/arrow.png'
export default class WithMultipleCheckboxes extends React.Component  {
  state={
    Columns:  [
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

    Rows:  [  {
      img:'',
      name: "ji" ,
      email:"a.email_id",
      role:"a.role",
      status:'Active',
      action:""
    }]
  }

  // showLogs2 = (e) => {
  //   setCheckbox1(e);
  // };
  componentDidMount(){
    if(this.props.AllPeople) 
    this.setState({Rows:this.props.AllPeople});
    console.log("props c",this.props)
  }
  componentDidUpdate(){
    console.log("props did",this.props)
    if(this.state.Rows !== this.props.AllPeople)
    this.setState({Rows:this.props.AllPeople})
  }
 

  render(){
    console.log("state",this.state)
    
    
   
    // const [checkbox1, setCheckbox1] = React.useState([]);
  
    
  

    return ( 
       <MDBDataTableV5
      style={{opacity:'1'}}
        hover 
        columns={this.state.Columns}
        rows={this.state.Rows}
        // data={datatable}
        searching={true}
        sortable={true}
        scrollY={true}
        paging={false}
        paginationLabel={false}
        disabled
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