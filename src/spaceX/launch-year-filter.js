import React from 'react';
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
    },
    filterStyle: {
        marginLeft: '2em',
        fontSize: 'large',
        marginBottom: '8px'
    },
    buttonDivStyle : {
        width: '28%',
        textAlign: 'left',
        float: 'left',
    },
    launchYearStyle: {
        borderBottom: '1px solid green',
        width: '42%',
        marginLeft: '20%',
        marginBottom: '8px',
        marginTop: '0',
        textAlign: 'center',
        fontSize: '14px'
    },
    textMarginTop: {
        marginTop: '1em'
    }
//     background-color: #8BC34A;

}));
const LaunchYearFilter = ({filterLaunchYear, filterSuccessfulLaunch, filterSuccesfulLanding}) => {
    const classes = useStyles();
    const Start_year = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

    const filterByLaunchYear = (e) => {
        filterLaunchYear(e.target.value);
    };

    const filterBySuccessfulLaunch = (e) => {
        filterSuccessfulLaunch(e.target.value);
    };

    const filterBySuccessfulLanding = (e) => {
        filterSuccesfulLanding(e.target.value);
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

export default LaunchYearFilter;
