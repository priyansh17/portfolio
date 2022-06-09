import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import RingLoader from "react-spinners/RingLoader";

function Pacman(props) {

    const style1 = { position: "fixed", top: "30vh", left: "45vw", transform: "translate(-50%, -50%)" };
    const style2 = { position: "fixed", top: "40vh", left: "50vw", transform: "translate(-50%, -50%)" };
    return (
        <div>
            <div style={style1}>
                <RingLoader
                    color={"#e9f507"}
                    loading={props.Load}
                    size={300}
                    speedMultiplier={2}
                />
            </div>
            <div style={style2}>
                <PacmanLoader
                    color={"#e9f507"}
                    loading={props.Load}
                    size={60}
                    speedMultiplier={2}
                />
            </div>
        </div>

    );
}

export default Pacman;