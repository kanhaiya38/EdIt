import axios from "axios";

// export default (method, path, data) => {
// 	return new Promise((resolve, reject) => {
// 		return axios[method](path, data)
// 			.then((res) => {
// 				return resolve(res.data);
// 			})
// 			.catch((err) => {
// 				return reject(err.response.data.error);
// 			});
// 	});
// };

export const setHeaderToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

export const API = axios.create({
	baseURL: "http://localhost:8081/api",
});
