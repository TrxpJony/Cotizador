import Testimonials from "../components/testimonialsPage/testimonials";
import TestimonialsText from "../components/testimonialsPage/testimonialstext";
import { motion } from 'framer-motion';

const TestimonialsPage = () => {
    return (
        <>
            <motion.div
                className="bg-gradient-to-r  py-24 sm:py-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >

                <TestimonialsText />
                <div className=" border-t border-gray-600 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <Testimonials />
                </div>
            </motion.div>
        </>
    );
};
export default TestimonialsPage;
