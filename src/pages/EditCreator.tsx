import { supabase } from '../client';
import { Creator } from '../App';
import { useParams } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
// page to allow the user to update a content creator's information

interface EditCreatorProps {
    creators: Creator[]
}

const EditCreator = ({ creators }: EditCreatorProps) => {
    const { id } = useParams();
    const [creator] = useState<Creator | undefined>(creators.find((creator) => String(creator.id) === String(id)))
    const [isModalOpen, setIsModalOpen] = useState(false);



    if (!creator) {
        return <PageNotFound />
    }

    const [newValue, setNewValue] = useState<Creator>(
        {
            id: creator.id,
            name: creator.name,
            imageURL: creator.imageURL,
            url: creator.url,
            description: creator.description,
            youtube: creator.youtube,
            twitter: creator.twitter,
            instagram: creator.instagram
        }
    );


    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewValue((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle update
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // validation
        if (newValue.name.trim() === "" || newValue.imageURL.trim() === "" || newValue.url.trim() === "" || newValue.description.trim() === "") {
            toast.error("Required fields cannot be empty!")
            return
        }
        const { error } = await supabase
            .from("creators")
            .update(newValue)
            .eq("id", id);
        if (error) {
            console.log(error);
            toast.error("Can't update creator")
        } else {
            setNewValue({
                id: creator.id,
                name: "",
                imageURL: "",
                url: "",
                description: "",
                youtube: "",
                twitter: "",
                instagram: ""
            });
            toast.success("Updated!")
            window.location.href = "/creators"

        }
    };

    // Handle delete
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsModalOpen(false);

        const { error } = await supabase.from("creators").delete().eq("id", id);

        if (error) {
            console.log(error);
            toast.error("Can't delete creator")
        } else {
            toast.success("Deleted!")
            window.location.href = "/creators"
        }
    }

    return (
        <>
            <form className='pt-8 flex justify-center'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-3">
                        <h2 className="text-3xl mb-2 font-semibold leading-7 text-gray-900 ">Edit <span className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text'>{`${creator?.name}`}</span>'s creator card</h2>
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
                                            placeholder={creator.name}
                                            onChange={handleChange}
                                            value={newValue.name}
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
                                            value={newValue.imageURL}
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
                                            value={newValue.description}
                                            name="description"
                                        />

                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {newValue.description.length}/21 characters
                                    </p>
                                </div>
                            </div>

                            {/* PERSONAL URL */}
                            <div className="sm:col-span-4">
                                <label htmlFor="imageURL" className="block text-sm font-medium leading-6 text-green-700">Personal URL (portfolio site, blog, anything) <span className='text-red-600'>*</span></label>

                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        id="url"
                                        autoComplete="url"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="https://"
                                        onChange={handleChange}
                                        value={newValue.url}
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
                                        value={newValue.youtube}
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
                                        value={newValue.twitter}
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
                                        value={newValue.instagram}
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
                            Make Changes
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Delete
                        </button>
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                                <div className="relative top-60 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                                    <div className="mt-3 text-center">
                                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Confirmation</h3>
                                        <div className="mt-2 px-7 py-3">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this creator?
                                            </p>
                                        </div>
                                        <div className="items-center px-4 py-3">
                                            <button
                                                id="ok-btn"
                                                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                                                onClick={handleDelete}
                                            >
                                                Yes, I'm sure
                                            </button>
                                            <button
                                                id="cancel-btn"
                                                className="mt-3 px-4 py-2 bg-white text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                No, cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </form >



        </>
    )
}

export default EditCreator