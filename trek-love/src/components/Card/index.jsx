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

    let strStyling = "font-bold"

    if (episode.name.length > 20 ) {
        strStyling = strStyling + "text-base"
    }

    if (episode.name.length > 25 ) {
        strStyling = strStyling + "text-base"
    }

    return (
        <div onClick={handleClick}>
            <figure className="shadow-lg cursor-pointer m-2 border-2 border-black rounded-lg hover:transform hover:scale-105 transition ease duration-500">
                <img src={imageURL} alt={episode.name} className="w-[15rem] h-[20vh]"/>
            </figure>
            {/* <p className="text-xl font-bold">{episode.name}</p> */}
            <p className={`font-bold ${episode.name.length > 20 ? 'text-base' : 'text-xl'} ${episode.name.length > 25 ? 'whitespace-normal' : 'whitespace-nowrap'} ${episode.name.length > 25 ? 'max-w-full' : 'max-w-xs'}`}>{episode.name}</p>
            <p className="text-base font-bold">Episode: {episode.episode_number}</p>            
        </div>
    )
}