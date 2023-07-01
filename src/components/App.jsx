import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState("");

  const searchValueHandler = (event) => {
    setPhotos([]);
    setSearchValue(event);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedPhotos = await fetchPictures(searchValue, page);

        const updatedPhotos = fetchedPhotos.map((photo) => ({
          id: photo.id,
          webformatURL: photo.webformatURL,
          largeImageURL: photo.largeImageURL,
          tags: photo.tags,
        }));

        setPhotos((prevPhotos) => [...prevPhotos, ...updatedPhotos]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchValue && page) {
      fetchData();
    }
  }, [searchValue, page]);

  const handleButtonVisibility = () => {
    return photos.length < 12 ? "none" : "block";
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleModal = (imageAddress) => {
    setModal(imageAddress);
  };

  const modalClose = () => {
    setModal("");
  };

  return (
    <>
      <Searchbar onSubmit={searchValueHandler} />
      <ImageGallery photos={photos} imageAddress={handleModal} />
      {isLoading && <Loader />}
      <div
        className="ButtonContainer"
        style={{ display: handleButtonVisibility() }}
      >
        {!isLoading && <Button onClick={loadMore} />}
      </div>
      {modal !== "" && <Modal imageAddress={modal} onClick={modalClose} />}
    </>
  );
};

export default App;
