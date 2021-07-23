import React from 'react';
import Slider from '@material-ui/core/Slider';
import { INIT_ZOOM, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from "../appletConfig";
import './ZoomSlider.css';

function ZoomSlider({handleZoomChange}, ref) {
    const [zoomVal, setZoomVal] = React.useState(INIT_ZOOM);
    
    React.useImperativeHandle(ref, () => ({
        handleZoomVal(value){
            setZoomVal(value)
        }
    }), []);

    return <div id='zoom-slider-container'>
            <span className='sideways-text'>zoom</span>
            <Slider
                value = {zoomVal}
                orientation = 'vertical'
                defaultValue = {INIT_ZOOM}
                aria-labelledby = 'zoom-vertical-slider'
                step = {ZOOM_STEP}
                min = {MIN_ZOOM}
                max = {MAX_ZOOM}
                onChange = {handleZoomChange}
            />
        </div>
}

export default React.forwardRef(ZoomSlider);