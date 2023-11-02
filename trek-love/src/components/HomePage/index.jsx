import Gallery from "../Gallery"

export default function HomePage({episodes, setEpisodeDetails}) {

    return (
        <>
            <h1>Welcome to Trek Love!</h1>

            <Gallery 
                episodes={episodes}
                setEpisodeDetails={setEpisodeDetails}    
            />

        </>
    )
}