import { useState, useEffect } from "react"
import Gallery from "../Gallery"

export default function SearchPage({episodes, setEpisodeDetails}) {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])

    // This effect will run whenever query changes
    useEffect(() => {       
        // Use the query state variable to filter the 
        // episodes object array, returning only those that
        // match some part that the user entered.
        const filteredEpisodes = episodes.filter((episode) => {
            return episode.name.toLowerCase().includes(query.toLowerCase());
          });
        
        // Only when the user starts typing a search criteria 
        // do we start providing results.
        if (query) {
            setQueryResults(filteredEpisodes);
        } else {
            // If the query is empty, clear the results
            setQueryResults([]);
        }
    }, [query]);

    return (
        <>            
            <label htmlFor="search">
                <img className="mx-auto block" src="https://fontmeme.com/permalink/231107/5cf8438e56f260976d97222bb5cdeff0.png" alt="" />
            </label>
            <br />
            <input
                className="p-2 w-[60vw] rounded border border-cyan-700 focus:outline-none" 
                type="text"
                id="search"
                placeholder="search for an episode..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <br />
            <br />
            <Gallery 
                episodes={queryResults}
                setEpisodeDetails={setEpisodeDetails}    
            />
        </>
    )
}