import axios from 'axios';

const accountAPI = {
    all: () => axios.get('http://localhost:3001/account/all'),
    getUser: (id) => axios.get('http://localhost:3001/account/' + id),
    getBalance: (id) => axios.get('http://localhost:3001/account/balance/' + id),
    createUser: (data) => axios.post('http://localhost:3001/account/create', data),
    updated: (id, data) => axios.put('http://localhost:3001/account/' + id, data)
};

export { accountAPI };
