import css from './gallery.module.scss';

const ImageGallery = ({ children }) => (
    <ul className={css.gallery}>
        {children}
    </ul>
)

export default ImageGallery;