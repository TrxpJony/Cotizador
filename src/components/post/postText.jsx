import { Link } from "react-router-dom";

const PostText = () => {
    return (
        <>
            <div className="mx-auto max-w-2xl  sm:py-10 lg:py-18">
                <div className="text-center">
                    <p className="text-base/7 font-semibold text-cyan-500">Vidrio al Arte SAS</p>
                    <div className="text-4xl font-bold tracking-tight sm:text-6xl">
                        <h1 className="mt-2 bg-clip-text text-white">
                            Historias Compartidas
                        </h1>
                    </div>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Bienvenidos al blog de nuestra empresa, un espacio para compartir los momentos especiales que vivimos como equipo. Aquí encontrarás historias de nuestros eventos, salidas y celebraciones. ¡Gracias por ser parte de esta gran comunidad!
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Link
                            to="/nosotros"
                            className="text-sm font-semibold leading-6 text-cyan-500"
                        >
                            Leer mas <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostText;