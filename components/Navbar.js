import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DrawerLayoutAndroid,
    TouchableOpacity,
    ScrollView,
    StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as actionCreators from '../actionCreators';
import {connect} from 'react-redux';

export class Navbar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#393939"
                    barStyle="light-content"
                />
                <View style={styles.iconWrapperLeft}>
                    <TouchableOpacity onPress={() => this.props.openDrawer()}>
                        <Icon name="bars" style={styles.barsIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{this.props.contentType}</Text>
                </View>
                <View style={styles.iconWrapperRight}>
                    <Icon name="star" style={styles.bellIcon}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#393939',
        height: 60,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        elevation: 3
        // resizeMode: 'cover',
    },
    naviconWrapper: {
        flexDirection: 'row',
    },
    iconWrapperLeft: {
        flex: 2,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconWrapperRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    barsIcon: {
        color: '#fff',
        fontSize: 30,
    },
    bellIcon: {
        color: '#fff',
        fontSize: 30,
    },
    title: {
        color: '#fff',
        fontSize: 30,
        marginLeft: 10
    }
});

function mapStateToProps(state) {
    return {
        contentType: state.contentType,
    };
}

export default connect(mapStateToProps)(Navbar)
