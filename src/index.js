import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Questions from './Questions';
import ProdDisplay from './display/ProdDisplay';
import surgeLogo from './SurgeLogo.png';

class Page extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: true,
      products: [],
    };
  }

  handleSubmit = (productsFromChild) => {
    this.setState({
      questions: false,
      products: productsFromChild,
    });
  }

  render() {
    if (this.state.questions) {
      return (
        <div className='App'>
          <div className='App-header'>
            <div className="logo">
               <img src={surgeLogo} alt="Surge Solutions Logo" />
            </div>
            <div className="Sub-header">Product Recommendation</div>
          </div>
          <Questions onSubmit={this.handleSubmit}/>
        </div>
      );
    }
    else {
      return (
        <div className='App'>
          <div className='App-header'>
            <div className="logo">
               <img src={surgeLogo} alt="Surge Solutions Logo" />
            </div>
            <div className="Sub-header">Product Recommendation</div>
          </div>
          <ProdDisplay products={this.state.products}/>
        </div>
      );
    }
  };
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
