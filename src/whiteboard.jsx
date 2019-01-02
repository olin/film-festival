import ReactDOM from 'react-dom';
import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';

/**
 * The main React container for the app. It holds the state and passes it down
 * as props to its child components.
 */
export default class Whiteboard extends React.Component {

    constructor(props) {
        super(props);
        this.client = io('http://localhost:9091');
        this.client.on('points', this.handleUpdate)
        this.state = {points: []}
    };

    handleUpdate = (msg) => {
        console.log(msg);
        this.setState({points: msg.points});
    }

    drawLines = (p) => {
        let points = [];

        p.setup = () => {
            p.createCanvas(600,400, p.WEBGL)
            p.colorMode(p.HSB);
        };

        p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
            if (props.points){
              points = props.points
            }
          };

        p.draw = () => {
            let i = 1;
            p.stroke(255)
            p.line(20,100,20,100);
            for (i = 1; i < points.x.length; i++) {
                p.stroke(i*15, 255, 120)
                // p.point(points[i][0], points[i][1])
                p.line(points[i-1].x, points[i-1].y, points[i].x, points[i].y);
            }
        };
    };

    render() {
        return (<div>Yo!<P5Wrapper sketch={this.drawLines} points={this.state.points}/></div>);     
    }
}

