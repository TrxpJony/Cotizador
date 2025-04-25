import Sidebar from "../components/common/Sidebar";
import PostVa from "../components/post/postVa";
import { useState } from "react";
import { MdOutlineDensitySmall, MdCalendarMonth } from "react-icons/md";
import { LuFolderPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Calendar, Pagination } from "@heroui/react";
import { parseDate } from "@internationalized/date";

const EditPostPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar la visibilidad del calendario
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Para filtrar y paginar los posts, necesitamos obtener la lista filtrada aqui
    // Creamos un estado para guardar la cantidad total de posts filtrados
    const [filteredCount, setFilteredCount] = useState(0);

    // Handle para actualizar el número total de post filtrados desde PostVa
    const handleFilteredCount = (count) => {
        setFilteredCount(count);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setSelectedDate(null); // Resetear la fecha al filtrar por categoría
    };

    const handleDateFilter = (date) => {
        setSelectedDate(date);
        setSelectedCategory(""); // Resetear la categoría al filtrar por fecha
        setIsCalendarOpen(false); // Cerrar el calendario después de seleccionar una fecha
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
                        <div className="mt-5 ">
                            <input
                                type="text"
                                placeholder="Buscar posts..."
                                className="w-full p-3 border border-gray-300 rounded-2xl shadow-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row py-4 justify-center gap-4 sm:gap-8">
                            <button
                                className={`border border-black py-1 px-2 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "" && !selectedDate ? "bg-black text-white" : ""
                                    }`}
                                onClick={() => handleCategoryFilter("")}
                            >
                                <MdOutlineDensitySmall />
                            </button>
                            <button
                                className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Regalos" ? "bg-black text-white" : ""
                                    }`}
                                onClick={() => handleCategoryFilter("Regalos")}
                            >
                                Regalos
                            </button>
                            <button
                                className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Eventos" ? "bg-black text-white" : ""
                                    }`}
                                onClick={() => handleCategoryFilter("Eventos")}
                            >
                                Eventos
                            </button>
                            <button
                                className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Salidas" ? "bg-black text-white" : ""
                                    }`}
                                onClick={() => handleCategoryFilter("Salidas")}
                            >
                                Salidas
                            </button>
                            <button
                                className={`border border-black py-1 px-4 sm:px-10 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto ${selectedCategory === "Premios" ? "bg-black text-white" : ""
                                    }`}
                                onClick={() => handleCategoryFilter("Premios")}
                            >
                                Premios
                            </button>
                            <div className="relative">
                                <button
                                    className="border border-black py-2 px-2 rounded-2xl hover:bg-black hover:text-white transition-all w-full sm:w-auto flex items-center justify-center"
                                    onClick={() => setIsCalendarOpen(!isCalendarOpen)} // Alternar visibilidad del calendario
                                >
                                    <MdCalendarMonth />
                                </button>
                                {isCalendarOpen && (
                                    <div className="absolute mt-2 z-50 bg-transparent rounded-lg p-2">
                                        <Calendar
                                            aria-label="Seleccionar fecha"
                                            value={selectedDate ? parseDate(selectedDate.toISOString().split('T')[0]) : null}
                                            onChange={(date) => handleDateFilter(date.toDate("UTC"))}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="">
                            <Link
                                to="/addPost"
                                className="flex"
                            >
                                <button
                                    className="flex border border-cyan-500  text-cyan-500 py-2 px-10 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all "
                                >
                                    <p className="text-sm font-semibold">Añadir</p> <p className="text-sm text-transparent">s</p><p className="mt-0.5"><LuFolderPlus /></p>
                                </button>
                            </Link>
                        </div>
                        {/*Tarjetas con mejor diseño */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <PostVa searchTerm={searchTerm} selectedCategory={selectedCategory} selectedDate={selectedDate} currentPage={currentPage} itemsPerPage={itemsPerPage} onFilteredCount={handleFilteredCount}/>
                        </div>
                        <div className="flex justify-center mt-6">
                            <Pagination
                                showControls
                                classNames={{
                                    base: "",
                                    wrapper: "",
                                    prev: "bg-white",
                                    next: "bg-white",
                                    item: "bg-transparent",
                                    cursor: "bg-cyan-500"
                                }}
                                initialPage={1}
                                page={currentPage}
                                total={Math.ceil(filteredCount / itemsPerPage)}
                                onChange={(page) => {
                                    setCurrentPage(page);
                                    window.scrollTo(0, 0);
                                }}
                                color="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditPostPage;