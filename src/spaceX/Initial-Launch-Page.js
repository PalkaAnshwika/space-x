import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    imageWidth: {
        width: theme.spacing(20)
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
    }
}));

const InitialLaunchPage = ({spaceXImages, missionName, flightNumber, missionIds, launchYear, successfulLaunch, successfulLanding}) => {
    const classes = useStyles();
    return (
        <div>
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
