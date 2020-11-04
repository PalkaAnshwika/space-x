import React from 'react';
import './initial-launch-page.css';

const InitialLaunchPage = ({spaceXImages, missionName, flightNumber, missionIds, launchYear, successfulLaunch, successfulLanding}) => {
    return (
        <div className="componentStyle">
            <img src = {spaceXImages} alt = '' className="imageWidth"/>
            <p className="textStyleInitialLaunch">{missionName + ' #' + flightNumber}</p>
            <p className="missionIdTextStyleIL">Mission Ids:
                {missionIds.length ? missionIds.map(mid => (
                    <li className="missionIdValueIL" key={mid}>
                        {mid}
                    </li>
                )) : <li className="missionIdValueIL">
                    N/A
                </li>}
            </p>
            <p className="missionIdTextStyleIL">Launch Year: <span className="missionIdValueIL">{launchYear}</span></p>
            <p className="missionIdTextStyleIL">Successful Launch: <span className="missionIdValueIL">{successfulLaunch.toString()}</span></p>
            <p className="missionIdTextStyleIL">Successful Landing: <span className="missionIdValueIL">{successfulLanding.toString()}</span></p>
        </div>
    )
};

export default InitialLaunchPage;
