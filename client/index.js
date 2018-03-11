import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message, Card, List, Layout, Select, Menu, Breadcrumb, Icon, Input, Checkbox } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
var _ = require('lodash');


var data = [
  {
    title: 'User 1',
    details: {},
  },
  {
    title: 'User 2',
    details: {},
  },
  {
    title: 'User 3',
    details: {},
  },
  {
    title: 'User 4',
    details: {},
  },
  {
    title: 'User 5',
    details: {},
  },
  {
    title: 'User 6',
    details: {},
  },
  {
    title: 'User 7',
    details: {},
  },
  {
    title: 'User 8',
    details: {},

  },
  {
    title: 'User 9',
    details: {},
  },
  {
    title: 'User 10',
    details: {},
  },
];


// append to this when the cox is checked and removed when unchecked
let myFilters = [];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetched: false , filters: [] }
  }

  onChange(e) {
  	console.log(`checked = ${e.target.checked}`);
  }

  state: {
    fetched: Boolean,
    filters: Array,
  }

  componentDidMount() {
  	fetch('http://localhost:3000/users')
  	.then(results => {
  		return results.json();
  	})
  	.then(backEndData => {
  		console.log(backEndData);
      var i;
      for(i = 0; i < 10 ; i++){
        data[i].details = backEndData[i];
      }
      this.setState({fetched: true});
  	})
  }

  filterHandler = (e: Object) => {
    console.log('CHECKBOX:', e.target.name);
    if (myFilters.includes(e.target.name)) {
      let new_filters = myFilters.splice(myFilters.indexOf(e.target.name), 1);
      data = _.sortBy(data, function(item) {
        return [item.details[myFilters[0]], item.details[myFilters[1]], item.details[myFilters[2]], item.details[myFilters[3]], item.details[myFilters[4]]] 
      })
      this.setState({filters:new_filters});
    } else {
      let new_filters = myFilters.push(e.target.name);
      data = _.sortBy(data, function(item) {
        return [item.details[myFilters[0]], item.details[myFilters[1]], item.details[myFilters[2]], item.details[myFilters[3]], item.details[myFilters[4]]]
      })
      this.setState({filters:new_filters});
    }

  }

  filterTags = (item) => {
    var filtertags = [];
    myFilters.map((report)=>{filtertags.push(<p>{_.startCase(_.camelCase(report))}: {_.get(item.details,report,0)}</p>)});
    return filtertags
  }

  render() {
    let keys = Object.keys(data[0].details);
    let checkListItems = keys.map((key) => 
      <Menu.Item> <Checkbox onChange ={this.filterHandler} name= {key}><span> {key}</span></Checkbox> </Menu.Item>
    );

  	return (
  		<Layout style={{ minHeight: '100rvh' }}>
  		<Sider style={{ background: '#fff' }}>
  		<Input placeholder="Genome Criteria" style={{ margin: '10px 17px', width: '170px', padding:  10}} mode="inline" />
  		<div className="logo" />
  		<Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item>
      <span><Icon type="user" /><span>Users</span></span>
      </Menu.Item>
      <SubMenu
      key="sub1"
      title={<span><Icon type="eye-o" /><span>Filters</span></span>}
      >
      {checkListItems}
      </SubMenu>
  		</Menu>
  		</Sider>
  		<Layout>
  		<Header style={{ background: '#fff', padding: 0 }} />
  		<Content style={{ margin: '16px 16px' }}>
  		<List
  		grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
  		dataSource={data}
  		renderItem={ (item) => (
  			<List.Item>
  			<Card title={item.details.name}>
          <p>Height: {item.details.height}</p>
          <p>Weight: {item.details.weight}</p>
          <p>Red Hair: {item.details["red-hair"]}</p>
          <p>Black Hair: {item.details["black-hair"]}</p>
          <p>Longevity: {item.details.longevity}</p> 
          {this.filterTags(item)}
        </Card>
  			</List.Item>
  			)}
  		/>
  		</Content>
  		<Footer style={{ textAlign: 'center' }}>
  		Ant Design ©2016 Created by Ant UED
  		</Footer>
  		</Layout>
  		</Layout>
  	);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
