import { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    openModal: false,
    largeImage: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) this.getImages();
  }

  async getImages() {
    try {
      this.setState({ loading: true });
      const { query, page } = this.state;
      const { hits } = await fetchImages(query, page);
      const countHits = hits.length;

      if (countHits === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ query }) => {
    this.setState({ query, items: [], page: 1 });
  };

  showImage = ({ largeImageURL, tags }) => {
    this.setState({
      largeImage: { largeImageURL, tags },
      openModal: true,
    });
    console.log(largeImageURL);
  };

  closeModal = () => {
    this.setState({
      openModal: false,
      largeImage: null,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { searchImages, showImage, closeModal, loadMore } = this;
    const { items, error, loading, openModal, largeImage } = this.state;

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
        {loading && <BarLoader color= '#006c84' className={css.loader} />}
        {!(items.length < 12) && (
          <Button onClick={loadMore} text={'Load more'} />
        )}
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
}