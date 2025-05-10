import DivisionesDescription from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesDescription";
import DivisionesFaq from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesFaq";
import DivisionesGalery from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesGalery";
import DivisionesHeader from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesHeroSection";


const DivisionesInfoPage = () => {
    return (
        <>
            <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-96">
                <DivisionesHeader />
                <DivisionesDescription />
                <div className="flex flex-col md:flex-row">
                    <DivisionesGalery />
                </div>
                <DivisionesFaq />
            </div>

        </>
    );
};

export default DivisionesInfoPage;