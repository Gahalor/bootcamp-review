import { useCanister } from "@connect2ic/react";

import React, { useState } from "react";

import ReactStars from "react-rating-stars-component";
import { shortenAddress } from '../utils/shortenAddress';

const SocialItem = (props) => {
    const { post, refresh } = props;
    const [social] = useCanister("social");

    const [loading, setLoading] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(post[1].message);
    const [visible, setVisible] = useState(false);

    const [update, setUpdate] = useState(false);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    return (
        <div className="rounded-lg blue-glassmorphism p-4">
            <p className="text-sm text-slate-300">Usuario: {shortenAddress(post[1].creator)}</p>
            <div className="my-2">
                <div className="rounded-lg overflow-hidden">
                    <div className="h-32 bg-slate-400/10 rounded-lg p-2 overflow-auto">
                        <p className="text-white text-sm flex items-center">{post[1].message}</p>
                    </div>
                </div>
            </div>
            <ReactStars
                count={5}
                value={post[1].rate}
                edit={false}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
            />
            <p>{loading}</p>
        </div>
    );
}

export { SocialItem }