import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import '../../data.js'
const Feed = ({ category }) => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

            const response = await fetch(videoList_url);
            const result = await response.json();

            if (result.error) {
                console.log("API Error:", result.error.message);
                return;
            }

            setData(result.items || []);
        } catch (error) {
            console.log("Fetch Error:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [category])

    return (
        <div className="feed">
            {data.map((item) => {
                return (
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card' key={item.id}>
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
                )
            })}
        </div>
    )
}

export default Feed