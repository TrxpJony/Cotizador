import '../../css/colosal.css'; // Archivo CSS para estilos
import { GlobeAmericasIcon, EyeIcon, CubeTransparentIcon, HandRaisedIcon, HeartIcon, Cog8ToothIcon, ShieldCheckIcon, UserGroupIcon, PuzzlePieceIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Organigrama from '../../img/img_nosotros/organigrama.jpg'
const baseUrl = import.meta.env.VITE_API_URL + "/api/blog-images";

const features = [
    {
        name: 'Misión.',
        description:
            'Aprovechar la capacidad tecnológica y organizativa que brinda la compañia con su máquinaria de punta y con mano de obra calificada, con la que podamos garantizar una produccion de alta calidad, acorde a las necesidades de nuestros clientes y a precios competitivos.',
        icon: GlobeAmericasIcon,
    },
    {
        name: 'Visión.',
        description: 'Para el año 2025 ser una empresa líder transformadora de vidrios y espejos, agregando nuevos servicios como el diseño creativo de estos cristales para el desarrollo de la construccion y decoracion de interiores.',
        icon: EyeIcon,
    },
];
export function Mision() {
    const [showOrganigrama, setShowOrganigrama] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(baseUrl);
                let fetchedImages = response.data.map(img => img.secure_url);

                // Ensure at least two images for Swiper
                if (fetchedImages.length === 1) {
                    fetchedImages = [...fetchedImages, ...fetchedImages];
                }
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images", error);
            }
        };
        fetchImages();
    }, []);

    return (
        <>

            <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg
                        aria-hidden="true"
                        className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    >
                        <defs>
                            <pattern
                                x="50%"
                                y={-1}
                                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                                width={200}
                                height={200}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                    </svg>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base/7 font-semibold text-cyan-500">Vidrio al Arte SAS</p>
                                <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-700 sm:text-5xl">
                                    CULTURA ORGANIZACIONAL
                                </h1>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-default-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-700">
                                                <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-cyan-600" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>

                            </div>
                        </div>
                    </div>
                    <div className=" -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        {images.length > 0 && (
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                allowTouchMove={false} // Disable user interaction for sliding
                                effect="fade"
                                modules={[Autoplay, EffectFade]}
                                className="w-[48rem] h-[35rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            alt={`Slide ${index + 1}`}
                                            src={image}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
                                <h2 className="mt-2 text-pretty text-3xl font-semibold tracking-tight text-gray-700 sm:text-3xl">VALORES CORPORATIVOS</h2>
                                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                    <li className="flex gap-x-3">
                                        <CubeTransparentIcon aria-hidden="true" className="mt-1 size-5 flex-none text-cyan-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Transparencia:</strong> Nuestra gestión la desarrollamos de forma equitativa, clara y verificable.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <HandRaisedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-cyan-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Honestidad:</strong> Actuamos con rectitud en cada una de las actividades que se emprenden y que se realizan dentro de la organización.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <HeartIcon aria-hidden="true" className="mt-1 size-5 flex-none text-cyan-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Respeto:</strong> Interactuamos reconociendo el tratamiento que debemos dar hacia nuestros superiores, hacia nuestros clientes internoss y externos; valorando relaciones interpersonales, laborales y comerciales.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <Cog8ToothIcon aria-hidden="true" className="mt-1 size-5 flex-none text-cyan-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Responsabilidad:</strong> Trabajamos cumpliendo con todos los parámetros y normas establecidas en la organización para lograr el desarrollo armónico de las labores.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <ShieldCheckIcon aria-hidden="true" className="mt-1 size-5 flex-none text-cyan-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Confianza:</strong> Cumplimos con lo prometido al ofrecer los mejores productos y servicios a un precio justo y razonable.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <UserGroupIcon aria-hidden="true" className="mt-1 size-5 flex-none text-cyan-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Trabajo en equipo:</strong> Con el aporte de todos los que intervienen en los diferentes procesos de la organización buscamos el logro de los objetivos organizacionales.
                                        </span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <PuzzlePieceIcon aria-hidden="true" className="mt-1 size-5 flex-none text-cyan-600" />
                                        <span>
                                            <strong className="font-semibold text-gray-900">Integridad:</strong> Aun los más graves errores tienen una solución si se les enfrenta con rapidez y uniendo todos los esfuerzos de las personas que estan a nuestro alrededor; uniendo las virtudes de cada uno y conociendo la verdad pasan a ser parte de la solución y no de un problema más grande.
                                        </span>
                                    </li>
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowOrganigrama(!showOrganigrama)}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
                                >
                                    {showOrganigrama ? 'Ocultar Organigrama' : 'Ver Organigrama'}
                                </motion.button>
                                <AnimatePresence initial={false}>
                                    {showOrganigrama && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="mt-4"
                                        >
                                            <img
                                                alt="Organigrama"
                                                src={Organigrama}
                                                className="w-full max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
