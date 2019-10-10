import React, { Component } from "react";

import "./Details.scss";
import visualizationsData from "../../data/visualizationsData";

class Details extends Component {

    render() {
        const visualizationsInfo = visualizationsData[0][this.props.title];
        return (
            <div className="details">
                <a href={visualizationsInfo.redditUrl}>{visualizationsInfo.description}</a>
                <iframe title={this.props.id} className="frame" src={`/visualizations/${visualizationsInfo.title}.html`}
                    width="550px" height="550px" frameBorder="0">
                </iframe>
            </div>
        );
    }
}

export default Details;