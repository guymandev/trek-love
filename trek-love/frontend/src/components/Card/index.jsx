import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import audioPath from "../../assets/tos-turboliftdoor.mp3"

export default function Card({episode, setEpisodeDetails}) {
    const navigate = useNavigate();

    // reference
    const audioRef = useRef();

    const handleClick = () => {
        audioRef.current.play();
        setEpisodeDetails(episode);
        // Navigate to details route after updating details data
        // But wait long enough for audio to play!! :) 
        setTimeout(() => navigate('/details'), 800);
    }    

    let imageURL = `https://image.tmdb.org/t/p/w300${episode.still_path}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    let strStyling = ""

    if (episode.name.length < 20) {
        strStyling = "font-bold text-xl text-cyan-300"
    } else if (episode.name.length >= 20 && episode.name.length <= 28 ) {
        strStyling = "font-bold text-base text-cyan-300"
    } else if (episode.name.length > 28) {
        strStyling = "font-bold text-base text-cyan-300 text-center whitespace-normal max-w-xs w-40 truncate"
    }

    return (
        <div onClick={handleClick}>
            <audio id="door_audio" ref={audioRef}>
                <source src={audioPath} type="audio/mpeg" />
            </audio>
            <figure className="shadow-lg cursor-pointer m-2 border-2 border-black rounded-lg hover:transform hover:scale-105 transition ease duration-500">
                <img src={imageURL} alt={episode.name} className="w-[15rem] h-[20vh]"/>
            </figure>
            <div className="flex flex-col items-center">
                <p className={strStyling}>{episode.name}</p>
                <p className="text-base text-cyan-300">Episode: {episode.episode_number}</p>            
            </div>
        </div>
    )
}