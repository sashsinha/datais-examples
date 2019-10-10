import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/Home";
import Visualization from "./pages/Visualization";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/visualization/:title" component={Visualization}></Route>
                <Route path="/" component={Home}></Route>
            </Switch>
        </Router>
    );
}

export default App;
