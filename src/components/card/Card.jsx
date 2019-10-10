import React, { Component } from "react";

import { Link } from "react-router-dom";

class Card extends Component {
    render() {
        return (
            <Link className="card" to={`/visualization/${this.props.title}`}>
                <div className="info">
                    <p className="desc"> {this.props.description}</p>
                </div>
                <img src={this.props.imageUrl} alt="" />
            </Link>
        );
    }
}

export default Card;