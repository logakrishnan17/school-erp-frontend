import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import * as service from '../services/service';
import Navigation from './navbar.component';

export default class CreateStudent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			DOB: '',
			classId: '',
			year: '',
			parentId: '',
      classList: [],
      parentsList: []
		};

		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeDOB = this.onChangeDOB.bind(this);
		this.onChangeClass = this.onChangeClass.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
		this.onChangeParent = this.onChangeParent.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    this.Auth = new AuthService();
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value,
		});
	}

	onChangeDOB(e) {
		this.setState({
			DOB: e.target.value,
		});
	}

	onChangeClass(e) {
		this.setState({
			classId: e.target.value,
		});
	}

	onChangeYear(e) {
		this.setState({
			year: e.target.value,
		});
	}

	onChangeParent(e) {
		this.setState({
			parentId: e.target.value,
		});
	}

	async componentDidMount() {

    let classList =[], parentsList = [];

		if (!this.Auth.loggedIn()) {
			return this.props.history.replace('/');
		}

		await service.classList(this.Auth.getToken()).then((value) => {
      console.log(value);
			if (value) {
        classList = value.data;
      };
		});

		await service.parentsList(this.Auth.getToken()).then((value) => {
      console.log(value);
      if (value) {
        parentsList = value.data;
      };
		});

    //reusing values for uodate student
    if(this.props.history && this.props.history.location.state && this.props.history.location.state.editData) {
      this.setState({
        name:this.props.history.location.state.editData.name,
        DOB:this.props.history.location.state.editData.DOB,
        classId:this.props.history.location.state.editData.classId,
        year:this.props.history.location.state.editData.year,
        parentId:this.props.history.location.state.editData.parentId,
        classList, parentsList
      });
    } else {
      this.setState({
        classList, parentsList
      });
    }

    console.log(this.history,"this.history");
	}

	onSubmit(e) {
		e.preventDefault();

		let data = {
			name: this.state.name,
			DOB: this.state.DOB,
			classId: this.state.classId,
			year: this.state.year,
			parentId: this.state.parentId,
		}

    service.createStudent(this.Auth.getToken(), data).then((response) => {
      console.log(response);
      if(response && response.status && response.status.code === 200) {
        this.props.history.push('/list');
      }
		});

	}

	render() {

    let { parentsList, classList } = this.state;

		return (
			<div style={{ marginTop: 10 }}>
				<Navigation history={this.props.history}/>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.name}
							onChange={this.onChangeName}
						/>
					</div>
					<div className="form-group">
						<label>DOB: </label>
						<input
							type="date"
							className="form-control"
							value={this.state.DOB}
							onChange={this.onChangeDOB}
						/>
					</div>
					<div className="form-group">
						<label>Class: </label>
            <select
							required
							name="classId"
							className="form-control"
							value={this.state.classId}
							onChange={this.onChangeClass}
						>
							<option value="">Select class</option>
							{
                classList && classList.length ?
                classList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name + ' ' + item.section}
                  </option>
                )) : ''
              }
						</select>
					</div>
					<div className="form-group">
						<label>Year: </label>
						<select
              required
							type="text"
							className="form-control"
							value={this.state.year}
							onChange={this.onChangeYear}
						>
            <option value="">Select Year</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            </select>
					</div>
					<div className="form-group">
						<label>Parent: </label>
						<select
							required
							name="parentId"
							className="form-control"
							value={this.state.parentId}
							onChange={this.onChangeParent}
						>
							<option value="">Select parent</option>
							{
                parentsList && parentsList.length ?
                parentsList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                )) : ''
              }
						</select>
					</div>
					<div className="form-group text-center">
						<input type="submit" value="Submit" className="btn btn-primary" />
					</div>
				</form>
			</div>
		);
	}
}
