import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message, Card, List, Layout, Select, Menu, Breadcrumb, Icon, Input, Checkbox, Modal, Button } from 'antd';
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
    this.state = { fetched: false , filters: [], visible: false }
  }

  onChange(e) {
  	console.log(`checked = ${e.target.checked}`);
  }

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

  state: {
    fetched: Boolean,
    filters: Array,
    visible: Boolean,
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

  render() {

    let keys = Object.keys(data[0].details);
    console.log(keys)
    let checkListItems = keys.map((key) => 
      <Menu.Item> <Checkbox onChange ={this.filterHandler} name= {key}><span> {key}</span></Checkbox> </Menu.Item>
    );
    
    console.log('filters is', myFilters);

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
  		renderItem={item => (
  			<List.Item>
  			<Card title={item.title}>
          <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <List>
              <p>Agreebleness: {item.details["agreeableness"] || 0}</p>
              <p>Alcohol Drinking Behavior: {item.details["alcohol-drinking-behavior"] || 0}</p>
              <p>Alpha Linolenic Acid: {item.details["alpha-linolenic-acid"] || 0}</p>
              <p>Anger: {item.details.anger || 0}</p>
              <p>Beard Thickness: {item.details["beard-thickness"] || 0}</p>
              <p>Beta Carotene: {item.details["beta-carotene"] || 0}</p>
              <p>Bitter Taste: {item.details["bitter-taste"] || 0}</p>
              <p>Black Hair: {item.details["black-hair"] || 0}</p>
              <p>Blood Glucose: {item.details["blood-glucose"] || 0}</p>
              <p>BMI: {item.details["bmi"] || 0}</p>
              <p>Body Fat Mass: {item.details["body-fat-mass"] || 0}</p>
              <p>Body Fat Percentage: {item.details["body-fat-percentage"] || 0}</p>
              <p>Breast Size: {item.details["breast-size"] || 0}</p>
              <p>Caffeine Consumption: {item.details["caffeine-consumption"] || 0}</p>
              <p>Caffeine Metabolite Ratio: {item.details["caffeine-metabolite-ratio"] || 0}</p>
              <p>Calcium: {item.details["calcium"] || 0}</p>
              <p>Carbohydrate Intake: {item.details["carbohydrate-intake"] || 0}</p>
              <p>Childhood Intelligence: {item.details["childhood-intelligence"] || 0}</p>
              <p>Conscientiousness: {item.details["conscientiousness"] || 0}</p>
              <p>Depression: {item.details["depression"] || 0}</p>
              <p>Egg allergy: {item.details["egg-allergy"] || 0}</p>
              <p>Endurance Performance: {item.details["endurance-performance"] || 0}</p>
              <p>Depression: {item.details["depression"] || 0}</p>
              <p>Excessive Daytime Sleepiness: {item.details["excessive-daytime-sleepiness"] || 0}</p>
              <p>Extraversion: {item.details["extraversion"] || 0}</p>
              <p>Folate: {item.details["folate"] || 0}</p>
              <p>Freckles: {item.details["freckles"] || 0}</p>
              <p>Gambling: {item.details["gambling"] || 0}</p>
              <p>Genetic eye color: {item.details["eye-color"] || 0}</p>
              <p>Genetic weight: {item.details["weight"] || 0}</p>
              <p>Harm Avoidance: {item.details["harm-avoidance"] || 0}</p>
              <p>Hearing Function: {item.details["hearing-function"] || 0}</p>
              <p>Hippocampal Volume: {item.details["hippocampal-volume"] || 0}</p>
              <p>Intelligence: {item.details["intelligence"] || 0}</p>
              <p>Iron: {item.details["iron"] || 0}</p>
              <p>Job Related Exhaustion: {item.details["job-related-exhaustion"] || 0}</p>
              <p>Lean Body Mass: {item.details["lean-body-mass"] || 0}</p>
              <p>Lobe Size: {item.details["lobe-size"] || 0}</p>
              <p>Magnesium: {item.details["magnesium"] || 0}</p>
              <p>Male-Pattern Baldness (AGA): {item.details["male-pattern-baldness-aga"] || 0}</p>
              <p>Mathematical Ability: {item.details["mathematical-ability"] || 0}</p>
              <p>Milk Allergy: {item.details["milk-allergy"] || 0}</p>
              <p>Morning Person: {item.details["morning-person"] || 0}</p>
              <p>Motion Sickness: {item.details["motion-sickness"] || 0}</p>
              <p>Neuroticism: {item.details["neuroticism"] || 0}</p>
              <p>Openness: {item.details["openness"] || 0}</p>
              <p>Peanuts Allergy: {item.details["peanuts-allergy"] || 0}</p>
              <p>Phosphorus: {item.details["phosphorus"] || 0}</p>
              <p>Protein Intake: {item.details["protein-intake"] || 0}</p>
              <p>Reading & Spelling Ability: {item.details["reading-and-spelling-ability"] || 0}</p>
              <p>Red Wine Liking: {item.details["red-wine-liking"] || 0}</p>
              <p>Vitamin E Response: {item.details["response-to-vitamin-e-supplementation"] || 0}</p>
              <p>Reward Dependence: {item.details["reward-dependence"] || 0}</p>
              <p>Skin Pigmentation: {item.details["skin-pigmentation"] || 0}</p>
              <p>Sleep Duration: {item.details["sleep-duration"] || 0}</p>
              <p>Smell Sensitivity For Malt: {item.details["smell-sensitivity-for-malt"] || 0}</p>
              <p>Smoking Behavior: {item.details["smoking-behavior"] || 0}</p>
              <p>Visceral and Subcutaneous Adipose Tissue Ratio: {item.details["visceral-and-subcutaneous-adipose-tissue-ratio"] || 0}</p>
              <p>Vitamin A: {item.details["vitamin-a"] || 0}</p>
              <p>Vitamin B12: {item.details["vitamin-b12"] || 0}</p>
              <p>Vitamin D: {item.details["vitamin-d"] || 0}</p>
              <p>Vitamin E: {item.details["vitamin-e"] || 0}</p>
              <p>Waist: {item.details["waist"] || 0}</p>
              <p>Waist Hip Ratio: {item.details["waist-hip-ratio"] || 0}</p>
              <p>White Wine Liking: {item.details["white-wine-liking"] || 0}</p>
              <p>Word Reading Ability: {item.details["word-reading-ability"] || 0}</p>
            </List>
          </Modal>
          <p>Height: {item.details.height}</p>
          <p>Weight: {item.details.weight}</p>
          <p>Red Hair: {item.details["red-hair"]}</p>
          <p>Black Hair: {item.details["black-hair"]}</p>
          <p>Longevity: {item.details.longevity}</p> 
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
