import { useState } from 'react';
import { supabase } from '../client';
import toast from 'react-hot-toast';
// page to allow the user to add a new content creator

interface Creator {
    name: string,
    imageURL: string,
    url: string,
    description: string,
    youtube: string,
    twitter: string,
    instagram: string
}

const AddCreator = () => {
    const [creator, setCreator] = useState<Creator>(
        {
            name: "",
            imageURL: "",
            url: "",
            description: "",
            youtube: "",
            twitter: "",
            instagram: ""
        }
    );

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCreator((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle add user
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // validation
        if (creator.name.trim() === "" || creator.imageURL.trim() === "" || creator.url.trim() === "" || creator.description.trim() === "") {
            toast.error("Required fields cannot be empty!")
            return
        }

        const { error } = await supabase.from("creators").insert(creator);

        if (error) {
            console.log(error);
            toast.error("Can't add creator")
        } else {
            setCreator({
                name: "",
                imageURL: "",
                url: "",
                description: "",
                youtube: "",
                twitter: "",
                instagram: ""
            });
            toast.success("Added!")
            window.location.href = "/creators"

        }
    };



    return (
        <>
            <form className='pt-8 flex justify-center'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-3">
                        <h2 className="text-3xl mb-2 font-semibold leading-7 text-gray-900 ">Create a creator card</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                        {/* Name */}
                        <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Name <span className='text-red-600'>*</span></label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            id="name"
                                            autoComplete="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="John Doe"
                                            onChange={handleChange}
                                            value={creator.name}
                                            name="name"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Image URL */}
                            <div className="sm:col-span-4">
                                <label htmlFor="imageURL" className="block text-sm font-medium leading-6 text-gray-900">Profile Picture URL <span className='text-red-600'>*</span></label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            id="imageURL"
                                            autoComplete="imageURL"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="https://"
                                            onChange={handleChange}
                                            value={creator.imageURL}
                                            name="imageURL"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-4">
                                <label htmlFor="imageURL" className="block text-sm font-medium leading-6 text-gray-900">About <span className='text-red-600'>*</span></label>
                                <div>
                                    <p className="text-sm leading-6 text-gray-600">Label yourself (e.g. YouTuber)</p>
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                                        <input
                                            type="text"
                                            id="description"
                                            maxLength={21}
                                            autoComplete="description"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={handleChange}
                                            value={creator.description}
                                            name="description"
                                        />

                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {creator.description.length}/21 characters
                                    </p>
                                </div>
                            </div>

                            {/* PERSONAL URL */}
                            <div className="sm:col-span-4">
                                <label htmlFor="imageURL" className="block text-sm font-medium leading-6">Personal URL (portfolio site, blog, anything) <span className='text-red-600'>*</span></label>

                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        id="url"
                                        autoComplete="url"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="https://"
                                        onChange={handleChange}
                                        value={creator.url}
                                        name="url"
                                    />
                                </div>
                            </div>

                            {/* YouTube */}
                            <div className="sm:col-span-4">
                                <label htmlFor="imageURL" className="block text-sm font-medium leading-6 text-red-700">YouTube</label>

                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        id="youtube"
                                        autoComplete="youtube"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="https://"
                                        onChange={handleChange}
                                        value={creator.youtube}
                                        name="youtube"
                                    />
                                </div>

                            </div>

                            {/* Twitter */}
                            <div className="sm:col-span-4">
                                <label htmlFor="imageURL" className="block text-sm font-medium leading-6 text-blue-700">Twitter</label>

                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        id="twitter"
                                        autoComplete="twitter"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="https://"
                                        onChange={handleChange}
                                        value={creator.twitter}
                                        name="twitter"
                                    />
                                </div>

                            </div>

                            {/* Instagram */}
                            <div className="sm:col-span-4">
                                <label htmlFor="imageURL" className="block text-sm font-medium leading-6 text-purple-700">Instagram</label>

                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        id="instagram"
                                        autoComplete="instagram"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="https://"
                                        onChange={handleChange}
                                        value={creator.instagram}
                                        name="instagram"
                                    />
                                </div>

                            </div>


                        </div>
                        <button
                            type="button"
                            className="mt-5 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={handleSubmit}
                        >
                            Create
                        </button>
                    </div>
                </div>

            </form>
        </>
    )
}

export default AddCreator