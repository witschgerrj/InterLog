import React, { useEffect } from 'react';
import { FB } from '../backend/firebase'

const Loading = (props) => {

  useEffect(() => {
    FB.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'Clients' : 'Login');
    })
  }, []);

  return (
    <>
    </>
  );
}

export default Loading;