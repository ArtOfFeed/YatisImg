import React, {Component} from 'react';
import './App.css';

class App extends Component {
    selectFileHandler = (event) => {
        console.log(event.target)
    };
    submitFileHandler = () => {

    };
    render() {
        return (
            <div className="App">
                <input type="file" id='img_load' onChange={this.selectFileHandler}/>
                <label htmlFor="img_load">Pick your image</label>
                <button>Upload Image</button>
            </div>
        );
    }
}

export default App;
