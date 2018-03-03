import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import EditFishForm from './EditFishForm';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      console.log(JSON.parse(localStorageRef))
      console.log(localStorageRef)
      this.setState({order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  } 

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    console.log(this.state.order)
  }

  addFish = fish => {
    // 1. take a copy of the exsiting state
    const fishes = {...this.state.fishes};
    // 2. add a new fish to the fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. set a new fishes object to the state
    this.setState({
      fishes
    })  
  }

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3.  update state
    this.setState({ fishes });
  };

  loadSamplFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  removeFromOder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. Romove item from oder
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => 
              <Fish
                index={key} 
                key={key} 
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order 
          fishes={this.state.fishes}
          removeFromOder={this.removeFromOder}
          order={this.state.order} /> 
        <Inventory 
          updateFish={this.updateFish}
          addFish={this.addFish} 
          deleteFish={this.deleteFish}
          loadSamplFishes={this.loadSamplFishes}
          fishes={this.state.fishes} />  
      </div> 
    )
  }
}

export default App;