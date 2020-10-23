import React, {Component} from 'react';
import './Login.css';
import {Button} from "@material-ui/core";
import {auth, provider} from "./firebase";

class Login extends Component {

  signIn = () => {
    auth.signInWithPopup(provider)
      .catch(reason => {
        console.log(reason.message);
      })
  }

  render() {
    return (
      <div className="login">
        <div className="login__logo">
          <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/0/05/Discord.svg/512px-Discord.svg.png"
               alt="Discord app"/>
        </div>
        <Button onClick={this.signIn}>Sign in</Button>
      </div>
    );
  }
}

export default Login;
