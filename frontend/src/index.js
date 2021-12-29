import ReactDOM from 'react-dom';
import App from './App'
import AuthProvider from './contexts/Auth/AuthProvider';
import './index.css';
import Background from './images/bank_profile.jpg';

ReactDOM.render(
  <AuthProvider>
    <App style={ {backgroundImage: `url(${Background})`}}/>
  </AuthProvider>
  ,
    document.getElementById('root')
  );

  /* reportWebVitals(); */


