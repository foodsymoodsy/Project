import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Navbar from './Navbar';
import '../index.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import image from './foodsymoodsy.png';
import './image.css';
import { AppBar, Toolbar, makeStyles, useMediaQuery, useTheme, Paper } from '@material-ui/core'
import Rating from '@mui/material/Rating';
import '../containers/Button.css'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#112B3C',
        height: '45px'
    },
    link: {
        color: '#f2f2f2',
        marginBottom: '20px',
        marginRight: '20px',
        display: 'flex',
        textDecoration: 'none',
        padding: '0.2rem',
        height: '100 %',
        cursor: 'pointer',
        fontFamily: 'Gotham',
        '&.active': {
            color: '#F25C05'
        },
        '&:hover': {
            color: '#F25C05'
        }
    },
    rate: {
        color: '#F25C05'
    }
}))

function RecommendedFoodForMood() {
    const classes = useStyles();
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);

    const postData=async ()=>{
        let res=await axios.post(`{baseURL}`,{
            rate:rating
        })
        console.log(res);
    }
    const handleClose = () => {
        postData();
        setShow(false);
    }
    // const handleShow = () => setShow(true);

    let { id } = useParams();
    const [data, setData] = useState();
    const getData = async () => {
        let d = await axios.get('https://dummyjson.com/products/');
        setData(d.data.products);
        console.log(d.data.products);
    }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 10000);
        return () => clearTimeout(timer);
    }, []);
    const [rating, setRating] = useState();
    const handleRating = (event, val) => {
        console.log(val)
        setRating(val);
    }
    const handleClick = (e) => {
        e.preventDefault()
        window.location.replace('https://mui.com/material-ui/react-card/#main-content')
    }
    return (
        <div>

            {data &&
                <>

                    <AppBar className={classes.root} elevation={0} position="fixed" >
                        <Toolbar>
                            {/* {isMobile ? (
                                <DrawerComponent />
                            ) : ( */}
                            <Grid container
                                alignItems="center">
                                <Grid item>
                                    <img src={image} className='img1' />
                                </Grid>
                                <Grid item sm></Grid>
                                <Grid item >
                                    <a className={classes.link}>Home</a>
                                </Grid>

                            </Grid>
                            {/* )} */}
                        </Toolbar>
                    </AppBar>
                    {show ? <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton centered>
                            <Modal.Title className={classes.rate}>Rate it</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> <Rating name="half-rating" value={rating} precision={0.5} onChange={handleRating} /></Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleClose} className='buttonThemeOrder1'>Rate</button>
                        </Modal.Footer>
                    </Modal>
                        : null}
                    <br />
                    <br />
                    <h2 style={{ textAlign: 'center' }} className='mt-20'>{data[id - 1].title}</h2><br />
                    <Grid container >
                        <div >
                            <img src={data[id - 1].images[0]} style={{ height: '101%', width: '101%', marginLeft: '256px' }} />
                        </div>
                    </Grid>
                    <br />
                    <Grid container>
                        <h3 style={{ marginLeft: '256px' }} className='h3Theme'>Ingredients</h3>
                    </Grid>
                    <p style={{ marginLeft: '256px', fontFamily: 'Noto Sans' }}>{data[id - 1].category}</p>
                    <Grid container>
                        <h3 style={{ marginLeft: '256px' }} className='h3Theme'>Method</h3>
                    </Grid>
                    <p style={{ marginLeft: '256px', fontFamily: 'Noto Sans' }}>{data[id - 1].description}</p>
                    <button className='swiggyOrder' onClick={e => handleClick(e)}>Order via Swiggy</button>
                    {/* <Navbar/> */}
                    <div className="footer">
                        <p>This is some content in sticky footer</p>
                    </div>
                </>

            }


        </div>
    )
}

export default RecommendedFoodForMood; 
