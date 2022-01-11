import axios from 'axios';
/* require('dotenv').config();

const url = process.env.SERVER_URL
const port = process.env.SERVER_PORT
const baseURL = `${url}:${port}` */
const baseURL = 'http://localhost:3001';
const token = localStorage.getItem('token')
const service = axios.create({
    baseURL: baseURL,
    headers: { authorization: `Bearer ${token}` },
  })

const accountAPI = {
    all: () => service.get('/account/all'),
    getUser: (firebaseId) => service.get('/account', { params: { firebaseId: firebaseId} } ),
    createUser: (data) => service.post('/account/create', data),
    updated: (_id, amount) => service.put('/account/update', {_id: _id, amount: amount}),
};

export { accountAPI };
