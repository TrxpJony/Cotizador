import { Card, Image, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function EspejosDescription(props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            aria-label="Descripción de espejos personalizados"
        >
            {/* Primer Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.7 }}
            >
                <Card className="w-full max-w-5xl px-6 bg-transparent sm:mb-10" {...props}>
                    <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                        <Image
                            removeWrapper
                            alt="Espejo personalizado con iluminación LED de ACERVID"
                            className="h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745854239/carrusel/zpf983bzgtsneydi3q08.jpg"
                        />
                        <div className="px-6 py-8">
                            <h2 className="text-2xl text-white font-medium">¡Diseños Personalizados de Espejos!</h2>
                            <div className="flex flex-col gap-4 pt-3 text-base text-default-400">
                                <p>
                                    Personaliza tus espejos al gusto: elige tamaño, forma, iluminación y más para que se adapten perfectamente a tu estilo y espacio.
                                </p>
                                <p>¡Dale un toque único a tu hogar con los espejos iluminados de ACERVID!</p>
                            </div>
                            <div className="mt-6 text-center sm:text-left">
                                <a href="https://api.whatsapp.com/send?phone=573223065256" target='_blank' rel='noopener noreferrer'>
                                    <button className="text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all">¡COTIZA EL TUYO!</button>
                                </a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>

            {/* Segundo Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.7 }}
            >
                <Card className="w-full max-w-5xl px-6 bg-transparent mb-10 sm:mt-10" {...props}>
                    <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                        <Image
                            removeWrapper
                            alt="Variedad de diseños de espejos modernos, clásicos y minimalistas"
                            className="h-auto w-full flex-none object-cover object-top md:w-64 lg:w-96 order-none sm:order-1"
                            src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745857478/carrusel/lu5lzt58gxitmgfeihwu.jpg"
                        />
                        <div className="px-6 py-8 order-1 sm:order-none">
                            <h2 className="text-2xl text-white font-medium">¡Gran Variedad De Diseños de Espejos!</h2>
                            <div className="flex flex-col gap-4 pt-3 text-base text-default-400">
                                <p>
                                    Descubre nuestra amplia colección de espejos diseñados para todos los gustos. Contamos con estilos modernos, clásicos y minimalistas, listos para embellecer cualquier espacio.
                                </p>
                                <p>¡Encuentra en ACERVID el espejo perfecto para tu hogar o negocio!
                                </p>
                            </div>
                            <div className="mt-6 text-center sm:text-left">
                                <a href="https://www.canva.com/design/DAGWfFjnEC8/YtzVi3d6LVzHV5XLNmUYvg/edit" target="_blank" rel="noopener noreferrer">
                                    <button className="text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all">¡EXPLORAR CATALOGO!</button>
                                </a>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </motion.section>
    );
}