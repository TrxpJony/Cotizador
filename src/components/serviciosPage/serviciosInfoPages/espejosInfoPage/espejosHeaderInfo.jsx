import EspejosCarruselPage from "./epejoscarruselPage";

const EspejosHeaderInfo = () => {
    return (
        <>
            <div className='text-center'>
                <p className='text-base/7 font-semibold text-cyan-500'>Acervid</p>
                <div className='tracking-tight'>
                    <h1 className="mt-2 text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins text-white px-6">Descubre Nuestros Espejos</h1>
                </div>
                <p className=' text-lg sm:text-lg leading-8 text-default-400'>
                    Diseños elegantes y personalizados que iluminan tus espacios y reflejan tu esencia.
                </p>
                <EspejosCarruselPage />
            </div>

        </>
    );
};
export default EspejosHeaderInfo;