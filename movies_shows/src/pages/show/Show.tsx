import React, { useContext, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const Show = () => {

    const { id } = useParams()
    const [show, setShow] = useState<any>()
    const navigate = useNavigate()

    const url = `https://api.themoviedb.org/3//tv/${id}?api_key=42e6b21910a961935283ddfd0f02b885`

    function getShow() {
        axios.get(url)
        .then(res => {
            console.log("response", res.data)
            setShow(res.data);   
        })
        .catch((err) => {
          console.log(err)
        })
    }

    

   

    useEffect(() => {
        getShow()    
    }, [id])

    




    return (
        <>
            <Box sx={{
                width: '100%', marginTop: "30px", height: '70vh', display: 'flex', flexDirection: "column",
                justifyContent: "flex-start", alignItems: "center", borderRadius: "18px",
                opacity: '1'
            }}>
              
                <h2>{ show?.title}</h2>
                <img src={show?.poster_path} alt="News" className="article-img"></img>
                <p>{show?.overview}</p>

                <h4>Published at: {show?.relase_date ? show?.relase_date : "Unknown"}</h4>
                <h4>Vote at: {show?.vote_count ? show?.vote_count : "Unknown"} </h4>
  
                <Button
                    onClick={() => { navigate("/") }}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}> Back </Button>
            </Box>
        </>
    )
}

export default Show