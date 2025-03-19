import img1 from '../../img/pruebas/despedida.jpg'
import img2 from '../../img/pruebas/bonos.jpg'
import img3 from '../../img/pruebas/copass.jpg'
import img4 from '../../img/pruebas/cumpleaños.jpg'
import PropTypes from 'prop-types';

const Posts = [
    {
        id: 1,
        title: "Despedida de diciembre 2024",
        description: "El cierre del año se celebró con una salida a las canchas de tejo, donde todos los miembros del equipo tuvieron la oportunidad de disfrutar de una jornada llena de risas, competencia amistosa y camaradería. Fue el escenario perfecto para dar fin a un año lleno de logros y retos superados.",
        fecha: "2023-07-28T12:34:56Z",
        category: "Salidas",
        image: img1
    },
    {
        id: 2,
        title: "Bonos de regalo para el equipo",
        description: "Como parte de nuestra política de reconocer el esfuerzo y dedicación de todos los colaboradores, se realizó la entrega de bonos de regalo. Este gesto simboliza nuestro agradecimiento por el trabajo excepcional de cada miembro del equipo, que ha contribuido al éxito de nuestra organización.",
        fecha: "2023-07-28T12:34:56Z",
        category: "Regalos",
        image: img2
    },
    {
        id: 3,
        title: "Premios COPASST",
        description: "En una ceremonia llena de emoción, premiamos a nuestros miembros del Comité Paritario de Seguridad y Salud en el Trabajo (COPASST), quienes con su arduo trabajo y compromiso han asegurado el bienestar de todos. Este evento fue una muestra de nuestro reconocimiento a su incansable labor y su aporte.",
        fecha: "2023-07-28T12:34:56Z",
        category: "Premios",
        image: img3
    },
    {
        id: 4,
        title: "Cumpleaños de diciembre",
        description: "Para finalizar el año con alegría, organizamos una emotiva celebración en honor a los compañeros que cumplen años en diciembre. Fue una fiesta llena de sorpresas, juegos y buenos deseos para todos, un evento que reflejó la unidad y el espíritu de familia que nos caracteriza como equipo.",
        fecha: "2023-07-28T12:34:56Z",
        category: "Eventos",
        image: img4
    }
];


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
};

const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const PostVa = ({ searchTerm }) => {
    const filteredPosts = Posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            {filteredPosts.map((post) => (
                <div key={post.id} className='w-full max-w-md mx-auto flex flex-col mt-4'>
                    <div className='relative w-full h-48 bg-gray-300 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'>
                        <img className='absolute top-0 left-0 w-full h-full object-cover rounded-xl'src={post.image} alt='' />
                        <span className='absolute top-3 right-3 bg-black/80 text-xs text-white font-normal px-2.5 py-2 rounded-xl'>{post.category || 'Uncategorized'}</span>
                    </div>
                    <div className='w-full text-xs font-light text-gray-500 px-2 mt-4'>
                        {formatDate(post.fecha) + ' ' + formatTime(post.fecha)}
                    </div>
                    <div className='w-full text-2xl font-semibold text-gray-900 px-2 mt-2 truncate'>
                        {post.title}
                    </div>
                    <div className='w-full h-44 overflow-hidden text-base font-normal text-gray-900 px-2 mt-2'>
                        {truncate(post.description, 300)}
                    </div>
                    <div className='w-full h-[0.025em] bg-gray-400/90 mt-2'></div>
                    <div className='w-full flex flex-row justify-end px-2 mt-2'>
                      
                    </div>
                </div>
            ))}
        </>
    );
};
PostVa.propTypes = {
    searchTerm: PropTypes.string
};

export default PostVa;