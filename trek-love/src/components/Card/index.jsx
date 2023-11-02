import { Link, useNavigate } from 'react-router-dom';

export default function Card({episode, setEpisodeDetails}) {
    const navigate = useNavigate();

    const handleClick = () => {
        setEpisodeDetails(episode);
        // Navigate to details route after updating details data
        navigate('/details'); 
    }

    let imageURL = `https://image.tmdb.org/t/p/w300${episode.still_path}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    return (
        <div onClick={handleClick}>
            <figure className="shadow-lg cursor-pointer m-2 border-2 border-black rounded-lg hover:transform hover:scale-105 transition ease duration-500">
                <img src={imageURL} alt={episode.name} className="w-[15rem] h-[20vh]"/>
            </figure>
            <p className="text-xl font-bold">{episode.name}</p>
            <p className="text-base font-bold">Episode: {episode.episode_number}</p>            
        </div>
    )
}