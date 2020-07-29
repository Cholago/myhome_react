import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import Login from "views/auth/LoginPage";
import SignUp from "views/auth/SignupPage";
import ForgortPassword from "views/auth/ForgotPassword";
import Homepage from "views/main/Homepage"

var hist = createBrowserHistory();

function App() {
    return (
        <Router history={hist}>
            <Switch>
                <Route path="/landing-page" component={LandingPage} />
                <Route path="/profile-page" component={ProfilePage} />
                <Route path="/components" component={Components} />
                <Route path="/main" component={Homepage} />
                <Route path="/forgot_password" component={ForgortPassword} />
                <Route path="/sign_up" component={SignUp} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
