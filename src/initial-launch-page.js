import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    imageWidth: {
        width: theme.spacing(20),
        backgroundColor: '#f3f3f3',
        marginTop: '0.5em'
    },
    textStyle: {
        color: 'darkblue',
        fontWeight: '700',
        fontSize: '13px',
        wordWrap: 'break-word',
        width: '145px'
    },
    missionIdTextStyle: {
        color: 'black',
        fontWeight: '700',
        fontSize: '13px'
    },
    missionIdValue: {
        fontWeight: '400',
        color: 'darkblue'
    },
    componentStyle: {
        backgroundColor: 'white',
        width: '23.5%',
        marginLeft: '6px',
        marginBottom: '6px'
    }
}));

const InitialLaunchPage = ({spaceXImages, missionName, flightNumber, missionIds, launchYear, successfulLaunch, successfulLanding}) => {
    const classes = useStyles();
    return (
        <div className={classes.componentStyle}>
            <img src = {spaceXImages} alt = '' className={classes.imageWidth}/>
            <p className={classes.textStyle}>{missionName + ' #' + flightNumber}</p>
            <p className={classes.missionIdTextStyle}>Mission Ids:
                {missionIds.length ? missionIds.map(mid => (
                    <li className={classes.missionIdValue} key={mid}>
                        {mid}
                    </li>
                )) : <li className={classes.missionIdValue}>
                    N/A
                </li>}
            </p>
            <p className={classes.missionIdTextStyle}>Launch Year: <span className={classes.missionIdValue}>{launchYear}</span></p>
            <p className={classes.missionIdTextStyle}>Successful Launch: <span className={classes.missionIdValue}>{successfulLaunch.toString()}</span></p>
            <p className={classes.missionIdTextStyle}>Successful Landing: <span className={classes.missionIdValue}>{successfulLanding.toString()}</span></p>
        </div>
    )
};

export default InitialLaunchPage;
