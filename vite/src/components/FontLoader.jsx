// components/FontLoader.jsx
import { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import PropTypes from 'prop-types';

const FontLoader = ({ fontFamily, onFontLoaded }) => {
    useEffect(() => {
        const font = new FontFaceObserver(fontFamily);

        font.load().then(() => {
            console.log(`${fontFamily} loaded successfully.`);
            onFontLoaded(); // Call the callback when the font is loaded
        }).catch((error) => {
            console.error(`Font loading failed: ${error}`);
        });

        // Clean up if needed
        return () => {
            // Perform any cleanup if necessary
        };
    }, [fontFamily, onFontLoaded]);

    return null; // No UI needed for this component
};

// Prop validation
FontLoader.propTypes = {
    fontFamily: PropTypes.string.isRequired, // Expect fontFamily to be a required string
    onFontLoaded: PropTypes.func.isRequired,  // Expect onFontLoaded to be a required function
};

export default FontLoader;
