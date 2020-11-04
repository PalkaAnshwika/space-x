import React, { useState, useEffect } from 'react';
import './launch-filter.css';
import usePreviousState from './custom-hooks/previous-state-hook';

const LaunchFilter = ({filterLaunchYear, filterSuccessfulLaunch, filterSuccessfulLanding}) => {
    const [isLaunchSuccess, setIsLaunchSuccess] = useState(false);
    const [isLaunchFailure, setIsLaunchFailure] = useState(false);
    const [isLandSuccess, setIsLandSuccess] = useState(false);
    const [isLandFailure, setIsLandFailure] = useState(false);
    const [isYearToggled, setIsYearToggled] = useState(false);
    const [currentYearState, setCurrentYearState] = useState();
    const previousYearState = usePreviousState(currentYearState);
    const previousYearToggledState = usePreviousState(isYearToggled);
    const Start_year = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

    useEffect(() => {
        if(currentYearState === previousYearState && isYearToggled !== previousYearToggledState) {
            filterLaunchYear('');
            setCurrentYearState('');
        } else {
            if(previousYearState) {
                document.getElementById(previousYearState).style.backgroundColor = '#AED581';
            }
            if(currentYearState) {
                document.getElementById(currentYearState).style.backgroundColor = '#71a832';
            }
            filterLaunchYear(currentYearState);
        }
        handleLaunchFilter(isLaunchSuccess, isLaunchFailure);
        handleLandFilter(isLandSuccess, isLandFailure);

    },[currentYearState, isYearToggled, isLaunchSuccess, isLaunchFailure, isLandSuccess, isLandFailure]);

    const handleLaunchFilter = (isLaunchSuccess, isLaunchFailure) => {
        if(isLaunchSuccess) {
            filterSuccessfulLaunch('true');
        } else if(isLaunchFailure) {
            filterSuccessfulLaunch('false');
        } else {
            filterSuccessfulLaunch('');
        }
    };

    const handleLandFilter = (isLandSuccess, isLandFailure) => {
        if(isLandSuccess) {
            filterSuccessfulLanding('true');
        } else if(isLandFailure) {
            filterSuccessfulLanding('false');
        } else {
            filterSuccessfulLanding('');
        }
    };

    const filterByLaunchYear = (e) => {
        setCurrentYearState(e.target.value);
        setIsYearToggled(!isYearToggled);
    };

    const filterBySuccessfulLaunch = (e) => {
        setIsLaunchSuccess(!isLaunchSuccess);
        setIsLaunchFailure(false);
    };

    const filterByFailedLaunch = () => {
        setIsLaunchFailure(!isLaunchFailure);
        setIsLaunchSuccess(false);
    };

    const filterBySuccessfulLanding = (e) => {
        setIsLandSuccess(!isLandSuccess);
        setIsLandFailure(false);
    };

    const filterByFailedLanding = () => {
        setIsLandFailure(!isLandFailure);
        setIsLandSuccess(false);
    };

    return (
        <div className="buttonDivStyle">
            <p className="missionIdTextStyle">Filters</p>
            <p className="launchYearStyle">Launch Year</p>
            {Start_year.map(year => (
                <button key={year} id={year} className="buttonStyle" onClick={filterByLaunchYear} value={year}>{year}</button>
            ))}
            <p className="launchYearStyle">Successful Launch</p>
            <button className={`${"buttonStyle"} ${isLaunchSuccess ? `${"buttonStyleFocused"}` : ''}`} value={true} onClick={filterBySuccessfulLaunch}>True</button>
            <button className={`${"buttonStyle"} ${isLaunchFailure ? `${"buttonStyleFocused"}` : ''}`} value={false} onClick={filterByFailedLaunch}>False</button>

            <p className="launchYearStyle">Successful Landing</p>
            <button className={`${"buttonStyle"} ${isLandSuccess ? `${"buttonStyleFocused"}` : ''}`} value={true} onClick={filterBySuccessfulLanding}>True</button>
            <button className={`${"buttonStyle"} ${isLandFailure ? `${"buttonStyleFocused"}` : ''}`} value={false} onClick={filterByFailedLanding}>False</button>
        </div>
    )
};

export default LaunchFilter;
