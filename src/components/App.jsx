import { useState, useEffect } from 'react';
import { fetchImages } from "services/pixabay-api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarLoader from 'react-spinners/BarLoader';
import css from './app.module.scss';
import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem";
import Message from "./Message";
import Button from './Button';
import Modal from "./Modal";
import ModalImage from "./ModalImage";

export function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function getImages() {
      try {
        setLoading(true);
        const { hits } = await fetchImages(query, page);

        if (hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        setItems(prevItems => ([...prevItems, ...hits,]));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [query, page, setItems, setError, setLoading]);


  const searchImages = ({query}) => {
    setQuery(query);
    setItems([]);
    setPage(1);
  };

  const showImage = (data) => {
    setLargeImage(data);
    setOpenModal(true);
  };

  const closeModal = () => {
    setLargeImage(null);
    setOpenModal(false);
  };

  const loadMore = () => {
    setPage(prevPage =>  prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={searchImages} />
      {items.length > 0 ? (
        <ImageGallery>
          <ImageGalleryItem data={items} showImage={showImage} />
        </ImageGallery>
      ) : (
        <Message text={"Let's find wonderful images"} smile={'✨'} />
      )}
      {loading && <BarLoader color="#006c84" className={css.loader} />}
      {!(items.length < 12) && <Button onClick={loadMore} text={'Load more'} />}
      {openModal && (
        <Modal close={closeModal}>
          <ModalImage {...largeImage} />
        </Modal>
      )}
      {error && <Message text={error} smile={'❗'} />}
      <ToastContainer
        autoClose="3000"
        theme="colored"
        position="bottom-right"
      />
    </div>
  );
}