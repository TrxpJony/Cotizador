import DivisionesDescription from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesDescription";
import DivisionesFaq from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesFaq";
import DivisionesGalery from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesGalery";
import DivisionesHeader from "../../components/serviciosPage/serviciosInfoPages/divisionesInfoPage/divisionesHeroSection";


const DivisionesInfoPage = () => {
    return (
        <>
            <div className="sm:px-96">
                <DivisionesHeader />
                <DivisionesDescription />
                <div className="flex">
                    <DivisionesGalery />
                </div>
                <DivisionesFaq />
            </div>

        </>
    );
};

export default DivisionesInfoPage;