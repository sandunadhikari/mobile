import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button,Item ,Icon,Input,H1,Title} from 'native-base';
import userlo from '../imgs/school.png';
import db from '../db';



export default class profile extends Component<> {

    constructor(props) {
        super(props);
        //this.params = this.props.navigation.state.params;
        this.state={
            f_name:'',
            l_name:'',
            u_name:'',
            email:'',
            city:'',
            address:'',
            mobile:''

        }

    }

    componentDidMount(): void {
        AsyncStorage.multiGet(["userID", "role"]).then(response => {

            let userRolePath = "/driverProfile/" + response[0][1] ;
            let itemsRef = db.database().ref(userRolePath);
            itemsRef.on('value', (snapshot) => {
                let data = snapshot.val();

                //alert(JSON.stringify(data));
                this.setState({
                    f_name:data.f_name,
                    l_name:data.l_name,
                    u_name:data.u_name,
                    email:data.email,
                    city:data.city,
                    address:data.address,
                    mobile:data.mobile
                });
            });
        })

    }

    render() {
        return (

            <Container>

                <Header>
                    <Left>

                        <Button transparent>
                            <Icon name='arrow-back' onPress={() => {this.props.navigation.goBack()}}/>
                        </Button>

                    </Left>
                    <Body>
                    <Title>Profile Settings</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image style={styles.avatar}
                                   source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

                            <Text style={styles.name}>{this.state.f_name}</Text>
                            <Text style={styles.userInfo}>{this.state.email} </Text>
                            <Text style={styles.userInfo}>{this.state.city}</Text>
                        </View>
                    </View>
                </View>

                <Content>

                    <View style={{flex: 1, flexDirection: 'row',marginBottom:5}}>
                        <Icon style={{paddingLeft:10}} active name='person' />
                        <H1 style={styles.H1}>User Details</H1>

                    </View>

                    <List>


                        <ListItem onPress={() => {this.props.navigation.navigate('DriverDetailsName',this.state)}}>

                            <Left>
                                <Text>Name</Text>
                            </Left>
                            <Right >

                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{width: 150 ,textAlign:'right',paddingRight:8}}>{this.state.f_name} {this.state.l_name}</Text>

                                </View>

                            </Right>

                        </ListItem>


                        <ListItem >
                            <Left>
                                <Text>User Name</Text>
                            </Left>
                            <Right >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{width: 150 ,textAlign:'right',paddingRight:8}}>{this.state.u_name}</Text>

                                </View>
                            </Right>
                        </ListItem>


                        <ListItem onPress={() => {this.props.navigation.navigate('UserDetailsEmail')}}>
                            <Left>
                                <Text>Email</Text>
                            </Left>
                            <Right >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{width: 150 ,textAlign:'right',paddingRight:8}}>{this.state.email}</Text>

                                </View>
                            </Right>
                        </ListItem>

                        <View style={{flex: 1, flexDirection: 'row',marginBottom:5,marginTop:15}}>
                            <Icon style={{paddingLeft:10}} active name='home' />
                            <H1 style={styles.H1}>Contact Details</H1>

                        </View>


                        <ListItem >
                            <Left>
                                <Text>Address</Text>
                            </Left>
                            <Right >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{width: 150 ,textAlign:'right',paddingRight:8}}>{this.state.address}</Text>

                                </View>
                            </Right>
                        </ListItem>
                        <ListItem >
                            <Left>
                                <Text>City</Text>
                            </Left>
                            <Right >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{width: 150 ,textAlign:'right',paddingRight:8}}>{this.state.city}</Text>

                                </View>
                            </Right>
                        </ListItem>



                        <ListItem >
                            <Left>
                                <Text>Mobile No</Text>
                            </Left>
                            <Right >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{width: 150 ,textAlign:'right',paddingRight:8}}>{this.state.mobile}</Text>

                                </View>
                            </Right>
                        </ListItem>

                        <View style={{flex: 1, flexDirection: 'row',marginBottom:5,marginTop:15}}>
                            <Icon style={{paddingLeft:10}} active name='lock' />
                            <H1 style={styles.H1}>Security Details</H1>

                        </View>

                        <ListItem >
                            <Left>
                                <Text>Password</Text>
                            </Left>
                            <Right >
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{width: 150 ,textAlign:'right',paddingRight:8}}>**********</Text>

                                </View>
                            </Right>
                        </ListItem>

                    </List>

                </Content>


            </Container>
        );
    }

}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "white",
    },
    headerContent:{
        padding:30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
    },
    name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'600',
    },
    userInfo:{
        fontSize:16,
        color:"#778899",
        fontWeight:'600',
    },
    body:{
        backgroundColor: "#778899",
        height:500,
        alignItems:'center',
    },
    item:{
        flexDirection : 'row',
    },
    infoContent:{
        flex:1,
        alignItems:'flex-start',
        paddingLeft:5
    },
    iconContent:{
        flex:1,
        alignItems:'flex-end',
        paddingRight:5,
    },
    icon:{
        width:30,
        height:30,
        marginTop:20,
    },
    info:{
        fontSize:18,
        marginTop:20,
        color: "#FFFFFF",
    }
    ,
    H1:{
        fontSize:18,
        marginLeft:10,

    }
});

