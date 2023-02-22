import PropTypes from 'prop-types';

const ModalImage = ({ largeImageURL, tags }) => (
    <img src={largeImageURL} alt={tags} />
);

ModalImage.propTypes = {
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
};

export default ModalImage;
