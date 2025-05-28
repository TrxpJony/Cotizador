import { FaArrowRight } from "react-icons/fa";
import puerta from "../../../../img/img_servicios/puer.png";

const AluminioHeroSection = () => {
    return (
        <section className="relative overflow-hidden py-16 lg:py-32 bg-white">
            {/* Decoración superior izquierda */}
            <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                alt="Aluminio decorativo"
                className="absolute top-0 left-0 w-32 h-32 object-cover rounded-full shadow-lg opacity-30 lg:w-48 lg:h-48"
                style={{ transform: "translate(-30%,-30%)" }}
            />
            {/* Decoración inferior derecha */}
            <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
                alt="Ventana aluminio"
                className="absolute bottom-0 right-0 w-24 h-24 object-cover rounded-full shadow-lg opacity-20 lg:w-40 lg:h-40"
                style={{ transform: "translate(30%,30%)" }}
            />
            <div className="container mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
                {/* Texto */}
                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 animate-fadein">
                    <span className="inline-block bg-cyan-500 text-white font-semibold px-4 py-1 rounded-full mb-2 shadow-sm">
                        Soluciones en Aluminio
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2 leading-tight drop-shadow-sm">
                        Perfilería en Aluminio <br className="hidden md:inline" />
                        Para Puertas y Ventanas
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        En{" "}
                        <span className="font-semibold text-cyan-500">
                            Vidrio al Arte SAS
                        </span>
                        , ofrecemos soluciones personalizadas en aluminio para tus
                        proyectos. Desde puertas y ventanas hasta estructuras
                        arquitectónicas, nuestro equipo está listo para ayudarte a
                        crear espacios únicos y funcionales.
                    </p>
                    <a
                        href="/servicios/aluminio"
                        className="inline-flex items-center gap-2 border-cyan-500 border bg-transparent text-cyan-500 hover:text-white px-6 py-2 rounded-2xl font-semibold hover:shadow-xl hover:bg-cyan-500 hover:border-transparent transition-all ease-in "
                    >
                        Explorar Servicios <FaArrowRight />
                    </a>
                </div>
                {/* Imagen principal */}
                <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0 animate-fadein-slow">
                    <img
                        src={puerta}
                        alt="Puerta de aluminio moderna"
                        className="rounded-3xl shadow-md sm:shadow-2xl w-96 h-96 object-cover border-4 border-white"
                    />
                </div>
            </div>
            {/* Animaciones simples */}
            <style>{`
                .animate-fadein { animation: fadein 1s ease 0.2s both; }
                .animate-fadein-slow { animation: fadein 1.5s ease 0.5s both; }
                @keyframes fadein {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: none;}
                }
            `}</style>
        </section>
    );
};

export default AluminioHeroSection;