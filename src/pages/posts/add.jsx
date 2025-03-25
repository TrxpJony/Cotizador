import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/common/backButton";
import Sidebar from "../../components/common/Sidebar";
import PostFormAdd from "../../components/post/postFormAdd";

const baseUrl = import.meta.env.VITE_API_URL + "/api";

const AddPost = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            setIsSubmitting(true);

            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category); // Asegúrate de que sea solo la clave
            data.append("image", formData.image);

            const response = await axios.post(`${baseUrl}/posts`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Post creado:", response.data);
            navigate("/editPost");
        } catch (error) {
            console.error("Error al subir el post:", error);
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
                            <h1 className="text-2xl font-semibold text-gray-700">Agregar Post</h1>
                        </div>
                    </header>
                    <div className="px-20">
                        <PostFormAdd onSubmit={handleSubmit} />
                        <div className="p-10 flex flex-row justify-between">
                            <BackButton />
                            <button
                                onClick={() => document.querySelector('form').requestSubmit()}
                                disabled={isSubmitting}
                                className={`outline rounded-2xl outline-cyan-500 text-cyan-500 hover:text-white hover:bg-cyan-500 font-bold py-2 px-10 focus:outline-none focus:shadow-outline transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Subiendo...' : 'Subir'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPost;