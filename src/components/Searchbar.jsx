import { useState, useEffect } from 'react';

// const { Component } = require('react');

const Form = ({ onSubmit }) => {
  // state = {
  //   imageNameInput: '',
  // };

  const [imageNameInput, setImageNameInput] = useState('');

  const inputChange = el => {
    const { value } = el.currentTarget;
    // this.setState({ imageNameInput: value });
    setImageNameInput(value);
    // console.log(value);
  };

  const handleSubmit = el => {
    el.preventDefault();

    onSubmit(imageNameInput);
  };

  // render() {
  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={handleSubmit}>
        <button type="submit" className="searchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          // value={imageName}
          onChange={inputChange}
        />
      </form>
    </header>
  );
  // }
};

export default Form;
