import './styles.css';
import { useState, useEffect, createContext } from 'react';
import Form from './Searchbar';
import Galery from './ImageGallery';
import LoadMore from './Button';
import ModalWindow from './Modal';
import { ColorRing } from 'react-loader-spinner';
import { BrowserRouter } from 'react-router-dom';

const context = createContext();
export default context;

const ImageFinder = () => {
  // console.log(context);
  const baseUrl = 'https://pixabay.com/api/';
  const key = '32447292-607f396f27b1a7487e1dc502e';
  const [imageNameInput, setImageNameInput] = useState('');
  const [page, setPage] = useState(1);
  const per_page = 12;
  const [images, setImages] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [status, setStatus] = useState('idle');
  let pageNumber = page;

  const fetchUrl = () => {
    const imageName = imageNameInput.trim();

    const url = `${baseUrl}?q=${imageName}&page=${pageNumber}&key=${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`;
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
    pageNumber = 1;

    if (imageNameInput) {
      setStatus('panding');
      fetchUrl().then(data => {
        const imageArray = data.hits;

        setImages(imageArray);

        if (imageArray.length === 0) {
          alert(` Забражень з назвою ${imageNameInput}не знайдено`);
          setStatus('idle');
          return;
        }
        setPage(2);
        setStatus('resolved');
      });
    }
  }, [imageNameInput]);

  const loadMorePictures = () => {
    const pageNumber = page + 1;
    setPage(pageNumber);
    fetchUrl().then(data => {
      const imageArray = data.hits;

      if (imageArray.length < 12) {
        setStatus('resolvedAllPic');
      }

      setImages([...images, ...imageArray]);
    });
  };

  const getSubmitValue = value => {
    setImageNameInput(value);
  };

  const openModalWindow = url => {
    setLargeImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModalWindow = () => {
    setIsModalOpen(false);
  };

  //render
  if (status === 'idle') {
    return (
      <div className="image-box">
        <Form onSubmit={getSubmitValue} />
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div className="image-box">
        <Form onSubmit={getSubmitValue} />
        <div className="box">
          <BrowserRouter>
            <context.Provider value={{ images, openModalWindow }}>
              <Galery />
            </context.Provider>
          </BrowserRouter>
          <LoadMore morePictures={loadMorePictures} />
        </div>
        {isModalOpen && (
          <ModalWindow
            largeImage={largeImageUrl}
            closeModal={closeModalWindow}
            // keyDown={keyDown}
          />
        )}
      </div>
    );
  }

  if (status === 'resolvedAllPic') {
    return (
      <div className="image-box">
        <Form onSubmit={getSubmitValue} />
        <div>
          <BrowserRouter>
            <context.Provider value={{ images, openModalWindow }}>
              <Galery />
            </context.Provider>
          </BrowserRouter>
        </div>
        {isModalOpen && (
          <ModalWindow
            largeImage={largeImageUrl}
            closeModal={closeModalWindow}
          />
        )}
      </div>
    );
  }
  if (status === 'panding') {
    return (
      <div className="image-box">
        <Form onSubmit={getSubmitValue} />
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
        />
      </div>
    );
  }
};

export const App = () => {
  return <div>{<ImageFinder />}</div>;
};
