import { Creator } from '../App'
import Information from "../assets/information.png"
import { Link } from 'react-router-dom'
import DefaultImage from "../assets/placeholder.png"
import YouTube from "../assets/youtube.png"
import Twitter from "../assets/twitter.png"
import Instagram from "../assets/instagram.png"

interface CardProps {
    creator: Creator
}

const Card = ({ creator }: CardProps) => {

    return (
        <div className="card bg-base-100 card-shadow">
            <figure className="px-10 pt-10">
                <div className="image-container">
                    <a href={creator.url} target="_blank">
                        <img
                            src={creator.imageURL.substring(0, 4) === "data" ? creator.imageURL : DefaultImage}
                            alt="Shoes"
                            className="rounded-xl object-cover w-full h-full" />
                    </a>
                </div>
            </figure>
            <div className="card-body items-center text-center ">
                <h2 className="card-title break-all ">{creator.name}</h2>
                <p className='mb-2 break-all font-medium text-gray-600'>{creator.description}</p>
                <div className='flex mb-3'>
                    <a href={creator.youtube} className={creator.youtube === '' ? 'hidden' : ''} target='_blank'>
                        <img src={YouTube} alt="youtube" className="w-8 h-auto mx-3 hover:scale-110 transition-all" />
                    </a>
                    <a href={creator.twitter} className={creator.twitter === '' ? 'hidden' : ''} target='_blank'>
                        <img src={Twitter} alt="twitter" className="w-8 h-auto mx-3 hover:scale-110 transition-all" />
                    </a>
                    <a href={creator.instagram} className={creator.instagram === '' ? 'hidden' : ''} target='_blank'>
                        <img src={Instagram} alt="instagram" className="w-8 h-auto mx-3 hover:scale-110 transition-all" />
                    </a>

                </div>
                <div className="card-actions flex">
                    <Link to={`/about/${creator.id}`} className='btn bg-transparent border-0 border-white'><img src={Information} alt="information icon" width={25} /></Link>
                    <Link to={`/edit/${creator.id}`} className="btn text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</Link>
                </div>
            </div>
        </div>
    )
}

export default Card