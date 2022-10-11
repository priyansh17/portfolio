import React from 'react';
import staticData from '../stringConst';
import { Button, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faHome} from '@fortawesome/free-solid-svg-icons';
// function HeaderIcon({hasIcon, Icon}){
//     if ({hasIcon}){
//         return <FontAwesomeIcon style={{ width: 'auto', color: 'whitesmoke' }} icon={Icon} size={'1x'} />
//     }
// }
function BackHome (props) {
    return (
        <a style={{position: 'absolute', left: 5}} key={props.index} rel="noreferrer" href={props.url}>
            <FontAwesomeIcon style={{ width: 'auto', cursor: 'pointer', color: 'whitesmoke'}} icon={props.icon} size={'1x'}/>
            <p id="BackHome">&nbsp;Mainpage</p>
        </a>
    )
}

function PageHeader(props) {
    return (
        <Container style={{display: 'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <BackHome icon={faBackward} index={0} url="/#/mainPage" />
            <p id='pageHeader'>{staticData[props.header]}</p>
            {/* <HeaderIcon hasIcon={props.hasIcon} icon={props.icon} />   ToDo */}  
            
        </Container>
    );
}

export default PageHeader;