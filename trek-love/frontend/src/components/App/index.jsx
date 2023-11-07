import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import HomePage from '../HomePage';
import DetailsPage from '../DetailsPage';
import SearchPage from '../SearchPage';
import AuthFormPage from '../AuthFormPage'
import TMDB from "../../assets/TMDB.png"
import './styles.css'
import { set } from 'mongoose';

function App() {
  // Store API data here
  const [episodes, setEpisodes] = useState([])
  // Other state variables
  const [episodeDetails, setEpisodeDetails] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect on episodes state variable so that I can 
  // validate that it is getting populated.
  useEffect(() => {
    // console.log(episodes);
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
    // Check whether there's a user still logged in.
    // If so, update the state variable to reflect that.
    const haveToken = localStorage.getItem('userToken')
    if (haveToken != '') {
      setLoggedIn(true)
    }
    const url = `https://api.themoviedb.org/3/tv/253?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=season/1,season/2,season/3`
    getData(url)
  }, [])

  function logout() {
    // Clear localStorage and toggle state variable
    // to show appropriate menu options.
    localStorage.setItem('userToken', '')
    setLoggedIn(false)
  }

  return (
    <>      
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-cyan-300 font-bold text-2xl">
          <h2>Trek Love</h2>
        </Link>
        <Link to="/search" className="text-cyan-300 font-bold text-xl">
          <h3>Episode Searcher</h3>
        </Link>
        {/* Conditional logic to show/hide links to Signup/Login or Logout */}
        {!loggedIn && (
        <div className="hidden space-x-4 md:flex">          
          <Link to="/auth/signup" className="text-cyan-300 font-bold text-xl">
            <h4>Sign Up</h4>
          </Link>
          <Link to="/auth/login" className="text-cyan-300 font-bold text-xl">
            <h4>Log In</h4>
          </Link>
        </div>
        )}
        {loggedIn && (
          <a href="" onClick={logout} className="hidden md:block text-cyan-300 font-bold text-xl">Logout</a>
        )}  
        
        {!isMenuOpen && (
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        )}
        {isMenuOpen && (
          <div className="flex relative md:hidden">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            {/* Conditional logic to show/hide links to 
            Signup/Login or Logout */}
            {/* {!loggedIn && ( */}
            <div className='md:hidden absolute top-14 bg-slate-400 border rounded-md'>
              <Link to="/auth/signup" className="text-cyan-700 font-bold text-sm">
                <h4>Sign Up</h4>
              </Link>
              <Link to="/auth/login" className="text-cyan-700 font-bold text-sm">
                <h4>Log In</h4>
              </Link>
            </div>
            {/* )}
            {loggedIn && (
              <a href="" onClick={logout} className="text-cyan-300 font-bold text-xl">Logout</a>
            )} */}
          </div>
        )}
      </nav>
      <br />
      <div >
        <Routes>
          <Route 
            path="/" 
            element={<HomePage 
                episodes={episodes}
                setEpisodeDetails={setEpisodeDetails}
            />} 
          />
          <Route 
            path="/details"
            element={<DetailsPage episodeDetails={episodeDetails} 
            />}
          />
          <Route 
            path='/search' 
            element={<SearchPage 
                episodes={episodes}
                setEpisodeDetails={setEpisodeDetails}
            />}
          />
          <Route 
            path="/auth/:formType" 
            element={<AuthFormPage 
              setLoggedIn={setLoggedIn}
            />} 
          /> 
        </Routes>
      </div>
      <br />
      <br />
      <footer className='text-cyan-300'>
        <img src={TMDB} alt="" className="mx-auto block m-2"/>
        "This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB."
      </footer>
    </>
  )
}

export default App
