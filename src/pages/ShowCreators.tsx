import Card from '../components/Card';
import { Creator } from '../App';
import { useEffect, useState } from 'react';
import Empty from "../assets/empty.png"
// page to show all content creators

interface ShowCreatorsProps {
    creators: Creator[]
}


const ShowCreators = ({ creators }: ShowCreatorsProps) => {
    const [showCreators, setShowCreators] = useState<Creator[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredData = showCreators.filter((creator) => {
        return (
            String(searchQuery.toLowerCase()) === "" ||
            (creator?.name &&
                creator?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    })

    useEffect(() => {
        setShowCreators(creators)
    }, [creators])


    return (
        <>
            <div className="px-16 xl:px-36 2xl:px-48  py-3">
                {showCreators && showCreators.length > 0 ? (
                    <>
                        <div className="flex items-baseline justift-center  flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className='text-4xl py-3 font-medium'>Meet Creators</div>
                            {/* Search bar */}
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-11/12 p-3 ps-10 text-sm text-black border border-gray-300 rounded-lg"
                                    placeholder="Search"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                />
                            </div>


                        </div>
                        <div className='m-0 mt-3 sm:m-3 gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {filteredData.map((creator) => (
                                <Card key={creator.id} creator={creator} />
                            ))
                            }
                        </div>
                    </>
                ) :
                    (
                        <div className='flex flex-col justify-center items-center h-[50vh]'>
                            <img src={Empty} alt="magnifiying glass" width={300} />
                            <div className='text-sm sm:text-2xl mt-3 italic'>No Creators Yet</div>
                        </div>
                    )}

            </div>
        </>
    )
}

export default ShowCreators