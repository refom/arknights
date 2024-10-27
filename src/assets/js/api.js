import axios from "axios";

const BASE_API = "https://raw.githubusercontent.com/refom/arknek-backend/refs/heads/main/db/"
const END_API = {
	acc: "acc.json",
	operator: "operators.json",
	tag: "tag.json",
}

const STATUS = {
	OK: "ok",
	BAD: "bad",
}

const API = axios.create({
	baseURL: BASE_API,
})

const ErrorHandler = (error) => {
	// console.log(error)
	return {
		status: STATUS.BAD,
		message: error,
	}
}

const ResponseHandler = (response) => {
	// console.log(response)
	return {
		status: STATUS.OK,
		data: response.data,
	}
}

const GetApi = (end) => API.get(end).then(ResponseHandler).catch(ErrorHandler)

export {
	API,
	END_API,
	STATUS,
	GetApi,
}
