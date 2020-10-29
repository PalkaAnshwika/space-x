import React, {useState, useEffect} from 'react';
import InitialLaunchPage from './Initial-Launch-Page';
import { makeStyles } from '@material-ui/core/styles';
import LaunchYearFilter from './launch-year-filter';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: '#f3f3f3'
    },
    headline: {
        textAlign: 'left',
        marginLeft: '1.4em',
        marginBottom: '0',
        marginTop: '0'
    },
    flexLayout: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textStyle: {
        color: 'black',
        fontWeight: '700',
        fontSize: '13px',
    },
}));

const LandingPage = () => {
    const classes = useStyles();
    const [initialLaunchResponse, setInitialLaunchResponse] = useState([]);
    const [successQuery, setSuccessQuery] = useState('');
    const [launchYearQuery, setLaunchYearQuery] = useState('');
    const [landingStatusQuery, setLandingStatusQuery] = useState('');
    const LANDING_URL = 'https://api.spacexdata.com/v3/launches?limit=100';
    const LAUNCH_SUCCESS_URL = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${successQuery}`;
    const LAUNCH_YEAR_URL = `https://api.spacexdata.com/v3/launches?limit=100launch_year=${launchYearQuery}`;
    const LAND_SUCCESS_URL = `https://api.spacexdata.com/v3/launches?limit=100&launch_status=${landingStatusQuery}`;

    useEffect(() => {
        if(!successQuery && !launchYearQuery && !landingStatusQuery) {
            getResponseFromAPI(LANDING_URL);
        } else if(successQuery) {
            getResponseFromAPI(LAUNCH_SUCCESS_URL);
        } else if(launchYearQuery) {
            getResponseFromAPI(LAUNCH_YEAR_URL)
        } else {
            getResponseFromAPI(LAND_SUCCESS_URL);
        }
    }, [successQuery, launchYearQuery, landingStatusQuery]);

    const getResponseFromAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setInitialLaunchResponse(data);
    };

    const getLaunchYear = (val) => {
        setLaunchYearQuery(val);
        getResponseFromAPI(LAUNCH_YEAR_URL);
    };

    const getLaunchStatus = (val) => {
        setSuccessQuery(val);
        getResponseFromAPI(LAUNCH_SUCCESS_URL);
    };

    const getLandingStatus = (val) => {
        setLandingStatusQuery(val);
        getResponseFromAPI(LAND_SUCCESS_URL);
    };

    return (
        <div>
            <h2 className={classes.headline}>SpaceX Launch Programs</h2>
            <LaunchYearFilter filterLaunchYear = {getLaunchYear} filterSuccessfulLaunch={getLaunchStatus} filterSuccesfulLanding={getLandingStatus}/>
            <div className={classes.flexLayout}>
                {initialLaunchResponse.map(res => (
                    <InitialLaunchPage
                        key = {res.flight_number}
                        spaceXImages= {res.links.mission_patch_small}
                        missionName = {res.mission_name}
                        flightNumber = {res.flight_number}
                        missionIds = {res.mission_id}
                        launchYear = {res.launch_year}
                        successfulLaunch = {res.launch_success}
                        successfulLanding = {res.rocket.first_stage.cores.map(x => x.land_success === null ? 'N/A': x.land_success)}
                    />
                ))}
            </div>
            <p className={classes.textStyle}>Developed by: Palka Anshwika</p>
        </div>
    )
};

export default LandingPage;
