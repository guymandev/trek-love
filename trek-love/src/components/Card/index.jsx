import { Link, useNavigate } from 'react-router-dom';

export default function Card({episode, setEpisodeDetails}) {
    const navigate = useNavigate();

    const handleClick = () => {
        setEpisodeDetails(episode);
        // Navigate to details route after updating details data
        navigate('/details'); 
    }

    // console.log(episode)
    // console.log(episode.still_path === '')
    if (episode.still_path === '') {
        console.log(`Missing still for ${episode.episode_number}`)
    }

    let imageURL = `https://image.tmdb.org/t/p/w300${episode.still_path}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    // console.log(imageURL)

    let strStyling = ""

    if (episode.name.length < 20) {
        strStyling = "font-bold text-xl"
    } else if (episode.name.length >= 20 && episode.name.length <= 28 ) {
        strStyling = "font-bold text-base"
    } else if (episode.name.length > 28) {
        strStyling = "font-bold text-base text-center whitespace-normal max-w-xs w-40 truncate"
    }

    return (
        <div onClick={handleClick}>
            <figure className="shadow-lg cursor-pointer m-2 border-2 border-black rounded-lg hover:transform hover:scale-105 transition ease duration-500">
                <img src={imageURL} alt={episode.name} className="w-[15rem] h-[20vh]"/>
            </figure>
            <div className="flex flex-col items-center">
                <p className={strStyling}>{episode.name}</p>
                <p className="text-base">Episode: {episode.episode_number}</p>            
            </div>
        </div>
    )
}