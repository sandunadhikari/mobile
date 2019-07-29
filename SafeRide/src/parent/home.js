import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,

} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import exampleIcon from '../imgs/taxi.png';
import {
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Content,
    Thumbnail,
    Container,
    Card,
    Fab,
    CardItem,
    Item, Input, List
} from "native-base";
//import io from "socket.io-client";
MapboxGL.setAccessToken('pk.eyJ1Ijoia2FzdW5kaWFzIiwiYSI6ImNqdGpuM284bjAwbG40YXIwaTU3dWlsNHEifQ.mdmo2TRq6SbnlTIV9gBbwg');
import io from "socket.io-client";
import { YellowBox } from 'react-native';

export default class home extends Component {
    constructor() {
        super();
        this.state = {
            userID:[],
            route:
                {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "message": "Foo",
                                "iconSize": [60, 60]
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": []
                            }
                        },
                    ]
                },
        }

        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.socket = io("http://192.168.1.36:4000");
        this.socket.on('dataFromServer', this.onReceivedMessage);

        console.ignoredYellowBox = ['Remote debugger'];

        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ]);

    }

    // componentDidMount() {
    //     this.socket = io("http://192.168.1.192:3000");
    //     this.socket.emit("chat message","this.state.chatMessage");
    //     /*this.socket.on("chat message", msg => {
    //         this.setState({
    //             chatMessages: [...this.state.chatMessages, msg]
    //         });
    //
    //     });*/
    // }
//
    onReceivedMessage=(data)=> {

        let route=this.state.route;
        route.features[0].geometry.coordinates=data;
        this.setState({
            route
        })
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
                    <Title>View Vehicle</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <MapboxGL.MapView
                        styleURL={MapboxGL.StyleURL.Light}
                        zoomLevel={15}
                        maxZoomLevel={15}
                        minZoomLevel={12}
                        centerCoordinate={[79.85448710855553, 6.906677343955266]}
                        style={styles.container}>
                        <MapboxGL.ShapeSource id='line2' shape={this.state.route}>
                            <MapboxGL.SymbolLayer id="symbolLocationSymbols" minZoomLevel={1} style={stylesMap.icon}/>
                        </MapboxGL.ShapeSource>

                    </MapboxGL.MapView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const stylesMap = MapboxGL.StyleSheet.create({
    icon: {
        iconImage: exampleIcon,
        iconAllowOverlap: true,
        iconSize: 0.5,
    },
});
