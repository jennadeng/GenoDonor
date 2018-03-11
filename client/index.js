import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message, Card, List, Layout, Select, Menu, Breadcrumb, Icon, Input, Checkbox } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
  {
    title: 'Title 7',
  },
  {
    title: 'Title 8',
  },
  {
    title: 'Title 9',
  },
  {
    title: 'Title 10',
  },
];



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  onChange(e) {
  	console.log(`checked = ${e.target.checked}`);
  }
  componentDidMount() {
  	fetch('http://localhost:3000/users/GENOMELINKTEST001')
  	.then(results => {
  		return results.json();
  	})
  	.then(data => {
  		console.log(data);
  	})
  }
  render() {
  	return (
  		<Layout style={{ minHeight: '100rvh' }}>
  		<Sider style={{ background: '#fff' }}>
  		<Input placeholder="Genome Criteria" style={{ margin: '10px 17px', width: '180px', padding:  10}} mode="inline" />
  		<div className="logo" />
  		<Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
  		<Menu.Item key="1">
  		<Icon type="pie-chart" />
  		<span>Option 1</span>
  		</Menu.Item>
  		<Menu.Item key="2">
  		<Checkbox><span>Checkbox</span></Checkbox>
  		</Menu.Item>
  		<SubMenu
  		key="sub1"
  		title={<span><Icon type="user" /><span>User</span></span>}
  		>
  		<Menu.Item key="3">Tom</Menu.Item>
  		<Menu.Item key="4">Bill</Menu.Item>
  		<Menu.Item key="5">Alex</Menu.Item>
  		</SubMenu>
  		<SubMenu
  		key="sub2"
  		title={<span><Icon type="team" /><span>Team</span></span>}
  		>
  		<Menu.Item key="6">Team 1</Menu.Item>
  		<Menu.Item key="8">Team 2</Menu.Item>
  		</SubMenu>
  		<Menu.Item key="9">
  		<Icon type="file" />
  		<span>File</span>
  		</Menu.Item>
  		</Menu>
  		</Sider>
  		<Layout>
  		<Header style={{ background: '#fff', padding: 0 }} />
  		<Content style={{ margin: '16px 16px' }}>
  		<List
  		grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
  		dataSource={data}
  		renderItem={item => (
  			<List.Item>
  			<Card title={item.title}>Card content</Card>
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
