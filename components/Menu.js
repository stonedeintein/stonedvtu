import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    DrawerLayoutAndroid,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationActions} from 'react-navigation'

import * as actionCreators from '../actionCreators';
import {connect} from 'react-redux';

export class Menu extends Component {
    constructor() {
        super();
        this.getActiveTab = this.getActiveTab.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }

    getActiveTab(contentType) {
        if (contentType ===  this.props.contentType) {
            return styles.itemActive;
        }
    }

    navigateTo = (route, contentType) => {
        if(contentType) {
            this.props.changeContentType(contentType);
        }

        if (route == 'Home') {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Home'}),
                ]
            });

            this.props.home_nav.dispatch(resetAction);

            // this.props.home_nav.goBack(); //Prevent Home Component from being destroyed.
            // resetAction = NavigationActions.reset({
            //     index: 0,
            //     actions: [
            //         NavigationActions.navigate({routeName: route}),
            //     ]
            // });
        } else {
            const resetAction = NavigationActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({routeName: 'Home'}),
                    NavigationActions.navigate({routeName: route}),
                ]
            });

            this.props.changeTab(route);
            this.props.home_nav.dispatch(resetAction);
        }
    };

    render() {
        return (
            <View style={styles.drawerContainer}>
                <Image source={require('../assets/loginbg.jpg')} style={styles.drawerBackgroundImage}>
                    <Image source={require('../assets/graduate.jpg')} style={styles.drawerTitleImg}>
                        <View style={styles.drawerTitleImgOverlay}>
                            <Image source={require('../assets/avatar/4.jpg')} style={styles.avatar}/>
                        </View>
                    </Image>
                    <View style={styles.drawerOverlay}>
                        <ScrollView>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('VTU AURA')]}
                                onPress={() => this.navigateTo('Home', 'VTU AURA')}>
                                <Text style={styles.menuItem}>Home</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="home" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('Syllabus')]}
                                onPress={() => this.navigateTo('SemSelector', 'Syllabus')}>
                                <Text style={styles.menuItem}>Syllabus</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="star" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('Notes')]}
                                onPress={() => this.navigateTo('SemSelector', 'Notes')}>
                                <Text style={styles.menuItem}>Notes</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="book" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('Question Papers')]}
                                onPress={() => this.navigateTo('SemSelector', 'Question Papers')}>
                                <Text style={styles.menuItem}>Question Papers</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="question-circle" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('Technology News')]}
                                onPress={() => this.navigateTo('SemSelector', 'Technology News')}>
                                <Text style={styles.menuItem}>Technology News</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="newspaper-o" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('Events')]}
                                onPress={() => this.navigateTo('SemSelector', 'Events')}>
                                <Text style={styles.menuItem}>Events</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="calendar" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('Help')]}
                                onPress={() => this.navigateTo('SemSelector', 'Help')}>
                                <Text style={styles.menuItem}>Help</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="info-circle" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.menuItemWrapper, this.getActiveTab('Contact Us')]}
                                onPress={() => this.navigateTo('SemSelector', 'Contact Us')}>
                                <Text style={styles.menuItem}>Contact Us</Text>
                                <View style={styles.navIconWrapper}>
                                    <Icon name="commenting" style={styles.navIcon}/>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#555'
    },
    drawerBackgroundImage: {
        flex: 1,
        flexDirection: 'column',
        height: null,
        width: null,
        resizeMode: 'cover'
    },
    drawerTitleImg: {
        flex: 0.3,
        flexDirection: 'row',
        width: null,
        resizeMode: 'cover'
    },
    drawerOverlay: {
        flex: 0.7,
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    drawerTitleImgOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 10
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderColor: '#fff',
        borderWidth: 3
    },
    menuItemWrapper: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.1)',
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderColor: '#444'
    },
    menuItem: {
        // flex: 1,
        // color: '#4e4e4e',
        color: '#fff',
        fontSize: 20
    },
    itemActive: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row'
    },
    navIconWrapper: {
        flex: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    headerBackgroundImage: {
        // flex: 0.3,
        flexDirection: 'column',
        height: 150,
        width: null,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImageWrapper: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderColor: '#fff',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerImage: {
        height: 40,
        width: 40
    },
    navIcon: {
        fontSize: 24,
        color: '#fff',
        // color: '#555',
    }
});

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        changeTab: (tabName) => {
            dispatch(actionCreators.changeTab(tabName));
        },
        changeContentType: (contentType) => {
            dispatch(actionCreators.changeContentType(contentType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)