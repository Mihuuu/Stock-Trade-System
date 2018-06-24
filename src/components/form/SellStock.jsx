import React from 'react';
import { Form, Icon, Input, Button,message, Modal } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TransactionForm extends React.Component {
  constructor(){

    super()
    this.state={
      visible:false,
      "price":"",
    }

  }
	componentDidMount() {
			// To disabled submit button at the beginning.
			this.props.form.validateFields();
		}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);

        /*预备数据*/
        let account_id=localStorage.getItem('account_id')
        let stock_code=values.stockCode
        let sell_price=values.sellPrice
        let sell_number=values.sellNumber
        //console.log(username)
        console.log(stock_code)
        console.log(sell_price)
        console.log(sell_number)

        /*将用户名+股票代码+卖出价格+卖出数量发送给中央交易系统,如果购买成功,则返回1,否则失败(不知道到底传给我什么)*/
        //fetch('http://127.0.0.1:8080/central/name_code_price_amount_sell.json')
        let central_url='http://10.189.143.181:5000/sell'
        fetch(central_url, {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
             account_id:account_id,
             stock_id:stock_code,
             number:Number(sell_number),
             price:Number(sell_price),
           })
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res);
          if(res['succeed']){
            /*操作成功*/
            message.success('卖出成功')
            setTimeout(()=>{
              window.location.reload()
            },1000)

          }
          else{
            message.error("卖出失败");
            console.log(res['msg'])
          }
        })
			}
		});
	}

  validateStockCode(rule,value,callback){
    /*股票代码只包含数字和英文字母*/
    if(value&&/[^0-9a-zA-Z]/g.test(value)){
      callback('请输入只包含数字和英文字母的股票代码')
    }else{
      callback()
    }
  }
  validatePrice(rule,value,callback){
    /*价格只包含数字和点*/
    if(value&&/[^0-9\.]/g.test(value)){
      callback('请输入只包含数字和点的卖出价格')
    }else{
      callback()
    }
  }
  validateAmount(rule,value,callback){
    /*数量只包含数字*/
    if(value&&/[^0-9]/g.test(value)){
      callback('请输入只包含数字的卖出数量')
    }else{
      callback()
    }
  }

    state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
	render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
		const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
      <Form layout="horizontal" id="sell_stock_form" style={{marginLeft:50, width:300}} onSubmit={this.handleSubmit}>
        <FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="股票代码"
        >
          {getFieldDecorator('stockCode', {
            rules: [{ required: true, message: '请输入股票代码!' },
          {validator:this.validateStockCode}],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="code" />
          )}
        </FormItem>
        <FormItem
					validateStatus={passwordError ? 'error' : ''}
					label="卖出价格"
        >
          {getFieldDecorator('sellPrice', {
            rules: [{ required: true, message: '请输入卖出价格!' },
          {validator:this.validatePrice}],
          })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder={"price"+this.state.price }/>
          )}
        </FormItem>
				<FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="卖出数量"
        >
          {getFieldDecorator('sellNumber', {
            rules: [{ required: true, message: '请输入卖出数量!' },
          {validator:this.validateAmount}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="number" />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="button"
            onClick={this.showModal}
            disabled={hasErrors(getFieldsError())}
          >
            卖出
          </Button>
        </FormItem>
          <FormItem>

          </FormItem>
      </Form>
              <Modal
          title="确认"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <p>当前推荐的价格是xxx,请问是否继续当前操作</p>

          <FormItem>

          <Button
            style={{float:'right'}}
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
          继续
          </Button>
            <Button
            style={{float:'right',marginRight:20}}
            type="primary"
            htmlType="button"
            onClick={this.handleCancel}
          >
          返回
          </Button>

          </FormItem>
          </Form>
        </Modal>
        </div>
    );
  }
}

const SellStock = Form.create()(TransactionForm);

export default SellStock;
