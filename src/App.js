import React from "react";
import { HashRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./pages/Home";
import Visualization from "./pages/Visualization";

function App() {
    return (
        <Router basename="/">
            <Switch>
                <Route path="/visualization/:title" component={Visualization}></Route>
                <Route path="/" component={Home}></Route>
            </Switch>
        </Router>
    );
}

export default App;
