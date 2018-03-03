import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const {image, name, price, desc, status} = this.props.details;
    const isAvailable = status === 'available';

    const handleClick = () => {
      this.props.addToOrder(this.props.index)
    }

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p className="desc">{desc}</p>
        <button 
          onClick= {handleClick}
          disabled={!isAvailable}>{isAvailable ? 'Add To Order' : 'Sold Out'}</button>
      </li>
    )
  }
}

export default Fish;