import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (event) => {
    const storeName = this.myInput.value.value;
    event.preventDefault();
    this.props.history.push(`/store/${storeName}`);
    console.log(this.myInput)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2> 
        <input 
          type="text"
          ref={this.myInput}
          required
          placeholder="store name"
          defaultValue={getFunName()} /> 
        <button type="submit">visit store -> </button>
      </form>
    )     
  }   
}

export default StorePicker;