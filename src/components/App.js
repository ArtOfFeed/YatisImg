import React, {Component} from 'react';
import './App.css';

const CLOUDINARY_UPLOAD_PRESET = 'hfcizvyu';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

class App extends Component {
    state = {
        uploadedFile: null,
        uploadedFileCloudinaryUrl: ''
    };
    selectFileHandler = (event) => {
        console.log(event.target.files[0])
    };
    submitFileHandler = () => {
        console.log('1')
    };
    render() {
        return (
            <div className="App">
                <input type="file" id='img_load' onChange={this.selectFileHandler}/>
                <label htmlFor="img_load">Pick your image</label>
                <button onSubmit={this.submitFileHandler}>Upload Image</button>
            </div>
        );
    }
}

export default App;
