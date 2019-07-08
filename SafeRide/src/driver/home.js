import React, {Component} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
//import {List, ListItem} from 'react-native-elements';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch,
    Thumbnail
} from 'native-base';

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    name: 'Amy Farha',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    school_name: 'Vishaka College Colombo',
                    address:'18A 1st lane Panadura',
                    present: false
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    school_name: 'Ananda College Colombo',
                    address:'18A 1st lane Moratuwa',
                    present: true
                },
                {
                    name: 'Amy Farha',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    school_name: 'Vishaka College Colombo',
                    address:'18A 1st lane Panadura',
                    present: true
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    school_name: 'Ananda College Colombo',
                    address:'18A 1st lane Moratuwa',
                    present: true
                }
            ],


        }
    }

    markRegister = (i, value) => {

        let a = [[2, 3, 4], [5,6 ,6]]
        let b = [...a.map(b => b)]
        let list = this.state.list;
        list[i].present = value;
        this.setState({
                list
        })
        // this.setState({
        //     ['list']: this.state.list.map( (item, index) => {
        //         if(index == i){
        //             item.present = value
        //             return item
        //         }else{
        //             return item
        //         }
        //     })
        // })

        /*this.setState({
            ['list']: this.state.list.map( (item, index) => index == i ? item.present = value : item)
        });*/


        // this.setState(prevState => ({
        //     list: [
        //         list[i].present = value
        //     ]
        // }));

        //alert(JSON.stringify(this.state.list))
    }

    render() {
        return (
            <Container>
                <Content>
                    {this.state.list.map((l, i) => (
                        <ListItem avatar key={i}>
                            <Left>
                                <Thumbnail source={{uri: l.avatar_url}}/>
                            </Left>
                            <Body>
                            <Text>{l.name}</Text>
                            <Text note>{l.school_name}</Text>
                            <Text note>{l.address}</Text>
                            </Body>
                            <Right>
                                <Switch value={l.present}
                                        onValueChange={(value) => this.markRegister(i, value)}
                                />
                            </Right>
                        </ListItem>
                    ))
                    }

                </Content>
            </Container>
        )
    }

}
