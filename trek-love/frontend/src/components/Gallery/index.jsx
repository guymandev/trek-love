import Card from '../Card';

export default function Gallery({episodes, setEpisodeDetails}) {

    if (!episodes) {
        return <p>Loading...</p>
    }

    let galleryContent = episodes.map((episode, index) => {
        return (
            <Card 
                key={episode.id} 
                episode={episode}
                setEpisodeDetails={setEpisodeDetails} 
            />
        );
    });

    return (
        <>           
            <div className="flex flex-wrap justify-around">
                {galleryContent}
            </div>
        </>
    )
}