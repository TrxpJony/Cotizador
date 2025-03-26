import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie'; // Importar universal-cookie
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const cookies = new Cookies(); // Crear instancia de cookies

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

const PostVa = ({ searchTerm, selectedCategory, selectedDate }) => {
    const [posts, setPosts] = useState([]);
    const userRole = cookies.get('rol'); // Leer el rol del usuario desde las cookies

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

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            showCancelButton: true,
            confirmButtonColor: '#06B6D4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseUrl}/${id}`, {
                    method: 'DELETE',
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        toast(data.message, {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        // Actualizar el estado sin recargar la página
                        setPosts(posts.filter((post) => post.id !== id));
                    })
                    .catch((error) => {
                        console.error("Error al eliminar el post:", error);
                        Swal.fire("Error", "Hubo un problema al eliminar el post.", "error");
                    });
            }
        });
    };

    const filteredPosts = posts
        .filter((post) =>
            (!selectedCategory || post.category === selectedCategory) &&
            (!selectedDate || post.fecha.startsWith(selectedDate.toISOString().split('T')[0])) &&
            (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Sort by date descending

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

                    {/* Mostrar botones solo si el rol es administrador */}
                    {userRole === 'administrador' && (
                        <div className='w-full flex flex-row justify-end px-2 mt-2'>
                            <Link className='text-cyan-500 underline underline-offset-2 mr-4' to='/edit' state={{ post: post }}>
                                Edit
                            </Link>
                            <button
                                className='text-red-500 underline underline-offset-2'
                                onClick={() => handleDeleteClick(post.id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};
PostVa.propTypes = {
    searchTerm: PropTypes.string,
    selectedCategory: PropTypes.string,
    selectedDate: PropTypes.instanceOf(Date),
};

export default PostVa;