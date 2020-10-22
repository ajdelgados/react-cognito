import React, { useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { useLocation, useHistory } from 'react-router-dom'
import { SessionContext } from './contexts/sessionContext'
import BounceLoader from "react-spinners/BounceLoader";

function App() {
  const history = useHistory();
  const { state, dispatch } = useContext(SessionContext);

  const query = new URLSearchParams(useLocation().search);
  if(query.get("code")) {
    const code = query.get("code");
    history.push("/");
    dispatch({ type: 'LOAD_USER_INFORMATION' })
    setTimeout( () => {
    fetch(`https://${process.env.REACT_APP_COGNITO_DOMAIN}.auth.${process.env.REACT_APP_COGNITO_AWS_REGION}.amazoncognito.com/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${process.env.REACT_APP_COGNITO_SECRET}`
      },
      body: `grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_COGNITO_REDIRECT_URI}&client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&code=${code}`
    })
    .then(response => response.json())
    .then(data => {
      fetch(`https://${process.env.REACT_APP_COGNITO_DOMAIN}.auth.${process.env.REACT_APP_COGNITO_AWS_REGION}.amazoncognito.com/oauth2/userInfo`, {
      headers: {
        'Authorization': `Bearer ${data.access_token}`
      }})
      .then( responseUserInfo => responseUserInfo.json())
      .then(dataUserInfo => {
        dispatch({
          type: 'LOADED_USER_INFORMATION',
          payload: dataUserInfo
        })
      })
      .catch(errUserInfo => { 
        console.log("errUserInfo")
        console.log(errUserInfo)
      })
    })
    .catch(err => { 
      console.log("err")
      console.log(err)
    })}, 10000)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          !state.loading ? state.authenticated ?
          <div>
            <h1>Email: {state.payload.email}</h1>
            <a
              className="App-link"
              href={`https://${process.env.REACT_APP_COGNITO_DOMAIN}.auth.${process.env.REACT_APP_COGNITO_AWS_REGION}.amazoncognito.com/logout?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&logout_uri=${process.env.REACT_APP_COGNITO_LOGOUT_URI}`}
              rel="noopener noreferrer"
            >
              Sing Out
            </a>
          </div>:
          <a
            className="App-link"
            href={`https://${process.env.REACT_APP_COGNITO_DOMAIN}.auth.${process.env.REACT_APP_COGNITO_AWS_REGION}.amazoncognito.com/login?response_type=code&client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_COGNITO_REDIRECT_URI}&state=STATE&scope=openid+profile`}
            rel="noopener noreferrer"
          >
            Sing In
          </a>:
          <div className="sweet-loading">
            <BounceLoader
              size={150}
              color={"#ffffff"}
              loading={state.loading}
            />
          </div>
        }
      </header>
    </div>
  );
}

export default App;
