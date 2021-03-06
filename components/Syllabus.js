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
import Navbar from './Navbar';
import Menu from './Menu';

export default class Syllabus extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            news: []
        };

        this.openDrawer = this.openDrawer.bind(this);
    }

    componentDidMount() {
        return;
        return fetch('https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=9b40df3156d14a9baeaa73eade696563')
            .then((response) => response.json())
            .then((responseJson) => {
                let i = 0;
                responseJson.articles.forEach(item => {
                    item.color = i++ % 7
                });
                this.setState({
                    isLoading: false,
                    news: responseJson.articles,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    news: [],
                });
                console.log(error);
            });
    }

    openDrawer() {
        this.refs['DRAWER_REF'].openDrawer();
    }

    render() {
        let navigationView = (
            <View style={styles.drawerContainer}>
                <Image source={require('../assets/loginbg.jpg')} style={styles.drawerBackgroundImage}>
                    <Image source={require('../assets/graduate.jpg')} style={styles.drawerTitleImg}>
                        <View style={styles.drawerTitleImgOverlay}>
                            <Image source={require('../assets/avatar/6.jpeg')} style={styles.avatar}/>
                        </View>
                    </Image>
                    <View style={styles.drawerOverlay}>
                        <View style={[styles.menuItemWrapper]}>
                            <Text style={styles.menuItem}>Home</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="home" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                        <View style={[styles.menuItemWrapper, styles.itemActive]}>
                            <Text style={styles.menuItem}>Syllabus</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="star" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                        <View style={[styles.menuItemWrapper]}>
                            <Text style={styles.menuItem}>Notes</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="book" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                        <View style={[styles.menuItemWrapper]}>
                            <Text style={styles.menuItem}>Question Papers</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="question-circle" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                        <View style={[styles.menuItemWrapper]}>
                            <Text style={styles.menuItem}>Technology News</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="newspaper-o" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                        <View style={[styles.menuItemWrapper]}>
                            <Text style={styles.menuItem}>Events</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="calendar" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                        <View style={[styles.menuItemWrapper]}>
                            <Text style={styles.menuItem}>Help</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="info-circle" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                        <View style={[styles.menuItemWrapper]}>
                            <Text style={styles.menuItem}>Contact Us</Text>
                            <View style={styles.navIconWrapper}>
                                <Icon name="commenting" color="#555" size={22} style={styles.navIcon}/>
                            </View>
                        </View>
                    </View>
                </Image>
            </View>
        );

        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                ref={'DRAWER_REF'}
                renderNavigationView={() => <Menu home_nav={this.props.navigation} activeTab={1}/>}>
                <View style={{flex: 1}}>
                    <View style={styles.backgroundImage}>
                        <View style={styles.container}>
                            <Navbar openDrawer={this.openDrawer} home_nav={this.props.navigation}/>
                            <View style={{flex: 1,flexDirection: 'column'}}>
                                <Image source={require('../assets/subNavBanner.jpg')}
                                       style={styles.headerBackgroundImage}>
                                    <View style={styles.headerImageWrapper}>
                                        <Image source={require('../assets/syllabus.png')} style={styles.headerImage}/>
                                    </View>
                                    <Text style={styles.headerText}>SYLLABUS</Text>
                                </Image>
                                <Image source={require('../assets/loginbg.jpg')} style={styles.branchesContainer}>
                                    <View style={styles.cardRow}>
                                        <View style={styles.cardWrapper}>
                                            <Image source={require('../assets/branch/ec.png')}
                                                   style={styles.branchIcon}/>
                                            <Text style={styles.branchName}>EC</Text>
                                        </View>
                                        <View style={styles.cardWrapper}>
                                            <Image source={require('../assets/branch/cs.png')}
                                                   style={styles.branchIcon}/>
                                            <Text style={styles.branchName}>CS</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <View style={styles.cardWrapper}>
                                            <Image source={require('../assets/branch/is.png')}
                                                   style={styles.branchIcon}/>
                                            <Text style={styles.branchName}>IS</Text>
                                        </View>
                                        <View style={styles.cardWrapper}>
                                            <Image source={require('../assets/branch/me.png')}
                                                   style={styles.branchIcon}/>
                                            <Text style={styles.branchName}>ME</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <View style={styles.cardWrapper}>
                                            <Image source={require('../assets/branch/cv.png')}
                                                   style={styles.branchIcon}/>
                                            <Text style={styles.branchName}>CV</Text>
                                        </View>
                                        <View style={styles.cardWrapper}>
                                            <Image source={require('../assets/branch/ae.png')}
                                                   style={styles.branchIcon}/>
                                            <Text style={styles.branchName}>AE</Text>
                                        </View>
                                    </View>
                                </Image>
                            </View>
                        </View>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        backgroundColor: '#eee'
        // resizeMode: 'cover',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    bannerTop: {
        height: 200,
        width: null
    },
    bannerOverlay: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0)',
        padding: 10
    },
    naviconWrapper: {
        flexDirection: 'row',
    },
    iconWrapperLeft: {
        flex: 1,
    },
    iconWrapperRight: {
        flex: 1,
        alignItems: 'flex-end'
    },
    barsIcon: {
        color: '#fff',
        fontSize: 30,
    },
    bellIcon: {
        color: '#fff',
        fontSize: 30,
    },
    avatarBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff'
    },
    userName: {
        flex: 1,
        alignItems: 'center',
        color: '#fff',
        fontSize: 25,
        marginTop: 15
    },
    storyCard: {
        flexDirection: 'column',
        // height: 250,
        backgroundColor: '#888',
        // margin: 5
    },
    storyBanner: {
        resizeMode: 'cover',
        width: null,
        height: 300,
        margin: 5,
        borderColor: '#fff',
        borderWidth: 4

    },
    diamonds: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    storyImage: {
        width: null,
        height: 230,
        borderRadius: 4,
        resizeMode: 'cover'
    },
    card: {
        // height: 100,
        margin: 5,
        // padding: 10,
        borderRadius: 4,
        elevation: 2,
        borderColor: '#fff',
        borderWidth: 0
    },
    imageCard: {
        margin: 5,
        borderRadius: 4,
        elevation: 2,
        borderColor: '#fff',
        borderWidth: 0
    },
    white: {
        backgroundColor: 'rgba(255,255,255, 0.4)'
    },
    pink: {
        backgroundColor: 'rgba(233, 30, 99, 0.6)'
    },
    blue: {
        backgroundColor: 'rgba(33,150,243, 0.6)'
    },
    purple: {
        backgroundColor: 'rgba(156,39,176,0.6)'
    },
    cyan: {
        backgroundColor: 'rgba(0, 188, 212, 0.6)'
    },
    orange: {
        backgroundColor: 'rgba(255, 152, 0, 0.6)'
    },
    grey: {
        backgroundColor: 'rgba(96, 125, 139, 0.6))'
    },
    newsImage: {
        width: null,
        height: 160,
        borderRadius: 4,
        resizeMode: 'cover',
    },
    newsImageOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    newsTitle: {
        color: '#fff',
        fontSize: 20,
        padding: 10
    },
    newsDescription: {
        margin: 10,
        color: '#d1d1d1',
        fontSize: 16
    },
    readMoreWrapper: {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    dateWrapper: {
        flex: 1,
    },
    date: {
        fontSize: 16,
        color: '#fff',
        margin: 10
    },
    readMore: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        margin: 10,
        textAlign: 'right',
    },


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
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.4)',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: '#cbcbcb'
    },
    menuItem: {
        // flex: 1,
        color: '#4e4e4e',
        fontSize: 18
    },
    itemActive: {
        backgroundColor: 'rgba(255,255,255,0.7)',
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
    headerText: {
        fontSize: 22,
        color: '#fff',
        marginVertical: 5
    },
    cardRow: {
        flex: 0.3,
        flexDirection: 'row'
    },
    cardWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderColor: '#424242',
        borderWidth: 1
    },
    branchesContainer: {
        flex: 1,
        flexDirection: 'column',
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    branchName: {
        fontSize: 20,
        color: '#fff'
    },
    branchIcon: {
        height: 50,
        width: 50,
        padding: 5,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#fff'
    }
});

