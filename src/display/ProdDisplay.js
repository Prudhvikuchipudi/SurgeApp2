import React, { Component } from 'react';
import bank from './bank.jpg';
import './ProductDisplay.css';

function MainProduct(props) {
  return (
    <div className="mainproduct">
      <div className="title">
        Recommended Product
      </div>
      <Product prod={props.prod} main={true} />
    </div>
  );
}

function AlternativeProducts(props){
  return (
    <div className="alternative">
      <div className="title">
        Alternative Products
      </div>
      <Product prod={props.prod[0]} main={false} />
      <Product prod={props.prod[1]} main={false} />
    </div>
  );
}

function MonthlyPayment(term, rate, amount) {
  var numPayments = term * 12;
  var interest = rate / 12;
  var discountFactor = ((1+interest)**numPayments - 1) / (interest*(1+interest)**numPayments);
  return amount / discountFactor;
}

function APR(term, rate, amount) {
  var monthly = MonthlyPayment(term, rate, amount);
  return ((monthly*16*term - amount) / amount) / term;
}

function Product(props) {
  return (
    <div className="product">
      <div>
        <div className="rightcol">
          <img src={bank} alt="bank"/>
        </div>
      <LeftColumn prod={props.prod} />
      </div>
      <Footer prod={props.prod} main={props.main} />
    </div>
  );
}

function LeftColumn(props) {
  if (props.prod == null) {
    return (
      <div className="leftcol">
        <h1>Not Eligible for Additional Products</h1>
      </div>
    );
  }
  let prod = Object.entries(props.prod)[0];
  return (
    <div className="leftcol">
      <h1>{prod[0]}</h1>
      <table>
        <tbody>
          <tr>
            <td>Interest Rate</td>
            <td className="tright">{(prod[1].rate*100).toFixed(4)} %</td>
          </tr>
          <tr>
            <td>APR</td>
            <td className="tright">{(APR(prod[1].term, prod[1].rate, prod[1].amount)*100).toFixed(4)} %</td>
          </tr>
          <tr>
            <td>Monthly Payment</td>
            <td className="tright">$ {MonthlyPayment(prod[1].term, prod[1].rate, prod[1].amount-prod[1].downPayment).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Footer(props) {
  if (props.main && props.prod != null) {
    let prod = Object.entries(props.prod)[0];
    return (
      <footer>
        Rates are based on a ${prod[1].amount} home loan with {(prod[1].downPayment / prod[1].amount * 100).toFixed(4)}% down.
      </footer>
    );
  }
  else {
    return null;
  }
}

class ProdDisplay extends Component {
  render () {
    let mainProduct = null;
    let alt1 = null;
    let alt2 = null;

    if (this.props.products.length >= 1){
      mainProduct = this.props.products[0];
    }
    if (this.props.products.length >= 2) {
      alt1 = this.props.products[1];
    }
    if (this.props.products.length >= 3) {
      alt2 = this.props.products[2];
    }

    return (
      <div className="productrec">
        <div className="top">
          <MainProduct prod={mainProduct} />
        </div>
        <div>
          <AlternativeProducts prod={[alt1, alt2]} />
        </div>
      </div>
    )
  }
}


// {Object.keys(ProductData).map((key)=>{
//   return <div>
//     <h1>{key}</h1>
//   </div>
// })}

export default ProdDisplay
