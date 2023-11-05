import { useState, useEffect } from "react"
import Gallery from "../Gallery"

export default function HomePage({episodes, setEpisodeDetails}) {
    const [episodeNumber, setEpisodeNumber] = useState(1)
    const [queryResults, setQueryResults] = useState([])

    // This effect will run whenever query changes
    useEffect(() => {       
        // Use the query state variable to filter the 
        // episodes object array, returning only those that
        // match the selected season.
        const filteredEpisodes = episodes.filter((episode) => {
            // console.log(`episode.season_number: ` + typeof(episode.season_number))
            // console.log(`episodeNumber: ` + typeof(episode.season_number))
            return episode.season_number === Number(episodeNumber);
        });
        
        setQueryResults(filteredEpisodes);
        
    }, [episodeNumber]);

    return (
        <>
            <h1>Welcome to Trek Love!</h1>
            <br />
            <div className="flex flex-col items-center">
                <label htmlFor="season" className="text-base font-bold">Select Season</label>
                <select 
                    name="season" 
                    id="season" 
                    className="border rounded-md"
                    onChange={(event) => setEpisodeNumber(event.target.value)}
                >
                    <option value="1" className="w-5 border">Season 1</option>
                    <option value="2" className="w-5 border">Season 2</option>
                    <option value="3" className="w-5 border">Season 3</option>
                </select>
            </div>
            <br />
            <Gallery 
                episodes={queryResults}
                setEpisodeDetails={setEpisodeDetails}    
            />

        </>
    )
}