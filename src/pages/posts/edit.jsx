import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/common/backButton";
import Sidebar from "../../components/common/Sidebar";
import PostFormAdd from "../../components/post/postFormAdd";
import { toast } from "react-toastify"
import { LuCircleFadingArrowUp } from "react-icons/lu";
const baseUrl = import.meta.env.VITE_API_URL + "/api";

const EditPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state || {}; // Recibir datos del post seleccionado
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData) => {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("category", formData.category);
        if (formData.image) data.append("image", formData.image);

        setIsSubmitting(true);

        try {
            await toast.promise(
                axios.put(`${baseUrl}/posts/${post.id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                }),
                {
                    pending: "Actualizando publicación...",
                    success: {
                        render() {
                            return "¡Publicación actualizada con éxito!";
                        },
                        autoClose: 2000,
                    },
                    error: "Error al actualizar la publicación",
                }
            );

            await new Promise(resolve => setTimeout(resolve, 2000)); // da tiempo a leer el toast

            navigate("/editPost");

        } catch (error) {
            console.error("Error al actualizar el post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <div className="flex h-full overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto relative z-10">
                    <header className="bg-white backdrop-blur-md shadow-lg border-b sticky top-0">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-semibold text-gray-700">Editar Post</h1>
                        </div>
                    </header>
                    <div className="px-20">
                        <PostFormAdd onSubmit={handleSubmit} initialData={post} />
                        <div className="p-10 flex flex-row justify-between">
                            <BackButton />
                            <button
                                onClick={() => document.querySelector('form').requestSubmit()}
                                disabled={isSubmitting}
                                className={`outline rounded-2xl outline-cyan-500 text-cyan-500 hover:text-white hover:bg-cyan-500 font-bold py-2 px-10 focus:outline-none focus:shadow-outline transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span className="flex items-center gap-2">
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar'} <LuCircleFadingArrowUp size={18}/>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPost;
