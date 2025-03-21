import PropTypes from 'prop-types';
import { useEffect, useState  } from 'react';
const baseUrl = import.meta.env.VITE_API_URL + "/api/posts";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
};

const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const PostVa = ({ searchTerm }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(baseUrl);
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Sort by date descending

    return (
        <>
            {filteredPosts.map((post) => (
                <div key={post.id} className='w-full max-w-md mx-auto flex flex-col mt-4'>
                    <div className='relative w-full h-48 bg-gray-300 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'>
                        <img className='absolute top-0 left-0 w-full h-full object-cover rounded-xl' src={post.image} alt='' />
                        <span className='absolute top-3 right-3 bg-black/80 text-xs text-white font-normal px-2.5 py-2 rounded-xl'>{post.category || 'Uncategorized'}</span>
                    </div>
                    <div className='w-full text-xs font-light text-gray-500 px-2 mt-4'>
                        {formatDate(post.fecha) + ' ' + formatTime(post.fecha)}
                    </div>
                    <div className='w-full text-2xl font-semibold text-gray-900 px-2 mt-2 truncate'>
                        {post.title}
                    </div>
                    <div className='w-full h-44 overflow-hidden text-base font-normal text-gray-900 px-2 mt-2'>
                        {truncate(post.description, 300)}
                    </div>
                    <div className='w-full h-[0.025em] bg-gray-400/90 mt-2'></div>
                    <div className='w-full flex flex-row justify-end px-2 mt-2'>
                        {/* Additional content can go here */}
                    </div>
                </div>
            ))}
        </>
    );
};
PostVa.propTypes = {
    searchTerm: PropTypes.string
};

export default PostVa;