import { useContext } from 'react';
import context from './App';

const GalleryItem = () => {
  const { images } = useContext(context);
  const { openModalWindow } = useContext(context);

  return images.map(({ webformatURL, id, tags, largeImageURL }) => {
    return (
      <li className="imageGalleryItem" key={id}>
        <img
          className="imageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={() => openModalWindow(largeImageURL)}
        />
      </li>
    );
  });
};

export default GalleryItem;
