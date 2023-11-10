import { Link } from "react-router-dom"
// import { useRef, useEffect } from "react"
import computerAudio from "../../assets/tos_unabletocomply.mp3"
import spockAudio from "../../assets/spock_illogical.mp3"
import spockPic from "../../assets/spock_next_to_computer.png"

export default function NotFoundPage() {

    // const audioRef1 = useRef();
    // const audioRef2 = useRef();

    // // Play audio click when user mouses over Main element
    // const handleMouseEnter = () => {
    //     audioRef1.current.play();
    // }

    // // Play second audio when the event listener inside 
    // // useEffect indicates the event for the useRef has
    // // completed.
    // const handleAudioEnded = () => {
    //     audioRef2.current.play();
    // }

    //  // Upon load of component create event listener for 
    //  // first audio clip, which will then call the second
    //  // audio clip.
    // useEffect(() => {
    //     // Add event listener for 
    //     audioRef1.current.addEventListener('ended', handleAudioEnded);

    //     // Clean up event listeners when the component unmounts
    //     return () => {
    //         console.log(`audioRef1 is type ${typeof(audioRef1)}`)
    //         if (audioRef1 != null) {
    //             audioRef1.current.removeEventListener('ended', handleAudioEnded);
    //         }
    //     };
    // }, []);

    return (
        <main className="h-[93vh] w-full flex flex-col justify-center items-center bg-indigo-600">
            <img src={spockPic} alt="" />
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            
            <div className="bg-rose-700 px-2 text-white text-sm rounded -rotate-12 absolute">
                Unable to comply
            </div>
            <Link to="/"><button className="mt-5">
                <span className="relative inline-block text-sm font-medium text-slate-200 group active:text-orange-500 focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-purple-600 group-hover:translate-y-0 group-hover:translate-x-0" />
                    <span className="relative block px-8 py-3 bg-blue-500 border border-current">
                        Return to Federation Space
                    </span>
                </span>
            </button>
            </Link>
            {/* <audio ref={audioRef1}>
                <source src={computerAudio} type="audio/mp3" />
            </audio>
            <audio ref={audioRef2}>
                <source src={spockAudio} type="audio/mp3" />
            </audio> */}
        </main>
    )
}