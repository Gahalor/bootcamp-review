import { useCanister, useConnect } from "@connect2ic/react";
import { resizeImage, fileToCanisterBinaryStoreFormat } from "../utils/image"
import { useDropzone } from "react-dropzone"
import ReactStars from "react-rating-stars-component";
import logo from "../assets/dfinity.svg"
import image from "../assets/ICP_hub_latam.png"


import React, { useEffect, useState } from "react";
import { SocialItem } from "./SocialItem";
const ImageMaxWidth = 2048

const IcpSocial = () => {
    const [social] = useCanister("social");

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState("");
    const [file, setFile] = useState(null);
    const [rateit, setRateit] = useState(0);
    const [count, setCount] = useState(0);


    useEffect(() => {
        refreshPosts();  // Llama a refreshPosts cuando el componente se monta
    }, []);

    const refreshPosts = async () => {
        setLoading("Loading...");
        try {
            const result = await social.getPosts();
            setPosts(result.sort((a, b) => parseInt(b[0]) - parseInt(a[0])));  // Ordenar posts por ID
            setLoading("Done");
        } catch (e) {
            console.log(e);
            setLoading("Error happened fetching posts list");
        }
    }

    const ratingChanged = (newRating) => {
        setRateit(newRating)

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target[0].value == null || rateit == 0) {
            return
        }

        setLoading("Loading...");

        await social.createPost(e.target[0].value, rateit);
        await refreshPosts();
    }

    const handleRefresh = async () => {
        await refreshPosts();
    }

    return (
        <div className="flex justify-center flex-row p-4 w-full">

            {/* Create post section */}
            <div className="flex justify-center w-[580px] rounded-lg blue-glassmorphism overflow-hidden">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <img src={image} width="420" alt="bootcamp" />

                    </div>

                    <div className="flex flex-col items-center mt-4 p-5 space-x-2 w-full">
                        <div className="flex flex-col space-y-2 w-full items-center">
                            <label htmlFor="message" className="text-white">Escribe un comentario del Bootcamp</label>
                            <div className="w-full rounded-lg overflow-hidden">
                                <textarea id="message" required className="w-full py-2 px-3 bg-slate-300 rounded-b-lg overflow-auto text-slate-800" rows="5"/>
                            </div>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                            <button type="submit" className="w-48 p-2 rounded-sm bg-gray-950 hover:bg-gray-600 text-white text-lg font-semibold">Enviar calificación</button>
                        </div>
                            <p className="mt-4 text-slate-800">{loading}</p>
                    </div>
                </form>

            </div>

        

            {/* Post section */}

            <div className="mt-4 space-y-2 w-full">
                {/* <button className="w-1/2 bg-gray-950 hover:bg-gray-900 text-white p-2 font-bold" onClick={handleRefresh}>Refresh</button> */}
                <div className="px-12">
                    <h2 className="h2 font-bold text-xl text-white text-start">Opiniones</h2>

                </div>
                <div className="w-full px-12 grid grid-cols-3 gap-4">

                    {posts.map((post) => {
                        return (<SocialItem key={post[0]} post={post} refresh={handleRefresh} /> );
                    })}
                </div>
            </div>
        </div>
    )
}

export { IcpSocial }