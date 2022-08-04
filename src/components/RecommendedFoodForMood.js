import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';
import axios from 'axios';
import '../index.css';
import Modal from 'react-bootstrap/Modal';
import image from './foodsymoodsy.png';
import './image.css';
import { AppBar, Toolbar, makeStyles, useMediaQuery } from '@material-ui/core'
import Rating from '@mui/material/Rating';
import '../containers/Button.css';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

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
    const [show, setShow] = useState(false);

    const postRating = async ()=>{
        let res =axios.post(`{baseURL}`,{
            rate:rating
        })
        console.log(res);
    }

    const handleClose = () => {
        postRating();
        setShow(false);
    }
    // const handleShow = () => setShow(true);

    let { id } = useParams();
    const [data, setData] = useState();
    const getData = async () => {
        let d = await axios.get('https://api.edamam.com/api/recipes/v2?app_id=7a7402bf&type=public&app_key=5ea5af3285e2a87757aa123562b6a78a%20&q=cheese');
        setData(d.data.hits);
        console.log(data);
        // setIngredients(.map((line,index)=> ingredients+=(index+1)+line+'\n'));
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
                <Navbar/>
                    {/* <AppBar className={classes.root} elevation={0} position="fixed" >
                        <Toolbar>
                            {/* {isMobile ? (
                                <DrawerComponent />
                            ) : ( */}
                            {/* <Grid container
                                alignItems="center">
                                <Grid item>
                                    <img src={image} className='img1' />
                                </Grid>
                                <Grid item sm></Grid>
                                <Grid item >
                                <NavLink to='/' className={classes.link}>Home</NavLink>
                                </Grid>

                            </Grid>
                            {/* )} */}
                        {/* </Toolbar> */}
                    {/* </AppBar> */}
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
                    <br/>
                    <h2 style={{ textAlign: 'center' }} className='mt-20'>{data[id].recipe.label}</h2><br />
                    <Grid container >
                        <div >
                            <img src={data[id].recipe.image} style={{ height: '95%', width: '135%', marginLeft: '256px' }} />
                        </div>
                    </Grid>
                    <Grid container>
                        <h3 style={{ marginLeft: '256px' }} className='h3Theme'>Ingredients</h3>
                    </Grid>
                    <pre style={{ marginLeft: '256px', fontFamily: 'Noto Sans' }}>
                        {data[id].recipe.ingredientLines.map((line,index)=>(index+1+'.\t')+line+'\n')}</pre>
                    <Grid container>
                        <h3 style={{ marginLeft: '256px' }} className='h3Theme'>Method</h3>
                    </Grid>
                    <p style={{ marginLeft: '256px',marginRight:'222px', fontFamily: 'Noto Sans' }}>
                    Remove any rinds from hard cheeses. Grate hard cheeses and cut others into 1/2-inch cubes. Place cheese, wine, butter, herbs, and garlic in a food processor and blend until smooth, approximately 2 minutes. Serve immediately or refrigerate for at least 1 hour for a firmer consistency. Fromage Fort can be stored in the refrigerator for up to 1 week.
                    </p>
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
