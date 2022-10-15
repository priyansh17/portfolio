import React from 'react';
import staticData from '../stringConst';
import { Container } from 'react-bootstrap';
import Navbar from '../Navbar';

// function HeaderIcon({hasIcon, Icon}){
//     if ({hasIcon}){
//         return <FontAwesomeIcon style={{ width: 'auto', color: 'whitesmoke' }} icon={Icon} size={'1x'} />
//     }
// }


// function BackHome(props) {
//     return (
//         <Link to={props.url}>
//             <p style={{ position: 'absolute', left: 5 }} key={props.index}>
//                 <FontAwesomeIcon style={{ width: 'auto', cursor: 'pointer', color: 'whitesmoke' }} icon={props.icon} size={'1x'} />
//                 <p id="BackHome">&nbsp;Mainpage</p>
//             </p>
//         </Link>
//     )
// }

function PageHeader(props) {
    return (
        <div>
            <Navbar />
            <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {/* <BackHome icon={faBackward} index={0} url="/mainPage" /> */}
                <p id='pageHeader'>{staticData[props.header]}</p>
                {/* <HeaderIcon hasIcon={props.hasIcon} icon={props.icon} />   ToDo */}

            </Container>
        </div>
    );
}

export default PageHeader;