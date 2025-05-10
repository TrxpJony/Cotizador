import division from '../../img/img_servicios/division.png'
import espejo from '../../img/img_servicios/espejo.png'
import accesorios from '../../img/img_servicios/accesorios.png'
import vidrio from '../../img/img_servicios/vidrio.png'
import corte from '../../img/img_servicios/corte.png'
import puer from '../../img/img_servicios/puer.png'
import { motion } from 'framer-motion';
import { useState } from 'react'

const posts = [
    {
        id: 1,
        title: 'Divisiones de baño',
        href: 'servicios/divisiones-de-baño',
        description:
            'Ofrecemos divisiones de baño de alta calidad, diseñadas para brindar elegancia y funcionalidad a su espacio.',
        category: { title: 'Baño', href: '#' },
        author: {
            name: 'Vidrio al Arte SAS',
            role: 'Proveedor',
            href: '#',
            imageUrl: division,
        },
        videoUrl: '',
    },
    {
        id: 2,
        title: 'Accesorios',
        href: 'accesorios',
        description:
            'Encuentre una gran variedad de accesorios y herramientas versátiles y duraderas, perfectas para realizar cualquier tipo de proyecto con confianza.',
        category: { title: 'Ferretería', href: '#' },
        author: {
            name: 'Vidrio al Arte SAS',
            role: 'Proveedor',
            href: '#',
            imageUrl: accesorios,
        },
        videoUrl: '',
    },
    {
        id: 3,
        title: 'Espejos',
        href: 'servicios/espejos-acervid',
        description:
            'Ofrecemos espejos con diseños personalizados de sandblasting y luces LED integradas para darle un toque moderno y elegante a su espacio.',
        category: { title: 'Espejos', href: '#' },
        author: {
            name: 'Vidrio al Arte SAS',
            role: 'Proveedor',
            href: '#',
            imageUrl: espejo,
        },
        videoUrl: '',
        // prueba : https://www.youtube.com/embed/cW5PmVFZLfE
    },
    {
        id: 4,
        title: 'Productos de vidrio',
        href: '#',
        description:
            'Proveemos productos de vidrio de alta calidad para diversas aplicaciones, desde ventanas hasta decoraciones.',
        category: { title: 'Vidrio', href: '#' },
        author: {
            name: 'Vidrio al Arte SAS',
            role: 'Proveedor',
            href: '#',
            imageUrl: vidrio,
        },
        videoUrl: '',
    },
    {
        id: 5,
        title: 'Equipos para servicio',
        href: '#',
        description:
            'Ofrecemos servicios especializados de biselado, mesa de corte, pulido, ademas de otros para sus proyectos de vidrio.',
        category: { title: 'Servicios', href: '#' },
        author: {
            name: 'Vidrio al Arte SAS',
            role: 'Proveedor',
            href: '#',
            imageUrl: corte,
        },
        videoUrl: '',
    },
    {
        id: 6,
        title: 'Perfileria en aluminio para crear puertas y ventanas',
        href: '#',
        description:
            'Utilizamos perfiles en aluminio para la creación de puertas y ventanas de alta calidad, combinando durabilidad y diseño.',
        category: { title: 'Acero', href: '#' },
        author: {
            name: 'Vidrio al Arte SAS',
            role: 'Proveedor',
            href: '#',
            imageUrl: puer,
        },
        videoUrl: '',
    },
];

const Servicios = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const openModal = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <section aria-labelledby='servicios' className=''>
                <div className='text-center'>
                    <h2 className='text-2xl font-semibold text-gray-700'>
                        Nos especializamos en
                    </h2>
                </div>
                <div className='mx-auto mb-10 mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
                    {posts.map((post) => (
                        <motion.article
                            key={post.id}
                            className='flex max-w-xl flex-col items-start justify-between transform transition-transform hover:scale-105 bg-white shadow-lg rounded-lg overflow-hidden'
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: post.id * 0.2 }}
                        >
                            <motion.img
                                src={post.author.imageUrl}
                                alt={post.title} // Mejorar el alt para SEO
                                className='w-full h-48 object-cover cursor-pointer'
                                whileHover={{ scale: 1.1 }}
                                onClick={() => openModal(post.videoUrl)} // Open modal only on image click
                            />
                            <div className='flex items-center gap-x-4 text-xs'>
                                <div className='group relative p-6'>
                                    <h2 className='mt-3 text-lg/6 font-semibold text-gray-800 group-hover:text-cyan-600 cursor-pointer'>
                                        <a href={post.href}>
                                            <span>
                                                {post.title}
                                            </span>
                                        </a>
                                    </h2>
                                    <p className='mt-5 text-sm/6 text-gray-800'>{post.description}</p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 relative" style={{ width: '1024px', height: '720px', maxWidth: '90%', maxHeight: '90%' }}>
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <div className="w-full h-full">
                            <iframe
                                src={selectedVideo}
                                className="w-full h-full rounded-lg"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Servicios;