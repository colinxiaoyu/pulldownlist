/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import Filter from './filter-menu/filers'
import FilterBar from './filter-menu/filter-bar';
import FilterBox from './filter-menu/filter-box';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  state = {
    open: false,
    selectedDate: 0,
    datas: [
      {
        type: 'single',
        itemIndex: 0,//当前被选择的items哪个index
        items:
          [{title: 'Most Relevant', value: 'most_relevant', count: 100},
            {title: 'Recent', value: 'recent', count: 243}]

      },

      {
        type: 'single',
        itemIndex: 0,
        items: [{title: 'years', value: 'most_relevant', count: 100},
          {title: 'base', value: 'recent', count: 243},
          {title: 'base', value: 'recent', count: 243},
          {title: 'years', value: 'most_relevant', count: 100},
          {title: 'base', value: 'recent', count: 243},
          {title: 'base', value: 'recent', count: 243}]

      },
      {
        type: 'muti',
        title: 'Requirements',
        items: [
          {
            title: 'Salary Range',
            itemIndex: 0,
            choose: [
              {title: 'All', value: 'all'},
              {title: '30k-60k', value: '30k-60k'},
              {title: 'All', value: 'all'},
              {title: '30k-60k', value: '30k-60k'},
            ]
          },
          {
            title: 'Work Experience',
            itemIndex: 0,
            choose: [
              {title: 'All', value: 'all'},
              {title: '1-3years', value: '1-3years'},
              {title: 'All', value: 'all'},
              {title: '30k-60k', value: '30k-60k'},
              {title: 'All', value: 'all'},
              {title: '1-3years', value: '1-3years'},
              {title: 'All', value: 'all'},
              {title: '30k-60k', value: '30k-60k'},
              {title: 'All', value: 'all'},
              {title: '1-3years', value: '1-3years'},
              {title: 'All', value: 'all'},
              {title: '30k-60k', value: '30k-60k'},
              {title: 'All', value: 'all'},
              {title: '1-3years', value: '1-3years'},
              {title: 'All', value: 'all'},
              {title: '30k-60k', value: '30k-60k'},
            ]
          },
          {
            title: 'Education',
            itemIndex: 0,
            choose: [
              {title: 'All', value: 'all'},
              {title: 'Diploma', value: 'Diploma'},
              {title: 'Bachelor', value: 'Bachelor'},
            ]
          }
        ]

      },
    ]
  };
  render() {
    const data = this.state.datas[this.state.selectedDate];//传入FilterBox的数据源

    return (
      <View style={styles.container}>
        <FilterBar
          datas={this.state.datas}
          changeDatas={(index) => this._changeDatas(index)}
        />

        <View>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
        <FilterBox
          open={this.state.open}
          closeBox={() => this._closeBox()}
          onItemPress={(type) => this._onItemPress(type)}
          onReset={() => this._onReset()}
          onConfirm={() => this._onConfirm()}
          data={data}/>
      </View>
    );
  }

  /**
   * 点击筛选框上排按钮，1、选择数组，2、关闭或者打开筛选框下排组件
   * @param index
   * @private
   */
  _changeDatas=(index)=> {
    const open = this.state.open;
    this.setState({
      selectedDate: index,
      open: !open
    })
  }

  /**
   * 关闭下拉筛选框  此处需修改逻辑判断single模式下，关闭只是对视图的关闭，不做其他操作
   * @private
   */
  _closeBox() {
    const open = this.state.open;
    this.setState({
      open: !open
    })
  }

  /**
   * item点击时间处理
   * @param type one of{'muti','single'}
   * @private
   */
  _onItemPress(type) {
    if (type === 'muti') {
      this.setState({
        datas: this.state.datas,
      });
    } else if (type === 'single') {
      const open = this.state.open;
      this.setState({
        datas: this.state.datas,
        open: !open
      });
      //--------------------------此处添加回调方法
    }
  }

  /**
   * 重置type === 'muti'情况下相应的data
   * @private
   */
  _onReset() {
    this.setState({
      datas: this.state.datas,
    });
  }

  /**
   * 提交datas数据，与_onItemPress中type === 'single'效果是一致的
   * 必须要this.setState({
        datas: this.state.datas,
      }); 因为已经不需要刷新页面了，在每次点击的时候，都已经调用了_onItemPress方法
   但是需要关闭视图
   * @private
   */
  _onConfirm() {
    const open = this.state.open;
    this.setState({
      open: !open
    })
    //--------------------------此处添加回调方法
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
