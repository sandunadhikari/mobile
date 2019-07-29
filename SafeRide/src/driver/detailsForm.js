import React ,{Component} from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button,Item ,Icon,Input,H1,Title,Label,Fab} from 'native-base';
import userlo from '../imgs/school.png';
import { Col, Row, Grid } from 'react-native-easy-grid';
//import  {db} from '../db';


let addItem = item => {
    db.ref('/drivers').push(
        item
    );
};

export default  class detailsForm extends  Component<>{
    constructor(props){
        super(props)
        this.state = {
            from:{
                nic:'',
                f_name:'',
                l_name:'',
                address_1:'',
                mobile_1:'',
                mobile_2:'',
                email:''
            }
        };

    }





    handleSubmit = () => {
        addItem(this.state.from);

    };

    updateInput =(name,value)=>{

        let fromCopy=this.state.from;
        fromCopy[name]=value;
        this.setState({
            from:fromCopy
        })
    }

    render(){

        return(

            <Container>

                <Header>
                    <Left>

                        <Button transparent onPress={() => {this.props.navigation.goBack()}}>
                            <Icon name='arrow-back' />
                        </Button>

                    </Left>
                    <Body>
                    <Title>Register Drivers</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>

                    <H1 style={styles.H1}>   Driver Details</H1>

                    <View style={{backgroundColor:'yellow',height:180,alignItems:'center'}}>

                        <Thumbnail large source={userlo} style={{height:150,width:150,marginTop:10}}/>

                        <Text> Browse</Text>



                    </View>


                    <Item style={styles.TextIN} regular>
                        <Input placeholder='NIC Number'

                               onChangeText={value=>this.updateInput("nic",value)}
                        />
                    </Item>

                    <Grid>

                        <Row>

                            <Col>

                                <Item style={styles.TextIN} regular>
                                    <Input placeholder='First Name'
                                           onChangeText={value=>this.updateInput("f_name",value)}
                                    />
                                </Item>

                            </Col>

                            <Col>



                                <Item style={styles.TextIN} regular>
                                    <Input placeholder='Last Name'
                                           onChangeText={value=>this.updateInput("l_name",value)}

                                    />
                                </Item>



                            </Col>


                        </Row>


                    </Grid>

                    <Item style={styles.TextIN} regular>
                        <Input placeholder='Address Line 1'
                               onChangeText={value=>this.updateInput("address_1",value)}
                        />
                    </Item>

                    <Grid>

                        <Row>

                            <Col>

                                <Item style={styles.TextIN} regular>
                                    <Input placeholder='Mobile Number 1'
                                           onChangeText={value=>this.updateInput("mobile_1",value)}/>
                                </Item>

                            </Col>

                            <Col>

                                <Item style={styles.TextIN} regular>
                                    <Input placeholder='Mobile Number 2'

                                           onChangeText={value=>this.updateInput("mobile_2",value)}/>
                                </Item>

                            </Col>

                        </Row>

                    </Grid>


                    <Item style={styles.TextIN} regular>
                        <Input placeholder='Email'
                               onChangeText={value=>this.updateInput("email",value)}/>
                    </Item>


                    <Button block style={{marginLeft:10,marginRight:10,backgroundColor:'#3971cc',marginBottom:20,marginTop:20}} onPress={this.handleSubmit}>
                        <Text style={{color:'white'}}>Save</Text>
                    </Button>

                </Content>

            </Container>


        );

    }

}

const styles = StyleSheet.create({

    H1:{
        fontSize:20,
        padding:10,
        backgroundColor:'#dedfe0',

    },

    BTN:{

        margin:15,
        padding:8,

    },

    H12:{
        fontSize:20,
        marginTop:10,
        padding:10,
        backgroundColor:'#dedfe0',

    },
    TextIN:{

        marginLeft:15,
        marginRight:15,
        marginTop:20,
    },
});
