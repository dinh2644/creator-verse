import { Creator } from '../App';
import { useParams } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import { useState } from 'react';
import YouTube from "../assets/youtube.png"
import Twitter from "../assets/twitter.png"
import Instagram from "../assets/instagram.png"
// page to view a single content creator


interface EditCreatorProps {
    creators: Creator[]
}

const ViewCreator = ({ creators }: EditCreatorProps) => {
    const { id } = useParams();
    const [creator] = useState<Creator | undefined>(creators.find((creator) => String(creator.id) === String(id)))

    if (!creator) {
        return <PageNotFound />
    }

    // Get handle from social media urls
    function getHandle(url: string, target: string) {
        const urlParts = url.split('/');
        return urlParts
            .map(part => part.split('?')[0])
            .find(part => part.toLowerCase().includes(target));
    }


    const ytHandle = getHandle(creator.youtube.toLowerCase(), creator.name.split(' ')[0].toLowerCase())
    const ytHandle1 = getHandle(creator.youtube.toLowerCase(), creator.name.split(' ')[1]?.toLowerCase())

    const xHandle = getHandle(creator.twitter.toLowerCase(), creator.name.split(' ')[0].toLowerCase())
    const xHandle1 = getHandle(creator.twitter.toLowerCase(), creator.name.split(' ')[1]?.toLowerCase())

    const igHandle = getHandle(creator.instagram.toLowerCase(), creator.name.split(' ')[0].toLowerCase())
    const igHandle1 = getHandle(creator.instagram.toLowerCase(), creator.name.split(' ')[1]?.toLowerCase())


    return (
        <>
            <div className="relative bg-white navbar-offset pt-36 lg:pt-48">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col text-center lg:flex-row lg:text-left">
                        <div className="self-center lg:w-1/2 lg:pr-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-3">
                                About me
                            </h2>
                            <p className='pb-3 text-3xl font-semibold leading-7 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'>{`${creator.description}`}</p>
                            <ul>
                                {creator.youtube &&
                                    <li>
                                        <a href={creator.youtube} className='flex items-center' target='_blank'>
                                            <img src={YouTube} alt="youtube" className="w-12 h-auto mr-2 my-3" /> <span className='text-2xl font-medium hover:scale-105 transition-all'>@{ytHandle || ytHandle1 || creator.name}</span>
                                        </a>
                                    </li>}

                                {creator.twitter &&
                                    <li>
                                        <a href={creator.twitter} className='flex items-center' target='_blank'>
                                            <img src={Twitter} alt="twitter" className="w-12 h-auto py-5 mr-2 my-3" /> <span className='text-2xl font-medium hover:scale-105 transition-all'>@{xHandle || xHandle1 || creator.name}</span>
                                        </a>
                                    </li>}

                                {creator.instagram &&
                                    <li>
                                        <a href={creator.instagram} className='flex items-center' target='_blank'>
                                            <img src={Instagram} alt="instagram" className="w-12 h-auto mr-2 my-3" /> <span className='text-2xl font-medium hover:scale-105 transition-all'>@{igHandle || igHandle1 || creator.name}</span>
                                        </a>
                                    </li>
                                }

                            </ul>
                        </div>
                        <div className="w-full h-full lg:w-1/2 mt-8 lg:mt-0">
                            <div className=" lg:aspect-w-3 lg:aspect-h-4">
                                <img
                                    className="object-cover w-3/6 h-3/6 lg:w-full lg:h-full mx-auto"
                                    src={creator.imageURL}
                                    alt="Creator profile"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewCreator