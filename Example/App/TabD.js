/*
 * @Author: Chad.Xuxichen
 * @Date: 2019-05-23 00:40:40
 * @LastEditors: Chad.Xuxichen
 * @LastEditTime: 2019-05-23 01:12:50
 * @github: https://github.com/xuxichen
 * @Description: 
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

export default class TabD extends Component {
    static navigationOptions = {
        tabBarLabel: 'TabBarD',
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Tab D Window</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        textAlign: 'center',
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        margin: 10,
    }
  });