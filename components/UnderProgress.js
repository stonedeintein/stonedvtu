import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    DrawerLayoutAndroid,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Octicon from 'react-native-vector-icons/Octicons';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import Menu from './Menu';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob';
import Analytics from 'appcenter-analytics';

export class UnderProgress extends Component {
    constructor() {
        super();
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    openDrawer() {
        this.refs['DRAWER_REF'].openDrawer();
    }

    closeDrawer() {
        this.refs['DRAWER_REF'].closeDrawer();
    }

    componentDidMount() {
        if(this.props.contentType === 'Notes') {
            Analytics.trackEvent('Notes', {});
        } else {
            Analytics.trackEvent('Question Papers', {});
        }
    }

    render() {
        return (
            <DrawerLayoutAndroid
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                ref={'DRAWER_REF'}
                renderNavigationView={() => <Menu closeDrawer={this.closeDrawer} home_nav={this.props.navigation}/>}>
                <View style={{flex: 1}}>
                    <View style={styles.backgroundImage}>
                        <View style={styles.container}>
                            <Navbar openDrawer={this.openDrawer} home_nav={this.props.navigation}
                                    contentType={this.props.contentType}/>
                            <View style={styles.errorContainer}>
                                <Image source={require('../assets/homebg.jpg')} style={styles.img} blurRadius={8}>
                                    <ScrollView>
                                        {
                                            this.props.contentType === 'Notes' &&
                                            this.props.externalLinks &&
                                            this.props.externalLinks.notes.map((item, index) => {
                                                return (
                                                    <TouchableOpacity style={styles.externalItem} key={index}
                                                                      onPress={() => {
                                                                          Analytics.trackEvent('Notes Link Click', {name: item.name});
                                                                          this.props.navigation.navigate('WebViewer', {
                                                                              url: item.url,
                                                                              adId: this.props.ads.banner.notesWebView,
                                                                              prevRoute: this.props.contentType
                                                                          })
                                                                      }}>
                                                        <Octicon name="book"
                                                                 style={styles.bookIcon}/>
                                                        <Text style={styles.externalItemText}>
                                                            {item.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                        {
                                            this.props.contentType === 'Question Papers' &&
                                            this.props.externalLinks &&
                                            this.props.externalLinks.questionPapers.map((item, index) => {
                                                return (
                                                    <TouchableOpacity style={styles.externalItem} key={index}
                                                                      onPress={() => {
                                                                          Analytics.trackEvent('Question Papers Link Click', {name: item.name});
                                                                          this.props.navigation.navigate('WebViewer', {
                                                                              url: item.url,
                                                                              adId: this.props.ads.banner.qpWebView,
                                                                              prevRoute: this.props.contentType
                                                                          })
                                                                      }}>
                                                        <Octicon name="book"
                                                                 style={styles.bookIcon}/>
                                                        <Text style={styles.externalItemText}>
                                                            {item.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                        <View style={styles.messageCard}>
                                            <Text style={styles.messageCardText}>
                                                <Octicon name="info"
                                                         style={styles.infoIcon}/>
                                                We are working on the content. Please bear with us at the moment.
                                                Contents on the links given above belong to their respective owners.
                                            </Text>
                                        </View>
                                        <View style={styles.adBannerWrapper}>
                                            <AdMobBanner
                                                adSize="mediumRectangle"
                                                adUnitID={this.props.ads.banner.notesQpRectangle}
                                                onAdFailedToLoad={error => console.error(error)}
                                            />
                                        </View>
                                    </ScrollView>
                                </Image>
                            </View>
                        </View>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    backgroundImage: {
        flex: 1,
        backgroundColor: '#eee'
        // resizeMode: 'cover',
    },
    errorContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    img: {
        width: Dimensions.get('window').width,
        // resizeMode: 'cover',
        flex: 1,
        flexDirection: 'column',
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navIcon: {
        fontSize: 20,
        color: '#fff'
    },
    messageCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 5,
        margin: 5
    },
    messageHeaderText: {
        color: '#fff',
        fontSize: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        padding: 5,
        marginBottom: 5
    },
    externalItem: {
        margin: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        flexDirection: 'row'
    },
    externalItemText: {
        color: '#fff',
        fontSize: 18
    },
    bookIcon: {
        color: '#fff',
        fontSize: 18,
        paddingTop: 4,
        marginRight: 5
    },
    adBannerWrapper: {
        alignItems: 'center',
        marginTop: 10
    },
    infoIcon: {
        fontSize: 15
    },
    messageCardText: {
        color: '#fff',
        fontSize: 15,
        marginHorizontal: 5,
        textAlign: 'center'
    }
});

function mapStateToProps(state) {
    return {
        ads: state.ads,
        externalLinks: state.externalLinks,
        contentType: state.contentType
    };
}

export default connect(mapStateToProps, null)(UnderProgress)