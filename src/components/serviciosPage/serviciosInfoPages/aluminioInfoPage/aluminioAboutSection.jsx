import { FaRecycle, FaBolt, FaPalette } from "react-icons/fa";

const AluminioAboutSection = () => {
    return (
        <section className="relative py-16 lg:py-32">
            {/* Imagen decorativa pequeña */}
            <div className="mx-auto lg:px-0 px-6 ">
                <div className="text-center mb-12">
                    <span className="uppercase tracking-widest text-cyan-500 font-bold text-sm">¿Por qué elegir aluminio?</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2 mb-4">
                        El material del futuro, hoy
                    </h2>
                    <p className="text-gray-600 max-w-2xl text-lg mx-auto">
                        El aluminio destaca por su ligereza, resistencia y versatilidad. Descubre por qué es la mejor opción para tus proyectos arquitectónicos y de diseño.
                    </p>
                </div>
                {/* Cards de ventajas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition">
                        <FaRecycle className="text-cyan-500 text-4xl mb-4" />
                        <h3 className="font-bold text-lg mb-2 text-gray-800">100% Reciclable</h3>
                        <p className="text-gray-600 text-center text-sm">
                            El aluminio puede reciclarse infinitamente sin perder calidad, cuidando el planeta y tus proyectos.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition">
                        <FaBolt className="text-cyan-500 text-4xl mb-4" />
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Ligero y Resistente</h3>
                        <p className="text-gray-600 text-center text-sm">
                            Su relación peso-resistencia lo hace ideal para estructuras modernas, seguras y duraderas.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition">
                        <FaPalette className="text-cyan-500 text-4xl mb-4" />
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Acabados Personalizables</h3>
                        <p className="text-gray-600 text-center text-sm">
                            El aluminio permite una amplia gama de acabados y colores para adaptarse a cualquier estilo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AluminioAboutSection;