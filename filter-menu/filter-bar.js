import React, {Component  } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,Platform
} from 'react-native';



const _IMG_ARROW_DOWN = require('./img/arrow_down_blue.png');

const {width, height} = Dimensions.get('window');

export default class FilterRecent extends Component {


  static propTypes = {
    changeDatas: React.PropTypes.func //回调，告诉父组件，当前调用的是哪个datas数组中，哪个数据
  };


  render() {
    return (
      <View style={{height: 40, width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        {
          this.props.datas && this.props.datas.map((data, index) => {
            if (data.type === 'single') {
              return (
                <TouchableOpacity
                  key={index}
                  style={{flex: 1}}
                  onPress={() => {
                    this._changeDatas(index);
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.labelText]}>{data.items[data.itemIndex].title}</Text>
                    <Text style={[styles.labelText]}> {data.items[data.itemIndex].count}</Text>
                    <Image style={{height: 6, width: 8, resizeMode: 'contain', marginLeft: 4}}
                           source={_IMG_ARROW_DOWN}/>
                  </View>
                </TouchableOpacity>
              )
            }else if(data.type === 'muti'){
              return (
                <TouchableOpacity
                  key={index}
                  style={{flex: 1}}
                  onPress={() => {
                    this._changeDatas(index);
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.labelText]}>{data.title}</Text>
                    <Image style={{height: 6, width: 8, resizeMode: 'contain', marginLeft: 4}}
                           source={_IMG_ARROW_DOWN}/>
                  </View>
                </TouchableOpacity>
              )
            }
          })
        }

      </View>
    );
  }

  //回调，告诉父组件，当前调用的是哪个datas数组中，哪个数据
  _changeDatas(index) {
    if (this.props.changeDatas) {
      this.props.changeDatas(index);
    }
  }


}

const styles = StyleSheet.create({
  labelText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '400' : '300',
    color: '#666666',
    backgroundColor: 'transparent'
  },

});

