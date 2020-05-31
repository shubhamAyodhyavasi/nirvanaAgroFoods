import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import AppHeader from '../../components/header/Header';
import { fileBaseUrl } from '../../modules/constant';
import { getDaynamicPostData } from '../../modules/service'
import { Container, Content, List, ListItem, Item, Icon, Input, Button, Left, Body, Right, Thumbnail, Text } from 'native-base';
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            searchKey:''
        };
    }
    async getSearchList() {
        const {searchKey}=this.state
        const getCategoryRes = await getDaynamicPostData('searchProduct', { key: searchKey });
        if (getCategoryRes.products) {
            this.setState({
                searchList: getCategoryRes.products
            })
        }
    }
    _getUrl(url) {
        return fileBaseUrl + url;
      }
    render() {
        const {searchList} = this.state
        const { navigation } = this.props;

        return (
            <Container>
                <AppHeader title="Search" />
                <Content>
                    <View>
                        <Item regular style={{ width: screenWidth - 20, marginLeft: 10, marginTop: 10 }}>
                            <Input placeholder="Search" onChangeText={(e)=>{this.setState({searchKey:e})}} style={{ width: screenWidth / 2 }} />
                            <Button transparent
                              onPress={()=>{this.getSearchList()}}
                            >
                                <Icon name="ios-search" />
                            </Button>
                        </Item>
                    </View>
                    <List>
                        {
                            searchList && searchList.map((itm, index) =>
                                <ListItem avatar key={index} onStartShouldSetResponder={() => {
                                    navigation.navigate('productList', {
                                      categoryId: itm.catId,
                                      categoryTitle: itm.title,
                                    });
                                  }}>
                                    <Left>
                                        <Thumbnail source={{ uri: this._getUrl(itm.image) }} />
                                    </Left>
                                    <Body>
                                        <Text>{itm.title}</Text>
                                    </Body>
                                </ListItem>
                            )
                        }


                    </List>
                </Content>
            </Container>
        );
    }
}