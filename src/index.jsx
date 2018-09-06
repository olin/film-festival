import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import VideoInfo from 'video-info';

/**
 * The main React container for the app. It holds the state and passes it down
 * as props to its child components.
 */
class App extends React.Component {



    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/test" 
                        component={props => <VideoInfo />}
                        />
                    <Route exact path="/">
                        <div>Here is the main page.</div>
                    </Route>

                </Switch>
            </BrowserRouter>
            // <div>Test</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));