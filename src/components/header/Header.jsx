import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from '../../images/logo.svg';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="title">
                    <Link to="/">
                        <img src={logo} className="logo" alt="logo" />
                    </Link>
                    <h1>
                        <a href="https://www.reddit.com/r/dataisbeautiful/" className="link">
                            /r/dataisbeautiful</a> can be more beautiful!
                    </h1>
                </div>
                <div className="description">
                    Using <a href="https://openseadragon.github.io/" className="link"> openseadragon</a> to remix some top
                    dataisbeautiful visualizations to enable pan and zoom on the original vector images.
                </div>
                <div className="description">
                    How it works: <code className="code"><a style={{ textDecoration: 'None' }} href="https://github.com/shash678/datais-examples/blob/master/python_svg_to_tilemap/svg_to_tilemap.py" className="link"> <span role="img" aria-label="document">📄</span>svg_to_tilemap.py</a></code>
                </div>
            </div>
        );
    }
}
export default Header;