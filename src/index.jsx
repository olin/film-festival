import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VideoInfoPanel from './video-info-panel';
import GuidePanel from './guide';
import Whiteboard from './whiteboard'

/**
 * The main React container for the app. It holds the state and passes it down
 * as props to its child components.
 */
class App extends React.Component {



    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/watch"
                        component={props => <VideoInfoPanel />}
                        />
                    <Route path="/guide"
                        component={props => <GuidePanel />}
                        />
                    <Route path="/draw"
                        component={props => <Whiteboard />}
                    <Route exact path="/">
                        <div>
                            <h1> Here is the main page.</h1>
                            <p><a href="/watch">Start the show</a></p>
                            <p><a href="/guide">Follow the show</a></p>
                            <p><a href="/draw">Draw something!</a></p>
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
            // <div>Test</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));