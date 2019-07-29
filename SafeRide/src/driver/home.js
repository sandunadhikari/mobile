import React, {Component} from 'react';
import {View, FlatList, ScrollView, PermissionsAndroid, Platform, AsyncStorage} from 'react-native';
//import {List, ListItem} from 'react-native-elements';
import {
    Container,
    Header,
    Content,
    Fab,
    ListItem,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Switch,
    Thumbnail, Button, Title
} from 'native-base';
import io from "socket.io-client";
import {YellowBox} from 'react-native';
import db from '../db';
let itemsRef = db.database().ref('/childDetails');
export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLongitude: 0,//Initial Longitude
            currentLatitude: 0,//Initial Latitude
            userID:null,
            list: [

            ],


        }
        console.ignoredYellowBox = ['Remote debugger'];

        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ]);

    }

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            // let items = [];
            // Object.keys(data).forEach(k => console.log(k));
            let list = Object.keys(data).map(key => ({...data[key], ['id']: key}));
            //alert(JSON.stringify(list));
            this.setState({list});
        });

        var that = this;
        this.socket = io("http://192.168.1.36:4000");
        //this.socket.emit("reciveCoordinate",[this.state.currentLongitude,this.state.currentLatitude]);
        //Checking for the permission just after component loaded
        if (Platform.OS === 'ios') {
            this.callLocation(that);
        } else {
            const requestLocationPermission = async () => {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        that.callLocation(that);
                    } else {
                        //alert("Permission Denied");
                    }
                } catch (err) {
                    alert("err", err);
                    console.warn(err)
                }
            }

            requestLocationPermission();
        }
    }
//get location
    callLocation(that) {
        //alert("callLocation Called");
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({currentLongitude: currentLongitude});
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({currentLatitude: currentLatitude});
                //Setting state Latitude to re re-render the Longitude Text
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        that.watchID = navigator.geolocation.watchPosition((position) => {
                //Will give you the location on location change
                //console.log(position);
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({currentLongitude: currentLongitude});
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({currentLatitude: currentLatitude});
                //Setting state Latitude to re re-render the Longitude Text

                AsyncStorage.multiGet(["userID", "role"]).then(response => {
                    that.setState({userID:response[0][1]});

                });

                this.socket.emit("reciveCoordinate", [this.state.currentLongitude, this.state.currentLatitude,this.state.userID]);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, distanceFilter: 0});
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    markRegister = (i, value) => {

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
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Child list</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    {this.state.list.map((l, i) => (
                        <ListItem avatar key={i}>
                            <Left>
                                <Thumbnail source={{uri: l.avatar_url}}/>
                            </Left>
                            <Body>
                            <Text>{l.f_name} {l.l_name}</Text>
                            <Text note>{l.school_name}</Text>
                            <Text note>{l.address_1}</Text>
                            </Body>
                            <Right>
                                <Switch value={l.present}
                                        onValueChange={(value) => this.markRegister(i, value)}
                                />
                            </Right>
                        </ListItem>
                    ))
                    }
                    {/*<Text>{this.state.currentLongitude}</Text>*/}
                    {/*<Text>{this.state.currentLatitude}</Text>*/}
                    {/*<Text>{this.state.userID}</Text>*/}
                    <Button block style={{marginLeft:10,marginRight:10,backgroundColor:'#3971cc',marginBottom:20,marginTop:20}} onPress={this.handleSubmit}>
                        <Text style={{color:'white'}}>Save</Text>
                    </Button>

                </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{backgroundColor: '#5067FF'}}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('ChildDetails')}>
                    <Icon name="add"/>
                </Fab>
            </Container>

        )
    }

}
