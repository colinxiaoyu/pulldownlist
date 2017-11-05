import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet, Platform
} from 'react-native';


const {width, height} = Dimensions.get('window');


export default class FilterBox extends React.Component {

  static defaultProps = {
    data: {
      type: 'single',
      itemIndex: 0,//当前被选择的items哪个index
      items:
        [{title: 'Most Relevant', value: 'most_relevant', count: 100},
          {title: 'Recent', value: 'recent', count: 243}]
    }
  };

  static propTypes = {
    closeBox: React.PropTypes.func,
    onItemPress: React.PropTypes.func,
    onReset: React.PropTypes.func,
    onConfirm: React.PropTypes.func,
  };

  render() {
    const data = this.props.data;//从父级传过来的数据
    if (data && this.props.open) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.filterWrapper}
        activeOpacity={1}
        onPress={() => {
          this.props.closeBox && this.props.closeBox()
        }}>
        {
          data.type === 'single' ?
            <View style={styles.filterCont}>
              {
                data.items.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.filterItem}
                      activeOpacity={0.8}
                      onPress={() => {
                        data.itemIndex = index;
                        this.props.onItemPress && this.props.onItemPress(data.type)
                      }
                      }>
                      {item.title &&
                      <Text style={[styles.filterText, (data.itemIndex === index) && {color: 'blue'}]}
                            allowFontScaling={false}>{item.title}</Text>}
                      {item.count &&
                      <Text style={[styles.filterText, (data.itemIndex === index) && {color: 'blue'}]}
                            allowFontScaling={false}>{item.count}</Text>}
                    </TouchableOpacity>)
                })
              }
            </View> : null
        }
        {
          data.type === 'muti' ?
            <View style={[{width: width, height: height - 200}, styles.filterCont]}>
              <ScrollView>
                {
                  data.items.map((item, index) => {
                    return (
                      <View key={index}>
                        <Text style={styles.labelText}>{item.title}</Text>
                        <View
                          style={{width: width - 30, flexWrap: 'wrap', flexDirection: 'row'}}>
                          {
                            this._renderItems(item, data.type)

                          }
                        </View>
                      </View>
                    )
                  })
                }
              </ScrollView>
              <View style={{backgroundColor: 'white'}}>
                <View style={styles.actionButtonContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => this._onReset(data.items)}>
                    <Text style={styles.actionButtonText}>Reset</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.actionConfirmButton]}
                    onPress={() => {
                      this.props.onConfirm && this.props.onConfirm()
                    }}>
                    <Text style={[styles.actionButtonText, styles.actionConfirmButtonText]}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> : null
        }
      </TouchableOpacity>

    )
  }

  _renderItems(item, type) {
    return (
      item.choose.map((choose, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              item.itemIndex = index;
              this.props.onItemPress && this.props.onItemPress(type);
            }}
            key={index}
            style={[styles.optionButton, (item.itemIndex === index) && {borderColor: 'blue'}]}>
            <Text>{choose.title}</Text>
          </TouchableOpacity>
        )
      }))
  }

  /**
   * 重置items.itemIndex为0
   * @param datas
   * @private
   */
  _onReset(datas) {
    for (let item of datas) {
      item.itemIndex = 0
    }
    this.props.onReset && this.props.onReset()
  }
}


const styles = StyleSheet.create({

  filterWrapper: {
    width: width,
    height: height-40,
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: '#555'
  },
  filterCont: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  filterItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  filterText: {
    color: '#666'
  },
  labelText: {
    marginHorizontal: 15,
    marginVertical: 10,
    marginRight: 20,
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '400' : '300',
    color: '#666666',
    backgroundColor: 'transparent'
  },
  optionButton: {
    marginHorizontal: 10,
    marginVertical: 15,
    minWidth: 50,
    height: 30,
    paddingLeft: 14,
    paddingRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e8e8e8'
  },
  actionButtonContainer: {
    flexDirection: 'row',
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1
  },

  actionButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionConfirmButton: {
    backgroundColor: 'blue',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '400' : '300',
    color: 'blue',
    backgroundColor: 'transparent'
  },
  actionConfirmButtonText: {
    color: 'white',
  }

});