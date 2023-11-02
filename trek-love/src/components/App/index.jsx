import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
// import HomePage from '../HomePage';
import './styles.css'

function App() {
  // Store API data here
  const [episodes, setEpisodes] = useState([])
  // const [detailsData, setDetailsData] = useState({})

  // useEffect on episodes state variable so that I can 
  // validate that it is getting populated.
  useEffect(() => {
    console.log(episodes);
  }, [episodes]);

  // Async function to query API & JSONify the response
  async function getData(url) {
    const res = await fetch(url)
    const data = await res.json()
    
    let i = null
    for (i = 1; i < 4; i++) {
      let strSeason = `season/${i}`
      setEpisodes(prevEpisodes => [...prevEpisodes, ...data[strSeason].episodes]);
    }  
  }

  // Query the API for intial mount of the application
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/253?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=season/1,season/2,season/3`
    getData(url)
  }, [])


  return (
    <>
      <h1 className="text-3xl font-bold underline">Trek Love!</h1>
    </>
  )
}

export default App
