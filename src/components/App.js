import React, {Component} from 'react';
import './App.css';
import {Image} from 'cloudinary-react';
import MaterialIcon from 'material-icons-react';

const CLOUDINARY_UPLOAD_PRESET = 'es7wvtio';
const CLOUD_NAME = 'ucg';
const CLOUD_JSON = 'browser_upload';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
const CLOUDINARY_RESPONSE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${CLOUD_JSON}.json`;

class App extends Component {
    state = {
        uploadedFile: null,
        descriptionValue: '',
        gallery: []
    };
    selectFileHandler(e) {
        this.setState({
            uploadedFile: e.target.files[0]
        });
    };
    submitFileHandler() {
        console.log(this.state.uploadedFile);
        const fd = new FormData();
        fd.append('file', this.state.uploadedFile, this.state.uploadedFile.name);
        fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        fd.append('folder', CLOUD_JSON);
        fd.append('tags', CLOUD_JSON);
        fd.append('context', `alt=${this.state.descriptionValue}`);
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
                    descriptionValue: ''
                })
            })
            .then(() => {
                // cache cloudinary have 1 min delay
                this.initImagesResponse()
            })
            .catch(err => {
                console.error(err);
            })
    };
    descriptionHandler (e) {
        this.setState({
            descriptionValue: e.target.value
        })
    };
    componentDidMount() {
        this.initImagesResponse();
    };
    initImagesResponse() {
        const config = {
            method: "GET"
        };
        fetch(CLOUDINARY_RESPONSE_URL, config)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data.resources);
                const gallery = data.resources.map((item) => {
                    item.custom_width = 300;
                    if (!item.context) {
                        item.context = {}
                    }
                    if (!item.context.custom) {
                        item.context.custom = {alt: ''}
                    }
                    return item;
                });
                this.setState({
                    gallery: gallery
                })
            })
            .catch(err => {
                console.error(err);
            })
    };
    editDescription(e, i) {
        const editVal = e.target.value;
        const editItem = this.state.gallery[i];

        const newItem = Object.assign({}, editItem, {context:{custom:{alt: editVal}}});

        let editItems = this.state.gallery;
        editItems = editItems.slice(0, i).concat(newItem, editItems.slice(i + 1));
        console.log(editItems);
        this.setState({gallery: editItems})
    };
    removeElement(e, i) {
        const removedItem = this.state.gallery[i];
        console.log(removedItem.public_id);
        let removedItems = this.state.gallery;
        removedItems = removedItems.slice(0, i).concat(removedItems.slice(i + 1));
        this.setState({gallery: removedItems});

        // didn't find correct removing file from browser without backend

        // fetch('https://api.cloudinary.com/v1_1/ucg/remove', {method: 'POST', body: JSON.stringify({public_id: removedItem.public_id})})
        //     .then(data => {
        //         console.log(data)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })
    }
    fullSize(e, i) {
        const item = this.state.gallery[i];
        if (item.custom_width !== item.width) {
            item.custom_width = item.width;
        } else {
            item.custom_width = 300;
        }
        let newItems = this.state.gallery;
        newItems = newItems.slice(0, i).concat(item, newItems.slice(i + 1));
        this.setState({gallery: newItems});
    }
    render() {
        const {gallery} = this.state;
        let galleryItems;
        if (gallery) {
            galleryItems = gallery.map((galleryItem, i) => <li key={i} className="img_item">
                <div onClick={(e) => this.fullSize(e, i)} data-tooltip={galleryItem.context.custom.alt} className="wrapper_img">
                    <Image cloudName="ucg" publicId={galleryItem.public_id} width={galleryItem.custom_width} crop="scale"/>
                </div>
                <div className="group">
                    <input type="text" className="img_descr" onChange={(e) => this.editDescription(e, i)} value={galleryItem.context.custom.alt}/>
                    <div className="bar"> </div>
                    <button className="save_descr"><MaterialIcon icon="save_alt" color="#fafafa" /></button>
                </div>
                <span onClick={(e) => this.removeElement(e, i)} className="remove"><MaterialIcon icon="close" color='#fafafa' /></span>
            </li>)
        } else {
            galleryItems = <li className="no_img">No images here</li>;
        }
        return (
            <div className="app">
                <h1>Yatis image</h1>
                <input type="file" id="img_load" className="img_load" onChange={(e) => this.selectFileHandler(e)}/>
                <label htmlFor="img_load">Pick your image</label>
                <div className="group">
                    <label htmlFor="img_description">Image Description</label>
                    <input className="img_description" value={this.state.descriptionValue} onChange={(e) => this.descriptionHandler(e)} type="text"/>
                    <div className="bar"> </div>
                </div>
                <button onClick={() => this.submitFileHandler()}>Upload Image</button>
                <ul className="list_item_img">
                    {galleryItems}
                </ul>
            </div>
        );
    }
}

export default App;
