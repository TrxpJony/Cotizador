import { FaEnvelopeOpenText } from "react-icons/fa";

const AluminioContactSection = () => {
    return (
        <section className="w-full py-16 lg:py-32 bg-white flex justify-center">
            <div className="max-w-2xl w-full mx-auto text-center px-6">
                <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500 shadow">
                        <FaEnvelopeOpenText className="text-white text-3xl" />
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
                    ¿Listo para realizar tu cotización?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Nuestro equipo está preparado para asesorarte y brindarte una propuesta personalizada en aluminio. ¡Contáctanos y haz realidad tu proyecto!
                </p>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-2 border-cyan-500 border bg-transparent text-cyan-500 hover:text-white px-6 py-2 rounded-2xl font-semibold hover:shadow-xl hover:bg-cyan-500 hover:border-transparent transition-all ease-in "
                >
                    Solicita tu cotización
                </a>
            </div>
        </section>
    );
};
export default AluminioContactSection;