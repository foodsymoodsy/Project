import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid,AppBar,makeStyles } from '@material-ui/core';
import '../containers/Button.css';
import '../index.css';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    app: {
        backgroundColor: 'white'
    },
    grid: {
        marginLeft: '80px'
    }
}))
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

const RecommendedFood = (props) => {
    //    let {mood} = useParams();
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    let email = params.get('email'); // 
    let mood = params.get('mood');
    console.log(email,mood);
    const [data, setData] = useState();
    const classes = useStyles();
    const getData = async () => {
        let d = await axios.get('https://dummyjson.com/products/'
        // ,{params: {email:email,mood:mood}}
        );
        setData(d.data.products);
        console.log(d.data.products); 
    }
    useEffect(() => {
        getData();
    });
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // const handleClick = (e) =>{
    //     e.preventDefault()
    //     window.location.replace('https://mui.com/material-ui/react-card/#main-content')
    // }
    const navigate = useNavigate();
    const handleClick = (e) =>{
          e.preventDefault()
          let id = e.target.id;
          navigate("/recommended_food_for_mood/"+id);
      }

    return (
        // <div>
    <Grid container>
        <br/>
        <AppBar position="fixed" className={classes.app}>
        <Grid item ></Grid>
        <Grid item sm>
        <span className='h2Theme' style={{marginLeft:'225px',color:'black'}}>Food</span>
        <span className='h2Theme' style={{color:'#F25C05'}}>Recommended</span>
        <span className='h2Theme' style={{color:'black'}}>In</span>
        <span className='h2Theme' style={{color:'#F25C05'}}>Happy</span>
        <span className='h2Theme' style={{color:'black'}}>Mood</span>
        </Grid>
        </AppBar>
        <Grid container className='mt-10'>
            
            {data && data.map((index,id) => (
                //  <Col key={id} xs={12} md={4} lg={3}>
                <Grid item xs={3} className={classes.grid}>
                <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                //   avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //       R
                //     </Avatar>
                //   }
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
                  image={index.images[0]}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {index.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton> */}
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
           {/* </Col> */}
           </Grid>
                // console.log(index.id)
            ))}
            {/* {/* <p>{data && data.title}</p> */}
        {/* </Row>
        </Container> */}
        </Grid>
        </Grid>
    )
}

export default RecommendedFood;