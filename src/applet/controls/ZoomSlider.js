import React from 'react';
import Slider from '@material-ui/core/Slider';
import { INIT_ZOOM, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from "../appletConfig";
import './ZoomSlider.css';

export default function ZoomSlider() {
    const [zoomVal, setZoomVal] = React.useState(INIT_ZOOM);
    
    return <>
        <div id='zoom-slider-container'>
            <span className='sideways-text'>zoom</span>
            <Slider
                value = {zoomVal}
                orientation = 'vertical'
                defaultvalue = {INIT_ZOOM}
                aria-labelledby = 'zoom-vertical-slider'
                step = {ZOOM_STEP}
                min = {MIN_ZOOM}
                max = {MAX_ZOOM}
            />
        </div>
    </>
}