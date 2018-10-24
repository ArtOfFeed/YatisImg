import React, {Component} from 'react';
import './App.css';
import {Image} from 'cloudinary-react';

const CLOUDINARY_UPLOAD_PRESET = 'bs28jua5';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ucg/upload';

class App extends Component {
    state = {
        uploadedFile: null,
        uploadedFileCloudinaryUrl: '',
        gallery: []
    };
    selectFileHandler = event => {
        this.setState({
            uploadedFile: event.target.files[0]
        });
    };
    submitFileHandler = () => {
        console.log(this.state.uploadedFile);
        const fd = new FormData();
        fd.append('file', this.state.uploadedFile, this.state.uploadedFile.name);
        fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        for (let pair of fd.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
        const config = {
            method: "POST",
            body: fd
        };
        return fetch(CLOUDINARY_UPLOAD_URL, config)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    uploadedFileCloudinaryUrl: data.secure_url
                });
            })
            .catch(err => {
                console.error(err);
            })
    };
    componentDidMount() {
        const config = {
            method: "GET"
        };
        fetch('https://api.cloudinary.com/v1_1/ucg/resources/image/upload', config)
            .then(res => {
                console.log(res.data.resources);
                this.setState({gallery: res.data.resources});
            })
            .catch(err => {
                console.error(err);
            })
    }
    render() {
        return (
            <div className="App">
                <input type="file" id='img_load' onChange={this.selectFileHandler}/>
                <label htmlFor="img_load">Pick your image</label>
                <button onClick={this.submitFileHandler}>Upload Image</button>
                <Image cloudName="demo" publicId={this.state.uploadedFileCloudinaryUrl} width="300" crop="scale"/>
            </div>
        );
    }
}

export default App;
