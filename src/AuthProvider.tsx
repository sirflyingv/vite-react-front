import { useState, useMemo } from 'react';

import axios from 'axios';
import { AuthContext } from './contexts';
import { loginUrl } from './routes/ngwRoutes';

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const AuthProvider = ({ children }: Props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = () => {
    const authData = localStorage.getItem('authData');
    return !!authData;
  };

  const logIn = async (authData) => {
    try {
      console.log(loginUrl, authData);
      const res = await axios.post(loginUrl, authData, {
        headers: {
          Accept: '*/*',
        },
      });
      console.log(res);
      // const { username } = authData;
      // const { token } = res.data;
      // localStorage.setItem('authData', JSON.stringify({ token, username }));
      // setLoggedIn(true);
    } catch (err) {
      console.log(err);
      // setLoggedIn(false);
      throw err; // error traveling magic!!!
    }
  };

  // const getUserData = () => JSON.parse(localStorage.getItem('authData'));

  // const signUp = async (signUpData) => {
  //   try {
  //     const res = await axios.post(signUpUrl, signUpData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const { username } = signUpData;
  //     const { token } = res.data;
  //     localStorage.setItem('authData', JSON.stringify({ token, username }));
  //     setLoggedIn(true);
  //   } catch (err) {
  //     console.error('op!', err);
  //     setLoggedIn(false);
  //     throw err; // error traveling magic!!!
  //   }
  // };

  // const logOut = () => {
  //   localStorage.removeItem('authData');
  //   setLoggedIn(false);
  // };

  const authAPI = useMemo(
    () => ({
      loggedIn,
      logIn,
      isLoggedIn,
      // logOut,
      // signUp,
      // getUserData,
    }),
    [loggedIn]
  );

  return (
    <AuthContext.Provider value={authAPI}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
