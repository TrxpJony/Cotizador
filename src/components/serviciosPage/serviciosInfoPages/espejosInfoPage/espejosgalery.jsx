import { Card, CardHeader, CardFooter, Image } from "@heroui/react";

const EspejosGalery = () => {
    return (
        <>

            <div className="mb-10">
                <div>
                    <p className="font-semibold text-cyan-500 px-6">Acervid</p>
                    <h2 className="text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins text-white px-6">Nuestros Proyectos</h2>
                </div>

                <div className="w-full flex">
                    <p className="  max-w-5xl leading-[30px]  px-6 flex flex-col gap-4 pt-3 text-base text-default-400">
                        En ACERVID, llevamos la innovación a cada detalle de nuestros proyectos.
                        Diseñamos espejos únicos con iluminación LED integrada, estructuras flotantes
                        con elegantes perfiles de aluminio y una variedad de sensores inteligentes,
                        como sensores touch, de proximidad y movimiento, para brindar una experiencia moderna
                        y funcional. Cada proyecto refleja nuestro compromiso con la calidad, el diseño
                        y la tecnología.
                    </p>
                </div>
            </div>
            <div className="max-w-5xl px-6 gap-2 grid grid-cols-12 grid-rows-2 mt-10 mb-10">
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Diseños</p>
                        <h4 className="text-white font-medium text-large">Diseñados a tu gusto</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745872377/carrusel/zwik7ywxa5j8rahuuxzx.jpg"
                    />
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Sensores</p>
                        <h4 className="text-white font-medium text-large">Sensores tecnologicos</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745871950/carrusel/hns1twb2obbxltzeymti.png"
                    />
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Marcos</p>
                        <h4 className="text-white font-medium text-large">Hermosos espejos con marco</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745870906/carrusel/onpyfjk7lottvtu4zzca.jpg"
                    />
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Luz</p>
                        <h4 className="text-black font-medium text-2xl">Luces led </h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745874701/carrusel/yb1fxnzvh6uape8jbvkr.png"
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <p className="text-black text-tiny">Lleva la mejor iluminación a tu hogar.</p>
                            <p className="text-black text-tiny">Dale a tu espacio el brillo que merece.</p>
                        </div>
                        <button className="text-cyan-500 px-3 py-1 rounded-2xl border border-cyan-500 hover:bg-cyan-500 hover:outline-none hover:text-white transition-all">
                            Catalogo de luces
                        </button>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">ACERVID</p>
                        <h4 className="text-white/90 font-medium text-xl">Elige el espejo perfecto para tu espacio</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://res.cloudinary.com/dtxmsbsjd/image/upload/v1745873236/carrusel/lnkjwhnyu7g3dftwcyxi.jpg"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">

                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Espejos de alta calidad</p>
                                <p className="text-tiny text-white/60">No te quedes sin el tuyo.</p>
                            </div>
                        </div>
                        <a href="https://api.whatsapp.com/send?phone=573223065256" target='_black' rel='noopener noreferrer'>
                            <button className="text-white px-3 py-1 rounded-2xl border border-white hover:bg-white hover:outline-none hover:text-black transition-all">
                                Cotiza el tuyo
                            </button>
                        </a>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default EspejosGalery;