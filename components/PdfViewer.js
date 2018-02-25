import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Text
} from 'react-native';
import Pdf from 'react-native-pdf';
import {connect} from 'react-redux';
import * as actionCreators from '../actionCreators';
import * as constants from './constants';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export class PdfViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageCount: 1,
        };
        this.pdf = null;
    }

    prevPage=()=>{
        if (this.pdf){
            let prePage = this.state.page>1?this.state.page-1:1;
            this.pdf.setNativeProps({page: prePage});
            this.setState({page:prePage});
            console.log(`prePage: ${prePage}`);
        }
    };

    nextPage=()=>{
        if (this.pdf){
            let nextPage = this.state.page+1>this.state.pageCount?this.state.pageCount:this.state.page+1;
            this.pdf.setNativeProps({page: nextPage});
            this.setState({page:nextPage});
            console.log(`nextPage: ${nextPage}`);
        }

    };

    render() {
        let source = {uri: this.props.fileUrl, cache:true};

        console.log('PDF Url: ' + this.props.fileUrl);

        return (
           <View style={styles.container}>
               <Pdf ref={(pdf) => {
                   this.pdf = pdf;
               }}
                    source={source}
                    page={1}
                    horizontal={false}
                    onLoadComplete={(pageCount) => {
                        this.setState({pageCount: pageCount});
                        console.log(`total page count: ${pageCount}`);
                    }}
                    onPageChanged={(page, pageCount) => {
                        this.setState({page: page});
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    style={styles.pdf}/>
               <View style={styles.controlsBar}>
                   <TouchableHighlight style={styles.arrowWrapper} onPress={() => {
                       if(this.state.page > 1) {
                           this.prevPage();
                       }
                   }}>
                       <MaterialIcon name="arrow-upward" color="#fff" size={20}/>
                   </TouchableHighlight>
                   <Text style={styles.pageCount}>{this.state.page}/{this.state.pageCount}</Text>
                   <TouchableHighlight style={styles.arrowWrapper} onPress={() => {
                       if(this.state.page < this.state.pageCount) {
                           this.nextPage();
                       }
                   }}>
                       <MaterialIcon name="arrow-downward" color="#fff" size={20}/>
                   </TouchableHighlight>
               </View>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    controlsBar: {
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    },
    arrowWrapper: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 5,
        borderRadius: 4
    },
    pageCount: {
        color: '#fff'
    }
});

function mapStateToProps(state) {
    return {
        fileUrl: state.fileUrl
    };
}

function mapDispatchToProps(dispatch) {
    // return {
    //     updatePdf: (fileName) => {
    //         dispatch(actionCreators.updatePdf(fileName));
    //     }
    // }
}

export default connect(mapStateToProps)(PdfViewer)
