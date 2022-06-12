import React from 'react';
import pdfIcon from '../media/pdf_icon.png';


function certificateSliderModel(props) {

    const openPdf = () => {
        window.open(props.pdf, '_blank', 'noopener,noreferrer');
    };

    return (
        <div>
            <img alt="See pdf" src={pdfIcon} onClick={openPdf} style={{height:"5vh", width:"5vh", borderRadius:"5vh"}}/>
            <p id="certificateText">{props.name}</p>
        </div>
    );
}

export default certificateSliderModel;