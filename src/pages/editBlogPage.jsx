import Sidebar from "../components/common/Sidebar";
import PostVa from "../components/post/postVa";
import { useState } from "react";
import { MdOutlineDensitySmall, MdCalendarMonth } from "react-icons/md";
import { LuFolderPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

const EditPostPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };



    return (
        <>
            <div className="flex h-full overflow-hidden ">
                <Sidebar />
                <div className="flex-1 overflow-auto relative z-10">
                    <header className="bg-white backdrop-blur-md shadow-lg border-b">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-4 lg:px-8">
                            <h1 className="text-2xl font-semibold text-gray-700">Post</h1>
                        </div>
                    </header>

                    <div className="container mx-auto p-4 mb-4 max-w-7xl">
                        {/* barra de busquedas */}
                        <div className="mt-10 ">
                            <input
                                type="text"
                                placeholder="Buscar posts..."
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row py-4 justify-center gap-4 sm:gap-8">
                            <button
                                className="border border-black py-1 px-2 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto"
                            >
                                <MdOutlineDensitySmall />
                            </button>
                            <button
                                className="border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto"
                            >
                                Regalos
                            </button>
                            <button
                                className="border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto"
                            >
                                Eventos
                            </button>
                            <button
                                className="border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto"
                            >
                                Salidas
                            </button>
                            <button
                                className="border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto"
                            >
                                Premios
                            </button>
                            <button
                                className="border border-black py-1 px-2 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto"
                            >
                                <MdCalendarMonth />
                            </button>
                        </div>

                        <div className="">
                            <button
                                className="flex border border-cyan-500  text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all "
                            >
                                <Link
                                    to="/addPost"
                                    className="flex"
                                >
                                    <p className="text-sm font-semibold">Añadir</p> <p className="text-sm text-transparent">s</p><p className="mt-0.5"><LuFolderPlus /></p>
                                </Link>
                            </button>
                        </div>
                        {/*Tarjetas con mejor diseño */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <PostVa searchTerm={searchTerm} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditPostPage;