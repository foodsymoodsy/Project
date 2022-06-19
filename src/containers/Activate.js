import React,{useState} from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {verify} from '../actions/auth';
import './Button.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    mainDiv: {
        border: '2px solid #F25C05',
        margin: '60px 30vw',
        padding: '20px',
        backgroundColor: '#f9f8f7',
    }
}))

const Activate = ({ verify, match }) =>{
    const classes = useStyles();
    const [verified, setVerified] = useState(false);
    const verify_account= e => {
        const uid = match.params.uid;
        const token = match.params.token;
        verify(uid, token);
        setVerified(true);
    }

    if(verified) {
        return <Navigate to = '/' />
    }
    return (
        <div className={classes.mainDiv}>
           <div 
                className='d-flex flex-column justify-content-center align-items-center'
            >
                <h1>Verify your account:</h1>
            <button
                onClick={verify_account}
                style={{ marginTop: '50px' }}
                type='button'
                className='signupBtnTheme1'
            >
                Verify
            </button>
           </div>
        </div>

    );
};

export default connect(null,{verify})(Activate);