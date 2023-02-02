const { Component } = require('react');

const Form = () => {
  // state = {
  //   imageNameInput: '',
  // };

  const [imageNameInput, setImageNameInput] = useState('');

  const inputChange = el => {
    const { value } = el.currentTarget;
    this.setState({ imageNameInput: value });
  };

  const handleSubmit = el => {
    el.preventDefault();

    this.props.onSubmit(this.state.imageNameInput);
  };

  // render() {
  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={this.handleSubmit}>
        <button type="submit" className="searchForm-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.imageName}
          onChange={this.inputChange}
        />
      </form>
    </header>
  );
  // }
};

export default Form;
