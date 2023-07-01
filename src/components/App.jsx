import { Component } from "react";
import { fetchPictures } from "./services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState("");

  async componentDidUpdate(prevState, prevProps) {
    if (
      this.state.searchValue !== prevProps.searchValue ||
      this.state.page !== prevProps.page
    ) {
      try {
        this.setState({ isLoading: true });

        const photos = await fetchPictures(
          this.state.searchValue,
          this.state.page
        );

        photos.map((photo) => {
          return this.setState((prevState) => ({
            photos: [
              ...prevState.photos,
              {
                id: photo.id,
                webformatURL: photo.webformatURL,
                largeImageURL: photo.largeImageURL,
                tags: photo.tags,
              },
            ],
          }));
        });
      } catch (error) {
        this.setState({ error });
        console.log(this.state.error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchValue = (event) => this.setState({ photos: [], searchValue: event });

  showPhotos = () => {
    const { photos } = this.state;
    return photos;
  };

  handleButtonVisibility = () => {
    if (this.state.photos.length < 12) return "none";
  };

  loadMore = (event) => {
    if (event) {
      this.setState({ page: this.state.page + 1 });

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    }
  };

  handleModal = (imageAddress) => this.setState({ modal: imageAddress });

  modalClose = (event) => this.setState({ modal: event });

  passImgToModal = () => this.state.modal;

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchValue} />
        <ImageGallery
          photos={this.showPhotos()}
          imageAddress={this.handleModal}
        />
        {this.state.isLoading && <Loader />}
        <div
          className="ButtonContainer"
          style={{ display: this.handleButtonVisibility() }}
        >
          {!this.state.isLoading && <Button onClick={this.loadMore} />}
        </div>
        {this.state.modal !== "" && (
          <Modal
            imageAddress={this.passImgToModal()}
            onClick={this.modalClose}
          />
        )}
      </>
    );
  }
}
