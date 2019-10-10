import React from "react";
import "./App.css";

import Header from "../components/header/Header";
import Grid from "../components/grid/Grid";

function Home() {
    return (
        <div className="app">
            <div className="app-content">
                <Header />
                <Grid />
            </div>
        </div>
    );
}

export default Home;
