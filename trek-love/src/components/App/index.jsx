import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import HomePage from '../HomePage';
import './styles.css'

function App() {
  // Store API data here
  const [episodes, setEpisodes] = useState([])
  const [episodeDetails, setEpisodeDetails] = useState({})

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
      // Had to use a functional update in order to get the data
      // correctly loaded into the array. Otherwise, the state
      // variable wasn't getting updated correctly because 
      // the state updates were being batched.
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
      <nav>        
        <div className="flex relative justify-between">        
          <Link to="/" className="flex-shrink-0 text-gray-500 font-bold text-2xl">
            <h2>Trek Love</h2>
          </Link>
          <div className="flex-grow">      
            <Link to="/search" className="flex justify-end text-gray-500 font-bold text-xl">
              <h3>Episode Searcher</h3>
            </Link>
          </div>   
        </div>                  
      </nav>
      <br />
      <div >
        <Routes>
          <Route path="/" element={<HomePage 
            episodes={episodes}
            setEpisodeDetails={setEpisodeDetails}
            />} 
          />
          {/* <Route 
            path="/details"
            element={<DetailsPage data={episodeDetails} 
            />}
          />
          <Route path='/search' element={
            <SearchPage setEpisodeDetails={setEpisodeDetails}/>
          }/>  */}
        </Routes>
      </div>
    </>
  )
}

export default App
