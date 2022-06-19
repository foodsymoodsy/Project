import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup2 } from '../actions/auth';
import axios from 'axios';
import { Grid, TextField, Paper, makeStyles } from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import './Button.css';
import image from './google.jpeg';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    textTheme: {
        width: '90%'
    },
    h1Theme: {
        color: '#F25C05',
        marginTop:'30px'
    },
    link: {
        color: '#F25C05',
        textDecoration: 'none',
        padding: '0.1rem',
        cursor: 'pointer',
        fontWeight: 'bold',

    },
}))

const Signup2 = ({ signup2, isAuthenticated }) => {
    const classes = useStyles();
    const [accountCreated, setAccountCreated] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const handleClosePopup = () => setShowPopup(false);
    const handleShowPopup = () => setShowPopup(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: '',
        // role:'organisation'
    });
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    const { name, email, password, re_password } = formData;
    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        validate({ [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
            signup2(name, email, password, re_password);
            setAccountCreated(true);
            // handleShowPopup();
        }
        signup2(name, email, password, re_password);
    }

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = (/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&@? "]).*/).test(fieldValues.password) ? "" : "Password is not valid."
        if ('re_password' in fieldValues) {
            temp.re_password = formData.password == fieldValues.re_password ? "" : "Password is not valid."
        }
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    // if (accountCreated) {
    //     return <Navigate to='/loginOrganization' />
    // }
    return (
        <div className='container mt-2'>
            <h1 className={classes.h1Theme}>Sign Up</h1>
            <p><b>Create your account</b></p>
            <form onSubmit={e => onSubmit(e)}>
                <Grid container >
                    <Grid item xs={8}>
                        <Grid container spacing={3} >
                            <Grid item xs={8}>
                                <TextField className={classes.textTheme}
                                    variant="standard"
                                    label="Organization Name"
                                    name="name"
                                    value={name}
                                    size="small"
                                    required
                                    onChange={e => onChange(e)}

                                    {...(errors.name && { error: true, helperText: errors.name })}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField className={classes.textTheme}
                                    variant="standard"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    type="email"
                                    size="small"
                                    required
                                    onChange={e => onChange(e)}

                                    {...(errors.email && { error: true, helperText: errors.email })}
                                />
                            </Grid>
                            {/* <Grid item xs={8}>
                                <TextField className={classes.textTheme}
                                    variant="standard"
                                    label="User ID"
                                    name="userId"
                                    value={userId}
                                    size="small"
                                    onChange={e => onChange(e)}
                                />
                            </Grid> */}
                            <Grid item xs={8}>
                                <TextField className={classes.textTheme}
                                    variant="standard"
                                    label="Create Password"
                                    name="password"
                                    value={password}
                                    type="password"
                                    size="small"
                                    required
                                    autoComplete='on'
                                    onChange={e => onChange(e)}

                                    {...(errors.password && { error: true, helperText: errors.password })}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <div>
                                    <a className={classes.link} onClick={handleClickOpen('paper')}>Check Password Criteria</a>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        scroll={scroll}
                                    >
                                        <DialogTitle id="scroll-dialog-title">Password Criteria</DialogTitle>
                                        <DialogContent dividers={scroll === 'paper'}>
                                            <DialogContentText
                                                id="scroll-dialog-description"
                                                ref={descriptionElementRef}
                                                tabIndex={-1}
                                            >
                                                <h6>1. Password must be of minimum 8 characters.</h6>
                                                <h6>2. Password must contain alphabets.</h6>
                                                <h6>3. Password must contain numerics.</h6>
                                                <h6>4. Password must contain special characters.</h6>
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField className={classes.textTheme}
                                    variant="standard"
                                    label="Confirm Password"
                                    name="re_password"
                                    value={re_password}
                                    type={values.showPassword ? 'text' : 'password'}
                                    //  fullWidth
                                    size="small"
                                    required
                                    autocomplete='on'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={e => onChange(e)}

                                    {...(errors.re_password && { error: true, helperText: errors.re_password })}
                                />
                            </Grid>
                            <Grid item >
                                <button className='signupBtnTheme' type='submit'>Register</button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </form>
            {/* <Dialog fullWidth='true'
                open={showPopup}
                onClose={handleClosePopup}
            >
                <DialogTitle id="alert-dialog-title">
                    {"You're successfully registered"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>Please sign in to continue</b>
                    </DialogContentText>
                    <br />
                    <Grid xs={8}>
                        <Link to='/loginOrganization' className={classes.link}>Sign in</Link>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Cancel</Button>
                </DialogActions>
            </Dialog> */}
            {/* <Grid container>
                    <div>
                        <button className='googleSignupTheme mt-3' onClick={continueWithGoogle}>
                        <img src ={image} className='img1' />Continue With Google</button>
                    </div>
                </Grid> */}
            <p >
                Already have an account? <Link to='/loginOrganization' className={classes.link}>Sign In</Link>
            </p>
        </div>

    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup2 })(Signup2);