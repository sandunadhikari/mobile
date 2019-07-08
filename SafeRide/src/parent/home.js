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

MapboxGL.setAccessToken('pk.eyJ1Ijoia2FzdW5kaWFzIiwiYSI6ImNqdGpuM284bjAwbG40YXIwaTU3dWlsNHEifQ.mdmo2TRq6SbnlTIV9gBbwg');

export default class home extends Component {
    constructor() {
        super();
        this.state = {
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
                                "coordinates": [
                                    79.8542782,
                                    6.9065841
                                ]
                            }
                        },
                        /*{
                            "type": "Feature",
                            "properties": {
                                "message": "Bar",
                                "iconSize": [50, 50]
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    79.85936441904335,
                                    6.901938916302072
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "message": "Baz",
                                "iconSize": [40, 40]
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    79.85458440586649,
                                    6.906705236993872
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "message": "Baz",
                                "iconSize": [40, 40]
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    79.86452583449125,
                                    6.917351013519919
                                ]
                            }
                        },
                        {
                            "type": "Feature",
                            "properties": {
                                "message": "Baz",
                                "iconSize": [40, 40]
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    79.84968536743713,
                                    6.934133591387848
                                ]
                            }
                        }*/
                    ]
                },
        }
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#FEC301'}}>
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
