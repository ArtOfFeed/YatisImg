import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'hfcizvyu';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ucg/image/upload';
const CLOUDINARY_API_KEY = '332768736618512';

class App extends Component {
    state = {
        uploadedFile: null,
        uploadedFileCloudinaryUrl: ''
    };
    selectFileHandler = event => {
        this.setState({
            uploadedFile: event.target.files[0]
        });
    };
    submitFileHandler = () => {
        console.log(this.state.uploadedFile);
        const fd = new FormData();
        fd.append('api_key', CLOUDINARY_API_KEY);
        fd.append('image', this.state.uploadedFile, this.state.uploadedFile.name);
        fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        axios.post(CLOUDINARY_UPLOAD_URL)
            .then((res) => {
                console.log(res);
            })
            .catch((err)=> {
                console.error(err);
            });
    };
    render() {
        return (
            <div className="App">
                <input type="file" id='img_load' onChange={this.selectFileHandler}/>
                <label htmlFor="img_load">Pick your image</label>
                <button onClick={this.submitFileHandler}>Upload Image</button>
            </div>
        );
    }
}

export default App;
