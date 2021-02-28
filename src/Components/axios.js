 import axios from 'axios'
const instance = axios.create({
	// TheAPI (clode function) url
	baseURL: "https://us-central1-clone-ac7ee.cloudfunctions.net/api",
	//http://localhost:5001/clone-ac7ee/us-central1/api
});

export default instance;