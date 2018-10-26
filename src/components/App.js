import React, {Component} from 'react';
import './App.css';
import {storage} from '../firebase';

class App extends Component {
    state = {
        uploadedFile: null,
        gallery: [],
        descriptionFile: ''
    };
    selectFileHandler = event => {
        this.setState({
            uploadedFile: event.target.files[0]
        });
    };
    submitFileHandler = () => {

        const uploadImg = storage.ref(`images/${this.state.uploadedFile.name}`).put(this.state.uploadedFile);
        uploadImg.on('state_changed', (snapshot) => {

        },
        (err) => {
            console.log(err)
        },
        () => {
            storage.ref('images').child(this.state.uploadedFile.name).getDownloadURL()
                .then(url => {
                    console.log(url)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    };
    descriptionHandler = (e) => {
        this.setState({
            descriptionFile: e.target.value
        })
    };
    removeItemImg = (e) => {
        let publicId = e.target.closest('.item_img').getAttribute('data-public');
        console.log(publicId);
    };
    componentDidMount() {
        // this.initImagesResponse();
    };
    initImagesResponse() {
        const config = {
            method: "GET"
        };
        return fetch('https://res.cloudinary.com/ucg/image/list/animals.json', config)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data.resources);
                this.setState({
                    gallery: data.resources
                })
            })
            .catch(err => {
                console.error(err);
            })
    };
    render() {
        return (
            <div className="app">
                <h1>Yatis image loader</h1>
                <input type="file" id="img_load" className="img_load" onChange={this.selectFileHandler}/>
                <label htmlFor="img_load">Pick your image</label>
                <div className="group">
                    <label htmlFor="img_description">Image Description</label>
                    <input className="img_description" onChange={this.descriptionHandler} value={this.state.descriptionFile} id="img_description" type="text"/>
                    <div className="bar"> </div>
                </div>
                <button onClick={this.submitFileHandler}>Upload Image</button>
                <ul className="list_img_items">

                </ul>
            </div>
        );
    }
}

export default App;
