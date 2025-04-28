import EspejosDescription from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosDescription";
import EspejosGalery from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosgalery";
import EspejosHeaderInfo from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/espejosHeaderInfo";
import EspejosFaqs from "../../components/serviciosPage/serviciosInfoPages/espejosInfoPage/FAQ";

const EspejosInfoPage = () => {
    return (
        <>
            <div className="bg-gradient-to-b from-gray-800 to-black shadow-lg">
                <div className=" sm:h-auto flex flex-col mt-20 sm:mt-32 sm:justify-center sm:mb-20">
                    <EspejosHeaderInfo />
                </div>
                <div className="flex justify-center items-center flex-col sm:mb-20">
                    <EspejosDescription />
                </div>
                <div className="flex justify-center items-center flex-col sm:mb-20">
                    <EspejosGalery />
                </div>
                <div className="flex justify-center items-center flex-col mt-5 mb-20">
                    <EspejosFaqs />
                </div>
            </div>
        </>
    );
};
export default EspejosInfoPage;