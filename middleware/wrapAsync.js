// Function to wrap async functions and catch errors
const wrapAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next); // Pass any errors to the next middleware
    };
};

export default wrapAsync; // Export the wrapAsync function
