import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Thumbnail,
    Left,
    Body,
    Right,
    Button,
    Item,
    Icon,
    Input,
    H1,
    Title,
    Label,
    Picker
} from 'native-base';
import userlo from '../imgs/school.png';
import {Col, Row, Grid} from 'react-native-easy-grid';
import PhotoUpload from 'react-native-photo-upload'
import db from '../db';

export default class childData extends Component<> {
    constructor(props) {
        super(props)
        this.state = {
            from: {
                f_name: '',
                l_name: '',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                school_name: '',
                address_1: '',
                gender: 'key0',
                present: false
            }
        };

    }

    handleSubmit = () => {
        this.addItem(this.state.from);

    };
    onValueChange(value: string) {
        if(value ==='key0'){
            this.setState({
                from: {
                    ...this.state.from,
                    gender: value,
                }
            });
        }else if(value ==='key1'){
            this.setState({
                from: {
                    ...this.state.from,
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    gender: value,
                }
            });
        }

    }

    updateInput = (name, value) => {

        let fromCopy = this.state.from;
        fromCopy[name] = value;
        this.setState({
            from: fromCopy
        })
    }
    addItem = (item) => {
        db.database().ref('/childDetails').push(
            item
        ).then(()=>{
            this.props.navigation.goBack();
        })

    };



    render() {

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Add Child</Title>
                    </Body>
                    <Right/>
                </Header>

                <Content>
                    <H1 style={styles.H1}> Child Details</H1>
                    <View style={{backgroundColor: 'yellow', height: 180, alignItems: 'center'}}>
                        <PhotoUpload
                            onPhotoSelect={avatar => {
                                if (avatar) {
                                    console.log('Image base64 string: ', avatar)
                                }
                            }}
                        >
                            <Image
                                style={{
                                    marginTop: 10,
                                    width: 150,
                                    height: 150,
                                    borderRadius: 20,
                                    borderWidth: 0.5,
                                    borderColor: '#2d2d2d',
                                }}
                                resizeMode='cover'
                                source={{
                                    uri: 'http://www.clker.com/cliparts/M/I/9/z/q/H/male-upload-md.png'
                                }}
                            />
                        </PhotoUpload>
                        <Text> Browse</Text>
                    </View>
                    <Grid>
                        <Row>
                            <Col>
                                <Item style={styles.TextIN} regular>
                                    <Input placeholder='First Name'
                                           onChangeText={value => this.updateInput("f_name", value)}
                                    />
                                </Item>
                            </Col>
                            <Col>
                                <Item style={styles.TextIN} regular>
                                    <Input placeholder='Last Name'
                                           onChangeText={value => this.updateInput("l_name", value)}

                                    />
                                </Item>
                            </Col>

                        </Row>
                    </Grid>

                    <Item style={styles.TextIN} regular>
                        <Input placeholder='Address'
                               onChangeText={value => this.updateInput("address_1", value)}
                        />
                    </Item>

                    <View style={{flex: 2, flexDirection: 'row', width: '100%',borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da',marginLeft: 15, marginRight: 15, marginTop: 20}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={{margin: 12, fontSize: 18}}>Gender</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column'}}>

                            <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>

                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down"/>}
                                    style={{width: 100}}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{color: "#bfc6ea"}}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.from.gender}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Item label="Male" value="key0"/>
                                    <Item label="Female" value="key1"/>

                                </Picker>

                            </View>

                        </View>
                    </View>

                    <Item style={styles.TextIN} regular>
                        <Input placeholder='School'
                               onChangeText={value => this.updateInput("school_name", value)}
                        />
                    </Item>

                    <Button block style={{
                        marginLeft: 10,
                        marginRight: 10,
                        backgroundColor: '#3971cc',
                        marginBottom: 20,
                        marginTop: 20
                    }} onPress={this.handleSubmit}>
                        <Text style={{color: 'white'}}>Save</Text>
                    </Button>

                </Content>

            </Container>


        );

    }

}

const styles = StyleSheet.create({

    H1: {
        fontSize: 20,
        padding: 10,
        backgroundColor: '#dedfe0',

    },

    BTN: {

        margin: 15,
        padding: 8,

    },

    H12: {
        fontSize: 20,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#dedfe0',

    },
    TextIN: {

        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
    },
});
