import React, {Component} from 'react';
import PurchaseQuestionPage from './PurchaseQuestionPage';
import RefinanceQuestionPage from './RefinanceQuestionPage';

class Questions extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayQuestions: "Purchase",
    };

  }

  changePage = (newQuestions) => {
    if (newQuestions !== this.state.displayQuestions) {
      this.setState({
        displayQuestions: newQuestions,
      });
    }
  }

  render() {
    let questions = null;
    if (this.state.displayQuestions === "Purchase") {
      return (
        <PurchaseQuestionPage onSubmit={this.props.onSubmit} swap={this.changePage}/>
      );
    }
    else {
      return (
        <RefinanceQuestionPage onSubmit={this.props.onSubmit} swap={this.changePage}/>
      );
    }
  }
}

export default Questions;
