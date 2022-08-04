import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';
import imge from '../hocs/Pomegranate, ricotta and walnut spaghetti.jpg';
import imge1 from '../hocs/Wicked cheese sauce.jpg';
import imge2 from '../hocs/All-in-one veggie pasta.jpg';
import imge3 from '../hocs/Cream cheese and avocado roll.jpg';
import { makeStyles } from '@material-ui/core';
import '../index.css';
import image from '../hocs/homePagepic.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    // centered: {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50% -50%)',
    //     fontSize: '100px'
    // }
    cardLayout: {
        marginLeft: '30px',

    },
    cardLayout1: {
        marginLeft: '10px',

    },
    cardL: {
        borderRadius: '10px',
        height: '95%'
    },
    suTheme: {
        fontFamily: "Gotham",
        color: '#F25C05',
        marginTop: '70px',
        marginLeft: '30px',
        marginRight: '10px',
        letterSpacing: '3px',
        fontSize: '3em'
    },
    imgTheme: {
        marginTop: '40px'
    }

}))

const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleClick = (e) =>{
        e.preventDefault()
        let id = e.target.id;
        navigate("/recommended_food_for_mood/"+id);
    }
    const settings = {
        // className: "center",
        dots: true,
        infinite: true,
        speed: 500,
        // centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear"
    }
    return (
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <Grid container >
                <Grid item xs={6}>
                    <Grid item xs={3} lg={3}>
                        <span className='h1Theme'>How</span>
                        <span className='h1Theme' style={{ color: '#F25C05' }}>Food</span>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <span className='h1Theme'>Impacts</span>
                    </Grid>
                    <Grid item xs={3} lg={3}>
                        <span className='h1Theme'>Your</span>
                        <span className='h1Theme' style={{ color: '#F25C05' }}>Mood</span>
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
                    <img src={image} className={classes.imgTheme} />
                </Grid>
            </Grid>
            <br />
            <Grid container justifyContent='center'>
                <div className={classes.suTheme}>Daily Suggestions</div>
            </Grid>
            <br></br>
            <div>
                <div className='carousel'>
                    <Slider {...settings}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={index.title}
                                subheader={index.category}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={imge1}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {index.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <button className='buttonThemeOrder mt-3' id={index.id} onClick={e => handleClick(e)}>Explore More</button>
                                </CardContent>
                            </Collapse>
                        </Card>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={index.title}
                                subheader={index.category}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={imge2}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {index.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <button className='buttonThemeOrder mt-3' id={index.id} onClick={e => handleClick(e)}>Explore More</button>
                                </CardContent>
                            </Collapse>
                        </Card>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={index.title}
                                subheader={index.category}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={imge3}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {index.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <button className='buttonThemeOrder mt-3' id={index.id} onClick={e => handleClick(e)}>Explore More</button>
                                </CardContent>
                            </Collapse>
                        </Card>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={index.title}
                                subheader={index.category}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={imge}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {index.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <button className='buttonThemeOrder mt-3' id={index.id} onClick={e => handleClick(e)}>Explore More</button>
                                </CardContent>
                            </Collapse>
                        </Card>
                        {/* <div className='card-wrapper'>
                            <div className='card'>
                                <div className='card-image'>
                                    <img src={imge1}></img>
                                </div>
                            </div>
                        </div>
                        <div className='card-wrapper'>
                            <div className='card'>
                                <div className='card-image'>
                                    <img src={imge2}></img>
                                </div>
                            </div>
                        </div>
                        <div className='card-wrapper'>
                            <div className='card'>
                                <div className='card-image'>
                                    <img src={imge3}></img>
                                </div>
                            </div>
                        </div>
                        <div className='card-wrapper'>
                            <div className='card'>
                                <div className='card-image'>
                                    <img src={imge}></img>
                                </div>
                            </div>
                        </div>
                        <div className='card-wrapper'>
                            <div className='card'>
                                <div className='card-image'>
                                    <img src={imge1}></img>
                                </div>
                            </div>
                        </div> */}
                    </Slider>
                </div>
            </div>
            {/* <Grid container className={classes.cardLayout}>
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
            </Grid> */}

        </div>
    );
};

export default Home;