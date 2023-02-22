import css from './item.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ data, showImage }) => {
    return data.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li onClick={()=>showImage({largeImageURL, tags})} className={css.item} key={id}>
            <img src={webformatURL} alt={tags} className={css.image}/>
        </li>
    ))
};

ImageGalleryItem.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    showImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;