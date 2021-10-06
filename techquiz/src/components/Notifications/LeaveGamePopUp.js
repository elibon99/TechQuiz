import React from 'react';
import AlertImg from "./AlertImg";

const LeaveGamePopUp = (props) => {
    function allowTransition(){
        props.setConfirm(false);
        props.confirmCallback(true);
        props.stopTimer();
        props.forfeitGameSet(props.gameID);
    }

    function blockTransition(){
        props.setConfirm(false);
        props.confirmCallback(false);
    }

    return(
        <div id="pop-up-alert" className="pop-up-alert-container z-depth-3">
            <div className="pop-up-alert-title">
                <AlertImg/>
                <h6 className="pop-up-alert-title-text">Alert</h6>
            </div>
            <div className="pop-up-alert-message-container">
                <p className="pop-up-alert-message-text">
                    Are you sure you want to leave the game? You will receive 0 points for this gameset.
                </p>
                <div className="pop-up-btn-container">
                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 pop-up-btn" onClick={allowTransition}>Yes</button>
                    <button className="btn waves-effect waves-light #64b5f6 red lighten-2 pop-up-btn" onClick={blockTransition}>No</button>
                </div>

            </div>

        </div>
    )
}

export default LeaveGamePopUp;