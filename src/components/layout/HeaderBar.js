import React, { Component } from 'react';
import { Avatar, Popover, Menu, Layout, Icon, Badge } from 'antd';
import history from './history'
import './App.less'
import my_avatar from '../imgs/zju_avatar.jpg'
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

const text = <span>新消息</span>;
const content = (
  <div>
    <p>Message 1</p>
    <p>Message 2</p>
  </div>
);

class HeaderBar extends Component {
  logout(){
    localStorage.removeItem("userinfo");
    sessionStorage.removeItem("userinfo");
    history.push('/start');
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }} class="mainHeader">
        <Menu mode="horizontal" class="mainHeaderMenu"
          style={{float: 'right', marginRight: '20px'}}
        >
          <Menu.Item style={{ marginRight:'20px' }}>
            <Popover placement="leftTop" title={text} content={this.props.message} trigger="click">
              <Badge  count={this.props.count} overflowCount={99} style={{height:'15px',lineHeight:'15px'}}>
                <Icon type="mail" style={{fontSize:18, color: '#1890ff'}}/>
              </Badge>
            </Popover>
          </Menu.Item>
          <SubMenu
            title={<span>
              <Avatar src={my_avatar} style={{width:'26px', height:'26px', marginRight:'8px'}}/>
               {this.props.username}
            </span>}
            >
            <Menu.Item key="profile" style={{textAlign:'center'}}>
              <span>profile</span>
            </Menu.Item>
            <Menu.Item key="logout" style={{textAlign:'center'}}>
              <span onClick={this.logout}>logout</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

export default HeaderBar;
