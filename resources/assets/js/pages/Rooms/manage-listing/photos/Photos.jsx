import React from 'react';
import Photostitle from './photostitle/Photostitle';
import property_help from '../img/property-help.png';
import Photosbutton from './photosbutton/Photosbutton';
import FileUploadProgress from 'react-fileupload-progress';
import './photos.css'
import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from 'react-sortable-hoc';
import PhotoItem from './PhotoItem';
import { timingSafeEqual } from 'crypto';

const ProgressBar = (props) => {
    return (
        <div className="progress-bar" id="imageuploadprogressbar">
            <Filler percentage={props.percentage} />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

const SortableItem = SortableElement(({ value, removeHandler }) => {

    return <PhotoItem value={value} removeHandler={removeHandler} />
});
const SortableList = SortableContainer(({ items, highlightHandler, featureHandler, removeHandler }) => {

    return (
        <ul id="js-photo-grid" className="row list-unstyled all-slides d-flex flex-wrap ui-sortable" style={{ paddingTop: '50px' }}>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} highlightHandler={highlightHandler} featureHandler={featureHandler} removeHandler={removeHandler} />
            ))}
        </ul>
    );
});

var progressActiveCheck = false;
var progresstimer;

class Photos extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            photo_list: [],
            percentage: 0,
        }
        this.customFormRenderer = this.customFormRenderer.bind(this)
        this.featureImage = this.featureImage.bind(this)
        this.changeHighlight = this.changeHighlight.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
    }

    componentDidMount() {
        progressActiveCheck = false;
        axios.get(`/ajax/manage-listing/${this.props.match.params.roomId}/photos_list`)
            .then(res => {
                this.setState({
                    photo_list: res.data
                })
            })
        let active_lists = document.getElementsByClassName('nav-active')
        for (let i = 0; i < active_lists.length; i++) {
            active_lists[i].classList.remove("nav-active");
        }
        let room_step = 'photos'
        let current_lists = document.getElementsByClassName(`nav-${room_step}`)
        for (let i = 0; i < current_lists.length; i++) {
            current_lists[i].classList.add('nav-active')
            // active_lists[i].classList.remove("nav-active");
        }
    }

    beforeSend(request) {
        document.querySelector("._react_fileupload_progress_content").setAttribute("style", "display:none");
        document.getElementById("imageuploadprogressbar").setAttribute("style", "opacity:0");
        document.getElementById("checkmessage").innerHTML = ""
        progressActiveCheck = true
        return request;
    }

    formGetter() {
        return new FormData(document.getElementById('customForm'));
    }
    customFormRenderer(onSubmit) {
        // let check = 0
        // check = check + 1
        // if (document.getElementById("mycustom") && check > 1) {
        //     document.getElementById("mycustom").setAttribute("style", "opacity:0.5");
        // }


        return <form id='customForm' style={{ marginBottom: '15px', display: 'unset' }} encType="multipart/form-data" method='post' >
            <div id="js-photos-grid" className="photo-encourage">
                <div className="row row-table">
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="add-photos-button w-100 text-center">
                            <button id="photo-uploader" className="btn text-center btn-large row-space-2" style={{ position: 'relative', zIndex: 0 }}>
                                <i className="flaticon-camera light-gray fs-44 fw-normal" />
                                <span className="photosnote">Minimum 1 photo required <b className="requiredRJ">*</b> <br /> Max Filesize = 5MB <br /></span>
                            </button>
                            <div id="fileupload-progress-container" className="upload-progress">
                                <div className="progressbar_container">
                                </div>
                            </div>
                            {/* <input style={{display: 'block'}} type="file" name='file' id="exampleInputFile" /> */}
                            <input id="fileupload" className="fileupload" type="file" name="photos[]" multiple onChange={onSubmit} />
                        </div>
                        <br />
                    </div>
                    <div className="h4 text-right col-sm-12 text-muted" id="photo_count" ng-show="photos_list.length > 0" style={{ display: 'block' }}>
                        <small className="ng-binding">{this.state.photo_list.length} photo<span ng-show="photos_list.length > 1"  >s</span></small>
                    </div>
                </div>
            </div>
        </form>
    }
    featureImage(photo_id) {
        axios.post(`/ajax/manage-listing/featured_image`, { id: this.props.match.params.roomId, photo_id: photo_id })
            .then(res => {
                this.setState({
                    photo_list: res.data
                })
            })
    }
    removeImage(photo_id) {
        axios.post(`/ajax/manage-listing/${this.props.match.params.roomId}/delete_photo`, { photo_id: photo_id })
            .then(res => {
                let photo_list = this.state.photo_list
                let photo_index = photo_list.findIndex((photo) => {
                    return photo.id == photo_id
                })

                if (photo_index > -1) {
                    photo_list.splice(photo_index, 1)
                    this.setState({
                        photo_list: photo_list
                    })
                }


            })
    }
    changeHighlight(event, photo_id) {
        let value = event.target.value

        axios.post(`/ajax/manage-listing/photo_highlights`, { data: value, photo_id: photo_id })
            .then(res => {
                console.log(res)

            })
    }
    onSortEnd({ oldIndex, newIndex }) {
        this.setState({
            photo_list: arrayMove(this.state.photo_list, oldIndex, newIndex)
        }, () => {
            //change_photo_order
            let image_ids = this.state.photo_list.map((listing) => {
                return listing.id
            })
            axios.post(`/ajax/manage-listing/change_photo_order`, { id: this.props.match.params.roomId, image_id: image_ids })
                .then(res => {
                    this.featureImage(this.state.photo_list[0].id)
                })
        })
    };
    render() {

        let token = document.head.querySelector('meta[name="csrf-token"]');
        if (token) {
            window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
        } else {
            console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
        }
        return (
            <div className="manage-listing-content-wrapper clearfix">
                <div className="listing_whole col-md-8" id="js-manage-listing-content">
                    <div className="common_listpage">
                        <Photostitle roomId={this.props.match.params.roomId} />

                        <div className="mycustom" id="mycustom">
                            <FileUploadProgress key='ex1' url={`/ajax/rooms/add_photos/${this.props.match.params.roomId}`}

                                beforeSend={this.beforeSend.bind(this)}

                                onProgress={(e, request, progress) => {
                                    progressActiveCheck ?
                                        console.log("active in upload", progressActiveCheck) :
                                        console.log("inactive in upload", progressActiveCheck);
                                    if (progressActiveCheck == true) {
                                        
                                        progressActiveCheck = false
                                        
                                        if (e.total != 192) {
                                            document.getElementById("checkmessage").innerHTML = "&nbsp;&nbsp;Uploading..."
                                            var rate = 100 / ((e.total / 4000) * 1);
                                            if (rate > 100) {
                                                rate = rate - 50;
                                            }
                                            var wholerate = 0;
                                            wholerate = wholerate + rate;
                                            document.getElementById("myprogressbar").setAttribute("style", "opacity:1;");
                                            document.getElementById("imageuploadprogressbar").setAttribute("style", "opacity:1");
                                            this.setState({
                                                percentage: wholerate
                                            })
                                            progresstimer = setInterval(
                                                () => {
                                                    console.log(wholerate)
                                                    if (wholerate < (100 - rate)) {
                                                        wholerate = wholerate + rate;
                                                        this.setState({
                                                            percentage: wholerate
                                                        })
                                                    } else {
                                                        clearInterval(progresstimer);
                                                    }
                                                },
                                                700)
                                        } else {

                                            document.getElementById("myprogressbar").setAttribute("style", "opacity:1;");
                                            document.getElementById("imageuploadprogressbar").setAttribute("style", "opacity:1")
                                            this.setState({
                                                percentage: 100
                                            })
                                        }
                                    }
                                }}
                                onLoad={(e, request) => {
                                    console.log("on Load!")
                                    let result = JSON.parse(request.response);
                                    clearInterval(progresstimer);
                                    this.setState({
                                        photo_list: result.succresult,
                                        percentage: 100,
                                    });
                                    setTimeout(() => { document.getElementById("checkmessage").innerHTML = "&nbsp;&nbsp;Successfully Uploaded!" }, 500)
                                }}
                                onError={(e, request) => { console.log('error', e, request); setTimeout(() => { document.getElementById("checkmessage").innerHTML = "&nbsp;&nbsp;Failed Upload!" }, 500); }}
                                onAbort={(e, request) => { console.log('abort', e, request); setTimeout(() => { document.getElementById("checkmessage").innerHTML = "&nbsp;&nbsp;Aborted Upload!" }, 500); }}
                                formGetter={this.formGetter.bind(this)}
                                formRenderer={this.customFormRenderer.bind(this)}
                            />
                        </div>
                        <div id="myprogressbar" style={{ opacity: 0 }}>
                            <ProgressBar percentage={this.state.percentage} /><div id="checkmessage"></div>
                        </div>

                        <SortableList distance={1} items={this.state.photo_list} onSortEnd={this.onSortEnd} axis='xy' highlightHandler={this.highlightHandler} removeHandler={this.removeImage} />
                        <Photosbutton roomId={this.props.match.params.roomId} />
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 listing_desc">
                    <div className="manage_listing_left">
                        <img src={property_help} alt="property-help" className="col-center" width="75" height="75" />
                        <div className="amenities_about">
                            <h4>Guests Love Photos</h4>
                            <p>We recommend using good quality landscape oriented photos (3:2 or 4:3 aspect ratio recommended).</p>
                            <p>Include a few well-lit photos.</p>
                            <p>Cell phone photos are just fine.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Photos;