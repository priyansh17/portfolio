import React from 'react';
import wip from '../media/WIP.jpg';
function SkillsPage(props) {
    return (
        <div>
            <img alt="Work In Progress" src={wip} style={{height:"100%", width:"100%"}}/>
        </div>
    );
}

export default SkillsPage;