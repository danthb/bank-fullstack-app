import axios from 'axios';

const accountAPI = {
    all: () => axios.get('http://localhost:3001/account/all')
};

export { accountAPI };
