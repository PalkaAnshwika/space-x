import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import InitialLaunchPage from './initial-launch-page';
import CircularProgress from '@material-ui/core/CircularProgress';
import LaunchFilter from './launch-filter';
import './landing-page.css';

const LandingPage = () => {
    const history = useHistory();
    const [initialLaunchResponse, setInitialLaunchResponse] = useState([]);
    const [successQuery, setSuccessQuery] = useState('');
    const [launchYearQuery, setLaunchYearQuery] = useState('');
    const [landingStatusQuery, setLandingStatusQuery] = useState('');
    const [isSpinner, setIsSpinner] = useState(true);
    const LANDING_URL = 'https://api.spacexdata.com/v3/launches?limit=100';
    const LAUNCH_SUCCESS_URL = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${successQuery}`;
    const LAUNCH_YEAR_AND_LAUNCH_SUCCESS_URL = `https://api.spacexdata.com/v3/launches?limit=100&&launch_success=${successQuery}&launch_year=${launchYearQuery}`;
    const LAUNCH_YEAR_AND_LAND_SUCCESS_URL = `https://api.spacexdata.com/v3/launches?limit=100&&land_success=${landingStatusQuery}&launch_year=${launchYearQuery}`;
    const LAUNCH_AND_LAND_SUCCESS_URL = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${successQuery}&land_success=${landingStatusQuery}`;
    const ALL_SUCCESS_URL = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${successQuery}&land_success=${landingStatusQuery}&launch_year=${launchYearQuery}`;

    useEffect(() => {
        if((!successQuery && !launchYearQuery && !landingStatusQuery) || (!successQuery && launchYearQuery && !landingStatusQuery) || (!successQuery && !launchYearQuery && landingStatusQuery)) {
            getResponseFromAPI(LANDING_URL);
            history.push('/');
        } else {
            handleFilterQueries(successQuery, launchYearQuery, landingStatusQuery);
        }
    }, [successQuery, launchYearQuery, landingStatusQuery]);

    const getResponseFromAPI = async (url) => {
        setIsSpinner(true);
        const response = await fetch(url);
        const data = await response.json();
        setInitialLaunchResponse(data);
        setIsSpinner(false);
    };

    const handleFilterQueries = (successQuery, launchYearQuery, landingStatusQuery) => {
        if(successQuery && !launchYearQuery && !landingStatusQuery) {
            getResponseFromAPI(LAUNCH_SUCCESS_URL);
            history.push('/launch=' + successQuery);
        } else if(successQuery && landingStatusQuery && !launchYearQuery) {
            getResponseFromAPI(LAUNCH_AND_LAND_SUCCESS_URL);
            history.push('/launch=' + successQuery + '/land=' + landingStatusQuery);
        } else if(launchYearQuery && landingStatusQuery && !successQuery) {
            getResponseFromAPI(LAUNCH_YEAR_AND_LAND_SUCCESS_URL);
            history.push('/year=' + parseInt(launchYearQuery) + '/land=' + landingStatusQuery);
        } else if(launchYearQuery && !landingStatusQuery && successQuery) {
            getResponseFromAPI(LAUNCH_YEAR_AND_LAUNCH_SUCCESS_URL);
            history.push('/year=' + parseInt(launchYearQuery) + '/launch=' + successQuery);
        } else {
            getResponseFromAPI(ALL_SUCCESS_URL);
            history.push('/year=' + parseInt(launchYearQuery) + '/launch=' + successQuery + '/land=' + landingStatusQuery);
        }
    };

    const getLaunchYear = (val) => {
        setLaunchYearQuery(val);
    };

    const getLaunchStatus = (val) => {
        setSuccessQuery(val);
    };

    const getLandingStatus = (val) => {
        setLandingStatusQuery(val);
    };

    return (
        <div>
            <h2 className="headline">SpaceX Launch Programs</h2>
            <LaunchFilter filterLaunchYear = {getLaunchYear} filterSuccessfulLaunch={getLaunchStatus} filterSuccessfulLanding={getLandingStatus}/>
            {isSpinner ?  <CircularProgress /> : null}
            <div className="flexLayout">
                {initialLaunchResponse.length ? initialLaunchResponse.map(res => (
                    <InitialLaunchPage
                        key = {res.flight_number}
                        spaceXImages= {res.links.mission_patch_small}
                        missionName = {res.mission_name}
                        flightNumber = {res.flight_number}
                        missionIds = {res.mission_id}
                        launchYear = {res.launch_year}
                        successfulLaunch = {res.launch_success === null ? 'null' : res.launch_success}
                        successfulLanding = {res.rocket.first_stage.cores.map(x => x.land_success === null ? 'null': x.land_success)}
                    />
                )): <div className="noResults"><h3 hidden={isSpinner} className="noDataColor">No results</h3></div>}
            </div>
            <p className="textStyle">Developed by: Palka Anshwika</p>
        </div>
    )
};

export default LandingPage;
