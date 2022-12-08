import React, {useState, useEffect} from 'react'
import Filter from '../components/filter/Filter';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from './../components/card/Card';
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const noimg =  require("../assets/noimg.png");
  const navigate = useNavigate()

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };




  const [search, setSearch] = useState("")
  const [movies, setMovies] = useState([])
  const [shows, setShows] = useState([])
  const [isSearched, setIsSearched] = useState(false)
  const [searchedMovies, setSearchedMovies] = useState([])
  const [searchedShows, setSearchedShows] = useState([])



  function getMovies() {
    axios.get("https://api.themoviedb.org/3/movie/2/lists?api_key=42e6b21910a961935283ddfd0f02b885")
    .then(res => {
        const tenMovies = res.data.results.slice(0,10);
        setMovies(tenMovies);   
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function getSearchedMovies() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=42e6b21910a961935283ddfd0f02b885&query=${search}`)
    .then(res => {
      setSearchedMovies(res.data.results)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function getShows() {
    axios.get("https://api.themoviedb.org/3/tv/popular?api_key=42e6b21910a961935283ddfd0f02b885")
    .then(res => {
        const tenShows = res.data.results.slice(0,10);
        setShows(tenShows);   
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function getSearchedShows() {
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=42e6b21910a961935283ddfd0f02b885&query=${search}`)
    .then(res => {
      setSearchedShows(res.data.results)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getMovies();
    getShows();
  }, [])

  useEffect(() => {
    getMovies();
    console.log("movies",movies)
  }, [])

  useEffect(() => {
  setTimeout(() => {
    getSearchedMovies();
    getSearchedShows();
  }, 3000)
  
  }, [search])

  const moviesCards = movies?.map((mov: any) => {
      return (
        <Card 
            image={ mov?.poster_path != null ? mov.poster_path : noimg}
            title={mov?.name}
            link={() => {
              navigate(`/movie/${mov?.id}`)
            }}
        />
      )
  })

  const filteredMovies = searchedMovies?.map((mov: any) => {
    return (
      <Card 
            image={ mov?.poster_path  ? mov.poster_path : noimg}
            title={mov?.title}
            link={() => {
              navigate(`/movie/${mov?.id}`)
            }}
        />
    )
  })

  const tvCards = shows?.map((mov: any) => {
    return (
      <Card 
          image={ mov?.poster_path != null ? mov.poster_path : noimg}
          title={mov?.name}
          link={() => {
            navigate(`/show/${mov?.id}`)
          }}
      />
    )
})

const filteredShows = searchedShows?.map((mov: any) => {
  return (
    <Card 
          image={ mov?.poster_path  ? mov.poster_path : noimg}
          title={mov?.title}
          link={() => {
            navigate(`/show/${mov?.id}`)
          }}
      />
  )
})

  return (

<Box sx={{ width: '100%' }}>
<Filter handleChange={(e: any) => {
          setSearch(e.target.value);
          setIsSearched(true);
        }} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Movies" {...a11yProps(0)} />
          <Tab label="TV Shows" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="card-container">
          { search.length < 3  ?
        moviesCards  : filteredMovies}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="card-container">
          { search.length < 3  ?
        tvCards  : filteredShows}
        </div>
      </TabPanel>
      
    </Box>


       
  
  )
}

export default Home