import React from 'react';
import pdfIcon from '../media/pdf_icon.png';


function CertificateSliderModel(props) {

    const openPdf = () => {
        window.open(props.pdf, '_blank', 'noopener,noreferrer');
    };

    return (
        <div>
            <img alt="See pdf" src={pdfIcon}  onClick={openPdf} style={{height:"10vh", width:"10vh", borderRadius:"1vh", marginLeft:"auto", marginRight:"auto", cursor: "pointer"}}/>
            <p id="certificateText">{props.name}</p>
        </div>
    );
}

export default CertificateSliderModel;