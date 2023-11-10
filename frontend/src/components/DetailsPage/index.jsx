import CommentSection from '../CommentSection'

export default function DetailsPage({episodeDetails}) {

    // console.log(episodeDetails)

    let imageURL = `https://image.tmdb.org/t/p/w500${episodeDetails.still_path}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`

    const arrWriter = episodeDetails.crew.filter(person => person.job === "Writer");
    const arrDirector = episodeDetails.crew.filter(person => person.job === "Director");
    const arrMusic = episodeDetails.crew.filter(person => person.job === "Music");
    const arrCostume = episodeDetails.crew.filter(person => person.job === "Costume Design");
    
    let strWriter = arrWriter.map(writer => writer.name).join(", ");
    let strDirector = arrDirector.map(director => director.name).join(", ");
    let strMusic = arrMusic.map(music => music.name).join(", ");
    let strCostume = arrCostume.map(costume => costume.name).join(", ");
    
    // console.log(`Writer array is ${strWriter}`)
    // console.log(`Director array is ${strDirector}`)
    // console.log(`Music composed by array is ${strMusic}`)
    // console.log(`Costume Design by array is ${strCostume}`)

    return (
        <>
            <h1 className='text-cyan-300'>{episodeDetails.name}</h1>
            <br />
            <div className="flex flex-col items-center">
                <div className="w-[40%] border-2 border-black rounded-lg">
                    <figure className="shadow-lg cursor-pointer m-2 border-2 border-black rounded-lg">
                        <img src={imageURL} alt={episodeDetails.name} />
                    </figure>
                    <p className="text-base font-bold text-cyan-300">Episode: {episodeDetails.episode_number}</p>            
                </div>
                <br />
                <div className="w-[40%] border-2 border-black rounded-lg">
                    <p className="text-left text-cyan-300"><span className="text-base font-bold text-cyan-600">Plot Summary:</span> {episodeDetails.overview}</p>
                    <p className="text-left text-cyan-300"><span className="text-base font-bold text-cyan-600">Writer:</span> {strWriter}</p>
                    <p className="text-left text-cyan-300"><span className="text-base font-bold text-cyan-600">Director:</span> {strDirector}</p>
                    <p className="text-left text-cyan-300"><span className="text-base font-bold text-cyan-600">Music:</span> {strMusic}</p>
                    <p className="text-left text-cyan-300"><span className="text-base font-bold text-cyan-600">Costume Design:</span> {strCostume}</p>
                </div>
            </div>
            <CommentSection episodeId={episodeDetails.id} />
        </>
    )
}