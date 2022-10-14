import { useState, useEffect } from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import css from './App.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import searchPhotos from "services/API";

export function App () {
  const [photoName, setPhotoName] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleFormSubmit = photoName =>{
    setPhotoName(photoName);
    setPage(1);
    setPhotos([])
  };

  const onLoadMore = () =>{    
    setPage(page + 1);
    setVisible(false);
  };

  const onImgClick = (largeImageURL, alt) => {    
    setLargeImageURL(largeImageURL);
    setAlt(alt);
    togleModal()
  };

  const togleModal = () => {    
    setShowModal(!showModal)
  };

  useEffect(() => {

    if(!photoName){
      return;
    }

      setIsLoading(true);    
      
      searchPhotos(photoName, page)
      .then (data => {       
      const photos = data.hits.map(({id, tags, webformatURL, largeImageURL}) => ({
      id, tags, webformatURL, largeImageURL
    })
    );
    
    photos.length > 0
              ? toast.success('Done')
              : toast.warning(' Not Found ');
    
    photos.length > 11
              ? setVisible(true)
              : setVisible(false);
                  
    setPhotos(findedPhotos => [...findedPhotos, ...photos]);
    setIsLoading(false);
})

     .catch(error => toast.error('error.message 404'));    
     },[photoName, page])  
    
  return (
    
    <div className={css.App}>     
      <Searchbar onSubmit={handleFormSubmit}/>
      <ImageGallery photos={photos} onClick={onImgClick}/>
      {showModal && (
          <Modal onClose={togleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}
      {isLoading && <Loader/> }
      {visible && <Button onClick={onLoadMore} />}
      
      <ToastContainer />

      </div>
      
  );
  }
