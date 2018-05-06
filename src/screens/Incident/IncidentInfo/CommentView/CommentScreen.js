import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';

import CommentRowData from './CommentRowData';
import BackToolbarStyle from '../../../../components/BackToolbar/BackToolbarStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import styles from './styles/CommentScreenStyle';
import AppText from '../../../../constants/AppText';
import color from '../../../../constants/Color';
import size from '../../../../constants/Size';
import statusBarStyle from '../../../../components/CommonStyle/StatusBarHeightStyle';
import {connect} from 'react-redux';
import dismissKeyBoard from 'dismissKeyboard';
import {isTextInputEmpty} from '../../../../components/Validation/EmptyCheck';
import Toast from 'react-native-simple-toast';
import {getAllCommentData, initializeAllValue, addNewComment} from '../../actions/CommentAction';
import CustomIndicator from '../../../../components/CustomIndicator';

class CommentScreen extends Component {
    constructor(props) {
        super(props);
        this.props.initializeAllValue();
        this.state = {
            commentText: ''
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{flex: 1}}>
                <View style={[styles.rootStyle, statusBarStyle.statusBarHeightStyle]}>
                    <View style={[BackToolbarStyle.headerStyle, styles.topBarHeaderRootStyle]}>
                        <TouchableOpacity onPress={() => this.props.closeCommentScreen()}
                                          underlayColor={color.BUTTON_PRESS_COLOR}>
                            <View style={styles.backIconRootStyle}>
                                <MaterialIcon name="arrow-back" size={size.TOOLBAR_ICON_SIZE}
                                              color={color.WHITE}/>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.titleRootStyle}>
                            <Text style={styles.titleStyle}>{AppText.COMMENT}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.props.closeCommentScreen()}
                                          underlayColor={color.BUTTON_PRESS_COLOR}>
                            <View style={styles.crossIconRootStyle}>
                                <EntypoIcon name="cross" size={size.TOOLBAR_ICON_SIZE} color={color.WHITE}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        style={styles.flatListStyle}
                        data={this.props.commentScreenReducer.commentList}
                        renderItem={({item}) => (
                            <CommentRowData data={item}/>
                        )}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={this.loadMoreComment}
                        ListFooterComponent={this.renderFooter}
                        onEndReachedThreshold={0.5}/>

                    <View style={styles.commentBoxRootStyle}>
                        <TextInput
                            style={styles.commentBoxStyle}
                            ref='comment'
                            placeholder={AppText.WRITE_A_COMMENT}
                            underlineColorAndroid="transparent"
                            selectionColor={color.DARK_GRAY}
                            onChangeText={(text) => this.setState({commentText: text})}
                            placeholderTextColor={color.DARK_GRAY}
                            returnKeyType='done'/>

                        <TouchableOpacity style={styles.commentTouchableOpacityStyle}
                                          underlayColor={color.BUTTON_PRESS_COLOR}
                                          onPress={() => this.sendCommentPress()}>
                            <Image source={require('../../../../assets/CommentScreen/comment_send.png')}
                                   style={styles.commentSendIconStyle}/>
                        </TouchableOpacity>
                    </View>

                    <CustomIndicator isVisible={this.props.commentScreenReducer.isFetching}/>
                </View>
            </KeyboardAvoidingView>
        );
    }

    sendCommentPress() {
        if (isTextInputEmpty(this.state.commentText)) {
            Toast.show(AppText.COMMENT_EMPTY_MESSAGE, Toast.SHORT);
        } else {
            dismissKeyBoard();
            this.refs.comment.setNativeProps({text: ''});
            let body = {
                'case_id': this.props.id,
                'comment_content': this.state.commentText
            };
            this.setState({
                commentText: ''
            }, this.callAddCommentApi(body));
        }
    }

    callAddCommentApi(body) {
        this.props.addNewComment(body);
    }

    loadMoreComment = () => {
        let storeCurrentPage = this.props.commentScreenReducer.commentListCurrentPage;
        let storeLastPage = this.props.commentScreenReducer.commentListLastPage;
        let currentPage = this.props.commentScreenReducer.currentPage;
        if (currentPage === storeCurrentPage && storeCurrentPage < storeLastPage) {
            currentPage = currentPage + 1;
            this.callAllCommentApi(currentPage);
        }
    };

    renderFooter = () => {
        let storeCurrentPage = this.props.commentScreenReducer.commentListCurrentPage;
        let storeLastPage = this.props.commentScreenReducer.commentListLastPage;
        let currentPage = this.props.commentScreenReducer.currentPage;
        let isLoading = currentPage === storeCurrentPage && storeCurrentPage < storeLastPage;
        return (
            <ActivityIndicator
                style={{marginVertical: isLoading ? 20 : 0, opacity: isLoading ? 1 : 0}}
                animating={true}
                color={color.INDICATION_COLOR}
                size={isLoading ? 'large' : 0}/>
        )
    };

    componentDidMount() {
        this.callAllCommentApi(1);
    }

    callAllCommentApi(pageNumber) {
        let body = {
            'id': this.props.id
        };
        let parameter = {
            'page': pageNumber
        };
        this.props.getAllCommentData(body, parameter);
    }
}

function mapStateToProps(state) {
    return {
        nav: state,
        commentScreenReducer: state.commentScreenReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCommentData: (body, parameter) => dispatch(getAllCommentData(body, parameter)),
        initializeAllValue: () => dispatch(initializeAllValue()),
        addNewComment: (body) => dispatch(addNewComment(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);