import React, { Component } from "react";

import "./Details.scss";
import visualizationsData from "../../data/visualizationsData";


class Details extends Component {
    render() {
        const visualizationsInfo = visualizationsData[0][this.props.title];
        return (
            <div className="details">
                <a href={visualizationsInfo.redditUrl}>{visualizationsInfo.description}</a>
                <iframe title={this.props.id} className="frame" src={`https://datais-examples.surge.sh/${this.props.title}.html`}
                    width="520px" height="520px" frameBorder="0">
                </iframe>
            </div>
        );
    }
}

export default Details;