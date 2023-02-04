import { useState, useEffect } from 'react';

const ModalWindow = ({ closeModal, largeImage }) => {
  //  componentDidMount() {
  //   window.addEventListener('keydown', this.hendleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.hendleKeyDown);
  // }
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
    return () => window.removeEventListener('keydown', hendleKeyDown);
  }, []);

  const hendleKeyDown = ev => {
    if (ev.code === 'Escape') {
      closeModal();
    }
  };

  // render() {
  // const { closeModal, largeImage } = this.props;
  return (
    <div className="overlay" onClick={() => closeModal()}>
      <div className="modal">
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
  // }
};

export default ModalWindow;
