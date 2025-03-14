import { motion } from 'framer-motion';
import '../../css/colosal.css';

const links = [
    { name: 'Productos', href: '/productos' },
    { name: 'Acerca de nosotros', href: '/nosotros' },
];

export function CortinaMovimiento() {
    return (
        <motion.div
            className="relative isolate overflow-hidden py-24 sm:py-32 text-center"
            style={{
                background: "linear-gradient(90deg, #22d3ee, #0891b2, #9ca3af, #374151, #374151, #9ca3af, #0891b2, #22d3ee, #0891b2)",
                backgroundSize: "800% 800%", // Movimiento más fluido
            }}
            animate={{
                backgroundPosition: [
                    "0% 50%", "25% 50%", "50% 50%", "75% 50%", "100% 50%"
                ],
            }}
            transition={{
                duration: 50,
                ease: "linear",
                repeat: Infinity,
            }}
        >
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <motion.h2
                    className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
                    animate={{
                        opacity: [1, 0.95, 1],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    Vidrio al Arte SAS
                </motion.h2>

                <p className="mt-6 text-lg text-gray-300 sm:text-xl">
                    Especialistas en vidrios y espejos personalizados de alta calidad. ¡Confía en nosotros para todas tus necesidades!
                </p>

                <div className="mt-10 flex justify-center gap-6">
                    {links.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="px-6 py-3 rounded-lg text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-400 transition-all"
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: "#22d3ee",
                                boxShadow: "0px 4px 15px rgba(34, 211, 238, 0.6)",
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
