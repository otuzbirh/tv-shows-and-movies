import React, { useContext, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const Movie = () => {

    const { id } = useParams()
    const [movie, setMovie] = useState<any>()
    const navigate = useNavigate()

    const url = `https://api.themoviedb.org/3//movie/${id}?api_key=42e6b21910a961935283ddfd0f02b885`

    function getMovie() {
        axios.get(url)
        .then(res => {
            setMovie(res.data);   
        })
        .catch((err) => {
          console.log(err)
        })
    }

    

   

    useEffect(() => {
        getMovie()    
    }, [id])

   



    return (
        <>
            <Box sx={{
                width: '100%', marginTop: "30px", height: '70vh', display: 'flex', flexDirection: "column",
                justifyContent: "flex-start", alignItems: "center", borderRadius: "18px",
                opacity: '1'
            }}>
              
                <h2>{ movie?.title}</h2>
                <img src={movie?.poster_path} alt="News" className="article-img"></img>
                {/* <h3>{movie?.overview}</h3> */}
                <p>{movie?.overview}</p>

                <h4>Published at: {movie?.relase_date ? movie?.relase_date : "Unknown"}</h4>
                <h4>Vote at: {movie?.vote_count ? movie?.vote_count : "Unknown"} </h4>
  
                <Button
                    onClick={() => { navigate("/") }}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}> Back </Button>
            </Box>
        </>
    )
}

export default Movie