import React, { Component } from "react";

import "./Grid.scss";
import visualizationsData from "../../data/visualizationsData";

import Card from '../card/Card';

class Grid extends Component {
    constructor(props) {
        super()
        let visMap = visualizationsData[0];
        let visKeys = Object.keys(visMap)
        this.state = {
            visualizationCards: visKeys.map(key => <Card key={visMap[key].id} title={visMap[key].title}
                description={visMap[key].description} imageUrl={visMap[key].imageUrl} />)
        }
    }

    render() {
        return (
            <div className="grid">
                {this.state.visualizationCards}
            </div>
        );
    }
}

export default Grid;