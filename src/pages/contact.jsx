import InfoContact from "../components/contact/info";
import FormContact from "../components/contact/form";

const ContactPage = () => {
    return (
        <>
            <div className=" grid grid-cols-1 lg:grid-cols-2">
                <InfoContact />
                <FormContact />
            </div>
        </>
    );
};
export default ContactPage;