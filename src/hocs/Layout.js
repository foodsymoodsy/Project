import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@material-ui/core';
import imge from './Pomegranate, ricotta and walnut spaghetti.jpg';
import imge1 from './Wicked cheese sauce.jpg';
import imge2 from './All-in-one veggie pasta.jpg';
import imge3 from './Cream cheese and avocado roll.jpg';
import { makeStyles } from '@material-ui/core';
import '../index.css';
import image from './homePagepic.png';

const useStyles = makeStyles(theme => ({
    // centered: {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50% -50%)',
    //     fontSize: '100px'
    // }
    cardLayout:{
        marginLeft:'30px',
        
    },
    cardLayout1:{
        marginLeft:'10px',
        
    },
    cardL:{
        borderRadius:'10px',
        height:'95%'
    },
    suTheme:{
        fontFamily: "Gotham",
        color:'#F25C05',
        marginTop:'70px',
        marginLeft: '30px',
        marginRight: '10px',
        letterSpacing: '3px',
        fontSize:'3em'
    },
    imgTheme:{
        marginTop:'40px'
    }
  
}))

const Layout = (props) => {
    const classes = useStyles();
   
    let location = useLocation();
    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            props.googleAuthenticate(state, code)
        } else {
            props.checkAuthenticated();
            props.load_user();
        }
    }, [location]);
    return (
        <div>
            <Navbar />
            <br/>
            <br/>
            <br/>
            <Grid container >
                <Grid item xs={6}>
                    <Grid item xs={3} lg={3}>
                    <span className='h1Theme'>How</span>
                    <span className='h1Theme' style={{color:'#F25C05'}}>Food</span>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <span className='h1Theme'>Impacts</span>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <span className='h1Theme'>Your</span>
                        <span className='h1Theme' style={{color:'#F25C05'}}>Mood</span>
                        <span className='h1Theme'>!</span>
                    </Grid>
                    <div>
                        <p className='pTheme'>Living in the 21 st century we are provided with many services to tackle our
                            hunger cravings. But the abundance of these services
                        </p>
                        <button className='BtnTheme'>Read more</button>
                    </div>

                </Grid>
                
                <Grid item xs={6} container justifyContent="center">
                    <img src={image} className={classes.imgTheme}/>
                </Grid>
            </Grid>
            <br />
            <Grid container justifyContent='center'>
                <div className={classes.suTheme}>Daily Suggestions</div>
            </Grid>
            <br></br>
            <Grid container className={classes.cardLayout}>
                <Grid item xs={3} >
                    <Card sx={{ maxWidth: 240 }} className={classes.cardL}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="145"
                                image={imge}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Pomegranate, ricotta and walnut spaghetti
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 240 }} className={classes.cardL}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="145"
                                image={imge1}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Wicked Cheese Sauce
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 240 }} className={classes.cardL}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="145"
                                image={imge2}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                All-in-one vegie pasta
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: 240 }} className={classes.cardL}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="145"
                                image={imge3}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Cream cheese and avocado roll
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                </Grid>
            
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user, googleAuthenticate })(Layout);