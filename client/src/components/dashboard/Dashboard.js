import React, { Component, useState } from "react";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import DatePicker from "react-datepicker";
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/custom.css";
import "../../assets/css/material.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../layout/Navbar";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import Topbar from "../layout/Topbar";
import { session } from "passport";
import { decode } from "jsonwebtoken";
import $ from 'jquery';

import { isEmpty } from "is-empty";

var clickPhoto = true;

class Dashboard extends Component {
  
    constructor(props){
      super(props);
      this.state = {
        startDate:new Date(),
        endDate:new Date(),
        value:'1',
        nameValue:'',
        reports:[],
        users:[],
        show:false,
        showEndDate:false,
        showPerson:false,
        categoryActions:[
          {label:"By Date", value:"1"},
          {label:"By Person", value:"2"}
        ],
        fieldName: 'User Name',
        authority:'0',
        showPersonSetting:false,
        name:'',
        email:''        
      }

      // 
    }   

    componentDidMount() {
      var token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      this.setState({name: decoded.name});
      this.setState({email: decoded.email});

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var Reg_Date = year * 10000 + month * 100 + day;

      this.setState({authority: decoded.authority});


      this.setState({showAddButton:true});

      if (decoded.authority == "1"){
        this.setState({showAddButton:false});
      }

    }

    render(){   
      return (
          <div>
              <div style={{textAlign:"center", padding: '100px'}}>
                <h1>Wellcome</h1>
                <h2>{this.props.auth.user.email}</h2>
                <button onClick={this.props.logoutUser} className="btn btn-lg btn-primary mb-5">Logout</button>
              </div> 
          </div>         
      );
    }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
