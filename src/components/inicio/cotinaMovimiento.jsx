import { motion } from 'framer-motion';
import '../../css/colosal.css';

const links = [
    { name: 'Productos', href: '/productos' },
    { name: 'Acerca de nosotros', href: '/nosotros' },
];

const stats = [

];

const gradientVariants = {
    animate: {
        background: [
            "linear-gradient(45deg, #06b6d4, #0891b2, #64748b)",
            "linear-gradient(135deg, #06b6d4, #0891b2, #64748b)",
            "linear-gradient(225deg, #06b6d4, #0891b2, #64748b)",
            "linear-gradient(315deg, #06b6d4, #0891b2, #64748b)"
        ],
        transition: {
            duration: 12,
            ease: "linear",
            repeat: Infinity,
        },
    },
};

export function CortinaMovimiento() {
    return (
        <motion.div
            className="relative isolate overflow-hidden py-24 sm:py-32 text-center"
            style={{ backgroundSize: "200% 200%" }}
            variants={gradientVariants}
            animate="animate"
        >
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h2 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">Vidrio al Arte SAS</h2>
                <p className="mt-6 text-lg text-gray-300 sm:text-xl">
                    Especialistas en vidrios y espejos personalizados de alta calidad. ¡Confía en nosotros para todas tus necesidades!
                </p>
                
                <div className="mt-10 flex justify-center gap-6">
                    {links.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="px-6 py-3 rounded-lg text-lg font-medium text-white bg-cyan-700 hover:bg-cyan-600 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                <dl className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.name} className="flex flex-col items-center">
                            <motion.dd className="text-4xl font-semibold text-white" whileHover={{ scale: 1.1 }}>
                                {stat.value}
                            </motion.dd>
                            <dt className="text-base text-gray-300">{stat.name}</dt>
                        </div>
                    ))}
                </dl>
            </div>
        </motion.div>
    );
}
