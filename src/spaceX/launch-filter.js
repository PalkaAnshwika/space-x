import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    missionIdTextStyle: {
        color: 'black',
        fontWeight: '700',
        marginLeft: '2em',
        fontSize: 'large',
        marginBottom: '8px'
    },
    missionIdValue: {
        fontWeight: '400',
        color: 'darkblue'
    },
    buttonStyle: {
        backgroundColor: '#AED581',
        border: 'none',
        width: '20%',
        height: '25px',
        borderRadius: '4px',
        fontFamily: 'serif',
        fontWeight: 'bold',
        marginBottom: '1em',
        marginLeft: '3em',
        cursor: 'pointer'
    },
    buttonFocused: {
        backgroundColor: '#8BC34A'
    },
    filterStyle: {
        marginLeft: '2em',
        fontSize: 'large',
        marginBottom: '8px'
    },
    buttonDivStyle : {
        width: '20%',
        textAlign: 'left',
        float: 'left',
        backgroundColor: 'white',
        marginLeft: '15px'
    },
    launchYearStyle: {
        borderBottom: '1px solid green',
        width: '46%',
        marginLeft: '28%',
        marginBottom: '8px',
        marginTop: '0',
        textAlign: 'center',
        fontSize: '11px'
    },
    textMarginTop: {
        marginTop: '1em'
    }

//    className={`${classes.buttonStyle} ${isYearSelected ? `${classes.buttonFocused}` : ''}`}

}));
const LaunchFilter = ({filterLaunchYear, filterSuccessfulLaunch, filterSuccessfulLanding}) => {
    const classes = useStyles();
    const [isLaunchSuccess, setIsLaunchSuccess] = useState(false);
    const [isLaunchFailure, setIsLaunchFailure] = useState(false);
    const [isLandSuccess, setIsLandSuccess] = useState(false);
    const [isLandFailure, setIsLandFailure] = useState(false);
    const [isYearSelected, setIsYearSelected] = useState();
    const Start_year = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

   const filterByLaunchYear = (e) => {
        setIsYearSelected(e.target.value);
        if(isYearSelected !== e.target.value) {
            filterLaunchYear(e.target.value);
        } else {
            filterLaunchYear('');
        }
    };

    const filterBySuccessfulLaunch = (e) => {
        const value = e.target.value;
        if(value === 'true') {
            setIsLaunchSuccess(!isLaunchSuccess);
            if(!isLaunchSuccess) {
                filterSuccessfulLaunch(value);
            } else {
                filterSuccessfulLaunch ('')
            }
        } else {
            setIsLaunchFailure(!isLaunchFailure);
            if(!isLaunchFailure) {
                filterSuccessfulLaunch(value);
            } else {
                filterSuccessfulLaunch ('')
            }
        }
    };

    const filterBySuccessfulLanding = (e) => {
        const value = e.target.value;
        if(value === 'true') {
            setIsLandSuccess(!isLandSuccess);
            if(!isLandSuccess) {
                filterSuccessfulLanding(value);
            } else {
                filterSuccessfulLanding ('')
            }
        } else {
            setIsLandFailure(!isLandFailure);
            if(!isLandFailure) {
                filterSuccessfulLanding(value);
            } else {
                filterSuccessfulLanding ('')
            }
        }
    };

    return (
        <div className={classes.buttonDivStyle}>
            <p className={classes.missionIdTextStyle}>Filters</p>
            <p className={classes.launchYearStyle}>Launch Year</p>
            {Start_year.map(year => (
                <button key={year} className={classes.buttonStyle} onClick={filterByLaunchYear} value={year}>{year}</button>
            ))}
            <p className={classes.launchYearStyle}>Successful Launch</p>
            <button className={classes.buttonStyle} value={true} onClick={filterBySuccessfulLaunch}>True</button>
            <button className={classes.buttonStyle} value={false} onClick={filterBySuccessfulLaunch}>False</button>

            <p className={classes.launchYearStyle}>Successful Landing</p>
            <button className={classes.buttonStyle} value={true} onClick={filterBySuccessfulLanding}>True</button>
            <button className={classes.buttonStyle} value={false} onClick={filterBySuccessfulLanding}>False</button>
        </div>
    )
};

export default LaunchFilter;
