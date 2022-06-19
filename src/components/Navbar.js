import React, { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { AppBar, Toolbar, Grid, makeStyles, useMediaQuery, useTheme, Paper } from '@material-ui/core'
import About from './About';
import DrawerComponent from './Drawer';
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import image from './foodsymoodsy.png';
import './image.css';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#112B3C',
        // height:'45px'
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        backgroundColor: '#FFFF',
        borderRadius: '25px',
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    },
    link: {
        color: '#f2f2f2',
        display: 'flex',
        textDecoration: 'none',
        padding: '0.1rem',
        height: '100 %',
        cursor: 'pointer',
        fontFamily:'Gotham',
        '&.active': {
            color: '#F25C05'
        },
        '&:hover': {
            color: '#F25C05'
        }
    },
    link1: {
        color: '#F25C05',
    },
}))

const Navbar = ({ logout, isAuthenticated }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const guestLinks = () => (
        <Fragment>

        </Fragment>
    );
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();
    const handleCloseSignup = () => setShowSignup(false);
    const handleShowSignup = () => setShowSignup(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleClickSignup1 = e => {
        e.preventDefault()
        handleCloseSignup();
        navigate("/signup")
    };
    const handleClickSignup2 = e => {
        e.preventDefault()
        handleCloseSignup();
        navigate("/signupAsOrg")
    };
    const handleClickLogin1 = e => {
        e.preventDefault()
        handleCloseLogin();
        navigate("/loginRecommendation")
    };
    const handleClickLogin2 = e => {
        e.preventDefault()
        handleCloseLogin();
        navigate("/loginDonation")
    };
    const handleClickLogin3 = e => {
        e.preventDefault()
        handleCloseLogin();
        navigate("/loginOrganization")
    };
    const authLinks = () => (
        <li className='nav-item'>
            <a className='nav-link' href='#!' onClick={logout}>Logout</a>
        </li>
    );
    return (
        <div>
            <AppBar className={classes.root} elevation={0} position="absolute" >
                <Toolbar>
                    {isMobile ? (
                        <DrawerComponent />
                    ) : (
                        <Grid container
                            alignItems="center">
                            <Grid item>
                                <img src={image} className='img' />
                            </Grid>
                            <Grid item sm></Grid>
                            <Grid item xs={1}>
                            <a className={classes.link}>Home</a>
                            </Grid>
                            <Grid item xs={1}>
                                <a className={classes.link} onClick={handleShowSignup}>Sign Up</a>
                                <Modal show={showSignup} onHide={handleCloseSignup} centered>
                                    <Modal.Header closeButton >
                                        <Modal.Title className={classes.link1}>Sign Up for</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Paper >
                                            <Grid container spacing={4} justifyContent="center">
                                                <Grid item xs={6} >
                                                    <div>
                                                        <button className="popup1Signup" onClick={e => handleClickSignup1(e)}>Food Recommendation/Donation</button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div>
                                                        <button className="popup2Signup" onClick={e => handleClickSignup2(e)}>Organization</button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Paper >
                                    </Modal.Body>
                                    <Modal.Footer></Modal.Footer>
                                </Modal>
                            </Grid>
                            <Grid item xs={1}>
                                <a className={classes.link} onClick={handleShowLogin}>Sign In</a>
                                <Modal show={showLogin} onHide={handleCloseLogin} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title className={classes.link1}>Sign In for</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Paper >
                                            <Grid container spacing={4} justifyContent="center">
                                                <Grid item xs={6} >
                                                    <div>
                                                        <button className="popup1" onClick={e => handleClickLogin1(e)}>Food Recommendation</button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} >
                                                    <div>
                                                        <button className="popup1" onClick={e => handleClickLogin2(e)}>Food Donation</button>
                                                    </div>
                                                </Grid>
                                                <Grid xs={3}></Grid>
                                                <Grid item xs={6} container justifyContent="center">
                                                    <button className="popup1" onClick={e => handleClickLogin3(e)}>Organization</button>
                                                </Grid>
                                                <Grid xs={3}></Grid>
                                            </Grid>
                                        </Paper >
                                    </Modal.Body>
                                    <Modal.Footer></Modal.Footer>
                                </Modal>
                            </Grid>
                            <Grid item xs={1}>
                                <NavLink to='/about' className={classes.link}>About</NavLink>
                            </Grid>
                        </Grid>)}
                </Toolbar>
            </AppBar>
            {isAuthenticated ? authLinks() : guestLinks()}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);