import { useState, useEffect } from "react"
import Gallery from "../Gallery"

export default function HomePage({episodes, setEpisodeDetails}) {
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [queryResults, setQueryResults] = useState([])

    // This effect will run whenever the episodes
    // change, i.e. when they become fully populated, 
    // and also whenever the seasonNumber state variable
    // changes, i.e. whenever the user makes a selection
    // in the Season dropdown.
    useEffect(() => {       
        // Use the seasonNumber state variable to filter the 
        // episodes object array, returning only those that
        // match the selected season.
        const filteredEpisodes = episodes.filter((episode) => {
            return episode.season_number === Number(seasonNumber);
        });
        
        setQueryResults(filteredEpisodes);
        
    }, [seasonNumber, episodes]);

    return (
        <>
            {/* <h1 className="text-cyan-300">Welcome to Trek Love!</h1> */}
            <img className="mx-auto block" src="https://fontmeme.com/permalink/231107/9dbcdb1e0afd91b153044330d161b797.png" alt="" />
            <br />
            <div className="flex flex-col items-center">
                <label htmlFor="season" className="text-cyan-300 text-base font-bold">Select Season</label>
                <select 
                    name="season" 
                    id="season" 
                    className="border rounded-md m-1"
                    onChange={(event) => setSeasonNumber(event.target.value)}
                >
                    <option value="1" className="w-5 border">Season 1</option>
                    <option value="2" className="w-5 border">Season 2</option>
                    <option value="3" className="w-5 border">Season 3</option>
                </select>
            </div>
            <br />
            {/* We have to wait until queryResults is fully populated.
                Otherwise, the Gallery is sent an empty data set. */}
            {queryResults.length > 0 ? (
                <Gallery
                    episodes={queryResults}
                    setEpisodeDetails={setEpisodeDetails}
                />
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}