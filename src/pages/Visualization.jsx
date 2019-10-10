import React, { Component } from "react";
import "./App.css";

import Header from "../components/header/Header";
import Details from "../components/details/Details";

class Visualization extends Component {

    render() {
        const { title } = this.props.match.params

        return (
            <div className="app">
                <div className="app-content">
                    <Header />
                    <Details title={title}/>
                </div>
            </div>
        );
    }
}

export default Visualization;