import React from 'react'
import {Input, List, Avatar } from 'antd';
import myLogo from '../imgs/money.png'
const Search = Input.Search;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
class SearchStock extends React.Component{
  constructor(){
    super()
    this.state={
      data:[],
    }
  }

  handleSearch(value){

    let publish_url='http://192.144.171.192:3000'
    let code=value
    let get_url1=publish_url+'/api/stockprice?code='+code+"&mode="+'single'
    let price;

    let get_url=publish_url+'/api/stockinfo?line='+code
    console.log(get_url)
    fetch(get_url)
    .then(res=>res.json())
    .then(res=>{
      let i=0;
      for(i=0;i<res['list'].length;++i)
      {
        let data=this.state.data;

        let one_data={}
        one_data['title']=res['list'][i]['name']+'('+res['list'][i]['code']+')'
        data.push(one_data)
        this.setState({
          data:data
        })
      }
      console.log('123',res)
    })
  }
  handleClick(value){
    console.log(value)
  }
  render(){
    return(
      <div>
					<Search
						placeholder="输入股票名字或代码"
						onSearch={this.handleSearch.bind(this)}
						enterButton
						style={{ width: 250 }}
					/>
          <List
            itemLayout="horizontal"
            dataSource={this.state.data}
            pagination={{
              onChange:(page)=>{
                console.log(page)
              },
              pageSize:10,
            }}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar style={{height:48,width:48}} src={myLogo} />}
                  title={<a href="javascript:;" onClick={this.handleClick.bind(this,item.title)}>{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                </List.Item>
            )}
          />
      </div>
    )
  }
}

export default SearchStock;
