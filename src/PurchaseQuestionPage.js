import React, { Component } from 'react'
import { Anchor, Layout, Form, Input, Button, Radio } from 'antd'
import 'antd/dist/antd.css'
import productRecommendation from './productRecommendation'
import { questionPurchase } from './questionPurchase'
import './App.css'


const { Link } = Anchor
const { Header, Footer, Content, Sider } = Layout
const currentLocation = "Purchase";
const formItemLayout = {
  labelCol: {
    xs: { span: 16 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

class PurchaseQuestionPage extends Component {

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
      }
      //alert(JSON.stringify(values));
      var temp = new productRecommendation;
      // alert(JSON.stringify(temp.getProducts(values)));//displays list of suggested products
      this.props.onSubmit(temp.getProducts(values));
    });

  }

  handleChange = e => {
    var newQuestions = e['content']
    // var newSwapFrom = new swapForm;
    // newSwapFrom.swapToDesired(values,currentLocation, this.props.onSubmit);
    this.props.swap(newQuestions);
  }

  anchorList = () => {

    return questionPurchase.map(v => {
      const { name } = v
      return <Link key={name} href={`#${name}`} title={name} />
    })
  }

  contentList = () => {

    return questionPurchase.map((v, i) => {//add a input of what type of question
      return this.questionType(v)
    })
  }

  questionType = question => {
    const { getFieldDecorator } = this.props.form

    const { name, title,id, placeholder, content, type } = question


    let render

    switch (type) {
      case 'input':
        render = <Input />
        break
      case 'select':
        if(name == "1"){
          render = <div>{this.typeSelect1(content)}</div>
        }
        else{
          render = <div>{this.typeSelect(content)}</div>
        }


        break
      default:
        render = <Input />
    }

    return (
      <Form.Item {...formItemLayout} label={name} key={name}>
        <p>{title}</p>
        {getFieldDecorator(id, {
          rules: [
            {
              required: true,
              message: placeholder
            }
          ]
        })(render)}
      </Form.Item>
    )
  }
  typeSelect1 = content => {
    return content.map((value, index) => {
      const { content } = value
      return (
        <Radio key={index} value={content} name={"index"} onClick={() =>{this.handleChange( value)}} >
          {content}
        </Radio>
      )
    })
  }

  typeSelect = content => {
    return content.map((value, index) => {
      const { content } = value
      return (
        <Radio key={index} value={content}>
          {content}
        </Radio>
      )
    })
  }

  render () {

    return (
      <Layout className='content'>
        <Sider>
          <Anchor>{this.anchorList()}</Anchor>
        </Sider>
        <Layout>
          <Content>
            <Form onSubmit={this.handleSubmit}>
              {this.contentList()}
              <Form.Item {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit' >
                  submit
                </Button>
              </Form.Item>
            </Form>
          </Content>
          {/* <Footer>Power By Sam</Footer> */}
        </Layout>
      </Layout>
    )
  }
}

export default Form.create()(PurchaseQuestionPage)
