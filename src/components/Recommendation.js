import React, { useState } from 'react';
import Navbar from './Navbar';
import '../index.css';
import { Grid } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
// import imge from './icons8-happy.gif';

const Recommendation = () =>{
    const [hover1, setHover1] = useState();
    const [hover2, setHover2] = useState();
    const [hover3, setHover3] = useState();
    const [hover4, setHover4] = useState();
    const handleMouseIn1 = () => {
        setHover1(true);
    }
    const handleMouseOut1 = () => {
        setHover1(false);
    }
    const handleMouseIn2 = () => {
        setHover2(true);
    }
    const handleMouseOut2 = () => {
        setHover2(false);
    }
    const handleMouseIn3 = () => {
        setHover3(true);
    }
    const handleMouseOut3 = () => {
        setHover3(false);
    }
    const handleMouseIn4 = () => {
        setHover4(true);
    }
    const handleMouseOut4 = () => {
        setHover4(false);
    }
    const navigate = useNavigate();
    const handleClick = e => {
        e.preventDefault();
        let mood = e.target.id;
        console.log(mood);
        navigate("/recommended_food/"+mood);
    };
    return(
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <br />
            <Grid container >
                    <Grid item lg={3}>
                    <span className='h2Theme1' style={{marginLeft:'240px'}}>How're</span>
                    <span className='h2Theme1'>You</span>
                    <span className='h2Theme1' style={{color:'#F25C05'}}>Feeling</span>
                    <span className='h2Theme1'>Today?</span>
                    </Grid>
            </Grid>
            <br/>
            {/* <br/> */}
            <Grid container>
                <Grid item xs={3}>
                    <button className='btn1' id="happy" onClick={e => handleClick(e)} onMouseOver={handleMouseIn1} onMouseOut={handleMouseOut1} style={{fontWeight:'-moz-initial',fontSize:'50px',background:'#ff85a7',borderColor:'#ff85a7',color:'white'}}> 
                    {/* {hover?"foo":"hii"}Happy</button> */}
                    {hover1 ?<img className='gifStyle' src={require('../icons8-happy.gif')}/>:<span></span>} Happy</button>
                </Grid>
                <Grid item xs={3}>
                    <button className='btn1' id='bored' onClick={e => handleClick(e)}  onMouseOver={handleMouseIn2} onMouseOut={handleMouseOut2} style={{fontWeight:'-moz-initial',fontSize:'50px',background:'#f3bb72',borderColor:'#f3bb72',color:'white'}}>
                    {hover2 ?<span className='spanEmo' > &#128564;</span>:<span></span>}Bored</button>
                </Grid>
                <Grid item xs={3}>
                    <button className='btn1' id='angry' onClick={e => handleClick(e)}  onMouseOver={handleMouseIn3} onMouseOut={handleMouseOut3} style={{fontWeight:'-moz-initial',fontSize:'50px',background:'#7beced',borderColor:'#7beced',color:'white'}}>
                    {hover3 ?<span className='spanEmo' > &#128548;</span>:<span></span>}Angry</button>
                </Grid>
                <Grid item xs={3}>
                    <button className='btn1' id='sad' onClick={e => handleClick(e)} onMouseOver={handleMouseIn4} onMouseOut={handleMouseOut4} style={{fontWeight:'-moz-initial',fontSize:'50px',background:'#b2dd77',borderColor:'#b2dd77',color:'white'}}>
                    {hover4 ?<span className='spanEmo' > &#128554;</span>:<span></span>} Sad</button>
                </Grid>
            </Grid>
        </div>

    )
}

export default Recommendation;;

