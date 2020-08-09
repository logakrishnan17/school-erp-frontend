import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import * as service from '../services/service';
import Navigation from "./navbar.component";

export default class StudentsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			studentsData: [],
		};

		this.Auth = new AuthService();
    this.studentsList = this.studentsList.bind(this);
    this.student = this.student.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
	}

	componentDidMount() {
		if (!this.Auth.loggedIn()) {
			return this.props.history.replace('/');
		}

		service.studentsList(this.Auth.getToken()).then((studentsData) => {
			console.log(studentsData, 'studentsData');
      if(studentsData.data) {
        this.setState({ studentsData: studentsData.data });
      }
		});
	}

  student = (data, i) => (
    <tr key={i}>
      <td>{data.name ? data.name : '-'}</td>
      <td>{data.classDetails ? data.classDetails.name : '-'}</td>
      <td>{data.year ? data.year : '-'}</td>
      <td>{data.DOB ? data.DOB : '-'}</td>
      <td>{data.parentDetails ? data.parentDetails.name : '-'}</td>
      <td>{data.fee ? data.fee : '-'}</td>
      <td>{data.isPaidFee ? 'Paid' : 'Unpaid'}</td>
      <td>
        {
          data.parentDetails ?
          <button disabled className="btn-success btn-disabled">Assigned</button> :
          <button className="btn-primary" onClick={() => this.updateStudent(data._id)}>Assign</button>
        }
      </td>
      <td>
        <button className="btn-danger" onClick={() => this.deleteStudent(data._id)}>Delete</button>
      </td>
    </tr>
  );

  updateStudent(data) {

    let editData = this.state.studentsData.find((item) => {
      return item._id.toString() === data.toString();
    });

    this.props.history.replace('/edit/'+ data, { editData: editData });
    // <CreateStudent />
  };

  deleteStudent(data) {
    service.DeleteStudent(this.Auth.getToken(), data).then((response) => {
      
      if(response && response.status && response.status.code === 200) {
        
        let updatedData = this.state.studentsData.filter((item) => {
          return item._id.toString() !== data.toString();
        });

        this.setState({
          studentsData: updatedData
        });
      }
		});
  };

	onSubmit(e) {
		e.preventDefault();

		let loginData = {
			email: this.state.email,
			password: this.state.password,
		};

		console.log(loginData, 'loginData');

		this.Auth.login(loginData)
			.then((response) => {
				console.log(response, 'tes');
				if (response && response.status && response.status.code === 200) {
					this.Auth.setToken(response.token);
					this.props.history.replace('/list');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	studentsList() {
    let that = this;
		return this.state.studentsData.map(function (currentStudent, i) {
			return that.student(currentStudent, i);
		});
	}

	render() {

		return (
			<div className="col-md-12">
        <Navigation history={this.props.history}/>
				<h3 className="text-center">Students List</h3>
				<table className="table table-striped" style={{ marginTop: 20 }}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Class</th>
							<th>Year</th>
							<th>Date of Birth</th>
              <th>Parent</th>
              <th>Fees</th>
              <th>Paid Status</th>
              <th>Assign Parent</th>
              <th>Delete Student</th>
						</tr>
					</thead>
					<tbody>{this.studentsList()}</tbody>
				</table>
			</div>
		);
	}
}
