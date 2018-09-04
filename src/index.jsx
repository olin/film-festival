import ReactDOM from 'react-dom';
import React from 'react';

/**
 * The main React container for the app. It holds the state and passes it down
 * as props to its child components.
 */
class App extends React.Component {

    addSong = () => {
        this.store.dispatch({ type: 'SHOW_SONG_INPUT', val: true })
        // this.store.dispatch({type: 'ADD_SONG', uri: "asdf1234" });
    };


    render() {
        return (<div>Welcome to the Olin Film Festival!</div>);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));