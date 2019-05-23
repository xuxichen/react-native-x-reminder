/*
 * @Author: Chad.Xuxichen
 * @Date: 2019-05-23 00:40:40
 * @LastEditors: Chad.Xuxichen
 * @LastEditTime: 2019-05-23 01:12:56
 * @github: https://github.com/xuxichen
 * @Description: 
 */

import React, { Component } from "react"; 
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

export default class DetailA extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Detail Page </Text>
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
        backgroundColor: '#000000',
        color: 'white',
        padding: 10,
        margin: 10,
    }
  });