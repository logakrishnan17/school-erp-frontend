import axios from 'axios';
let url = 'http://localhost:3000';

export function login(user) {
	return axios
		.post(url + '/user/login', user)
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err,"err");
			return err;
		});
}

export function classList(token) {
	return axios
		.get(url + '/class', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
}

export function parentsList(token) {
	return axios
		.get(url + '/user', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
}

export function studentsList(token) {
	return axios
		.get(url + '/student', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
}

export function createStudent(token, studentDetails) {
	return axios
		.post(url + '/student', studentDetails, {
			headers: {
				'Content-Type': 'application/json',
        'Authorization': token,
			}
    })
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err,"err");
			return err;
		});
}

export function UpdateStudent(token, studentId, updateStudent) {
	return axios
		.patch(`${url}/student/${studentId}`, updateStudent, {
			headers: {
				'Content-Type': 'application/json',
        'Authorization': token,
			},
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
}
export function DeleteStudent(token, studentId) {
	return axios
		.delete(`${url}/student/${studentId}`, {
			headers: {
				'Content-Type': 'application/json',
        'Authorization': token,
			}
		})
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});
}