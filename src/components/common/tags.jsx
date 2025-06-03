

import PropTypes from "prop-types";

export const Container = ({ children, className = "" }) => {
    return (
        <div className={`mx-auto max-w-7xl w-full sm:px-8 md:px-14 lg:px-5 ${className}`}>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
