import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/homepage/homepage';
import Shoppage from './pages/shop/shop.jsx';
import Header from './components/header/header.jsx';
import SignIn_UpPage from './pages/sign-in-sign-up/sign-in-sign-up.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//import { render } from "node-sass";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shoppage} />
          <Route path='/signin' component={SignIn_UpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
