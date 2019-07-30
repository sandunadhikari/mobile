import React, {Component} from 'react';
import {
    StyleSheet,
    ActivityIndicatorIOS,
    AsyncStorage,
    Alert, ActivityIndicator, View
} from 'react-native';
import {Container, Header, Title, Content, Input, Thumbnail, Button, Left, Right, Body, Icon, Text} from 'native-base';
//import axios from 'axios'
import {StackActions, NavigationActions} from 'react-navigation';
import ValidationRules from './validation/validationRules';
import db from './db';

class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            type: 'Login',
            action: 'Login',
            actionMode: 'Dont\' have an account, Register?',
            hasEmailError: false,
            hasPasswordError: false,
            existError: false,
            loading: false,
            form: {
                email: {
                    value: "",
                    valid: null,
                    type: "textinput",
                    rules: {
                        isRequired: true,
                        isEmail: true
                    }
                },
                password: {
                    value: "",
                    valid: null,
                    type: "textinput",
                    rules: {
                        isRequired: true,
                        minLength: 6
                    }
                },
                confirmPassword: {
                    value: "",
                    valid: null,
                    type: "textinput",
                    rules: {
                        confirmPass: "password"
                    }
                }
            }
        }
        //check already login user
        //this.validAuthen()

    }

    async componentWillMount(){
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken != null) {

            AsyncStorage.multiGet(["userID", "role"]).then(response => {
                // console.log(response[0][0]) // Key1
                // console.log(response[0][1]) // Value1
                // console.log(response[1][0]) // Key2
                // console.log(response[1][1]) // Value2

                if (response[1][1] == "admin") {
                    this.goAdminScreen();
                } else if (response[1][1] == "parent") {
                    this.goParentScreen();
                } else if (response[1][1] == "driver") {
                    this.goDriverScreen();
                }
            })



        }

    }

    goAdminScreen() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Admin'})],
        });
        this.props.navigation.dispatch(resetAction);
    }

    goParentScreen() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Parent'})],
        });
        this.props.navigation.dispatch(resetAction);
    }

    goDriverScreen() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Driver'})],
        });
        this.props.navigation.dispatch(resetAction);
    }

    //UpdateInput
    UpdateInput = (name, value) => {
        if (name == "email") {
            this.setState({
                hasEmailError: false,
            })
        } else if (name == "password") {
            this.setState({
                hasPasswordError: false,
            })
        }

        let formCopy = this.state.form;
        formCopy[name].value = value;

        let rules = formCopy[name].rules;

        let valid = ValidationRules(value, rules, formCopy);
        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })

    }

    confirmPassword = () => (
        this.state.type != 'Login' ?
            <Input
                autoCapitalize={'none'}
                autoCorrect={false}
                style={this.state.form.confirmPassword.valid === false ? styles.inputError : styles.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                onChangeText={value => this.UpdateInput("confirmPassword", value)}
            />
            : null
    )
    formHasErrors = () => (
        this.state.hasEmailError || this.state.hasPasswordError ?

            <Text style={styles.errorLabel}>This field cannot be empty</Text>

            : null
    )
    emailHasErrors = () => (
        this.state.form.email.valid === false ?

            <Text style={styles.errorLabel}>Please enter valid email</Text>

            : null
    )
    passwordHasErrors = () => (
        this.state.form.password.valid === false ?

            <Text style={styles.errorLabel}>Password field must be at least 6 characters</Text>

            : null
    )
    confirmpasswordHasErrors = () => (
        this.state.form.confirmPassword.valid === false ?

            <Text style={styles.errorLabel}>The specified password do not match</Text>

            : null
    )
    userNotFoundErrors = () => (
        this.state.existError ?

            <Text style={styles.errorLabel}>User Not Found.Please Register</Text>


            : null
    )
    Loading = () => (
        this.state.loading ?
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size={'large'}/>
            </View>
            : null
    )

    async SubmitUser() {

        this.setState({loading: true});

        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;
        for (let key in formCopy) {

            if (this.state.type === 'Login') {

                if (key !== 'confirmPassword') {
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value;

                }

            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;

            }
        }
        if (isFormValid) {
            //Login part
            if (this.state.type === "Login") {
                const data = {username: formToSubmit.email, password: formToSubmit.password}
                this.SignIN(data);


            } else {
                //Register part
                const data = {username: formToSubmit.email, password: formToSubmit.password}
                this.SignUp(data);

            }
        } else {
            this.setState({
                hasEmailError: true,
                hasPasswordError: true,
                loading: false,

            })
        }
    }

    SignUp = (data) => {

        let scope = this;
        this.setState({
            loading: false,
            existError: false,

        });
        try {
            db.auth().createUserWithEmailAndPassword(data.username, data.password)
                .then(function (firebaseUser) {
                    scope.changeFormType();
                })
                .catch(function (error) {

                });

        } catch (error) {
            console.log(error.toString())
        }

    }
    SignIN = (data) => {
        let scope = this;

        try {
            db.auth().signInWithEmailAndPassword(data.username, data.password)
                .then(async firebaseUser => {
                    await AsyncStorage.setItem("token", firebaseUser.user.refreshToken);
                    let userRolePath = "user/" + firebaseUser.user.uid + "/userRole";
                    db.database().ref(userRolePath).on('value', async (snapshot) => {
                        console.log('1');

                        AsyncStorage.multiSet([['userID', firebaseUser.user.uid], ['role', snapshot.val().role]], () => {

                            //await AsyncStorage.setItem('role', snapshot.val().role);
                            console.log('2');
                            if (firebaseUser.user.refreshToken != null) {
                                if (snapshot.val().role == "admin") {
                                    scope.goAdminScreen();
                                } else if (snapshot.val().role == "parent") {
                                    scope.goParentScreen();
                                } else if (snapshot.val().role == "driver") {
                                    scope.goDriverScreen();
                                }
                            }

                        })


                    })

                })
                .catch(function (error) {
                    if (error != null) {
                        scope.setState({
                            existError: true,
                            loading: false

                        });
                        scope.changeFormType();
                    }


                });

        } catch (error) {
            console.log(error.toString())
        }

    }

    changeFormType = () => {
        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'Register' : 'Login',
            actionMode: type === 'Login' ? 'Not Registered Login' : 'Dont\' have an account, Register?',
        })
    }

    render() {
        return (
            <Container>
                <Content style={styles.container}>
                    <View style={{marginTop:100}}>
                        <Text style={{color:'#FEAB05',fontSize: 50,textAlign: 'center',marginBottom:15}}>Safe Ride</Text>
                        <Thumbnail
                            source={require('./imgs/schoolbus11.png')}
                            resizeMode={'center'}
                            style={styles.banner}
                        />
                        <Input
                            type={this.state.form.email.type}
                            value={this.state.form.email.value}
                            onChangeText={value => this.UpdateInput("email", value)}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            style={this.state.form.email.valid === false ? styles.inputError : styles.input}
                            placeholder="You@gmail.com"
                        />
                        {this.emailHasErrors()}
                        {
                            this.state.form.email.valid === null ? this.formHasErrors() : null
                        }

                        <Input
                            type={this.state.form.password.type}
                            value={this.state.form.password.value}
                            onChangeText={value => this.UpdateInput("password", value)}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            style={this.state.form.password.valid === false ? styles.inputError : styles.input}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                        {this.passwordHasErrors()}
                        {
                            this.state.form.password.valid === null ? this.formHasErrors() : null
                        }
                        {this.confirmPassword()}
                        {this.confirmpasswordHasErrors()}
                        {this.userNotFoundErrors()}

                        <Button
                            onPress={this.SubmitUser.bind(this)}
                            style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>
                                {this.state.action}
                            </Text>
                        </Button>

                        <Button transparent
                                onPress={() => this.changeFormType()}
                                style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>
                                {this.state.actionMode}
                            </Text>
                        </Button>
                        {this.Loading()}
                    </View>
                </Content>
            </Container>

        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#040202',
    },
    banner: {
        height: 90,
        width: '100%'
    },
    input: {
        height: 50,
        width: '100%',
        marginTop: 10,
        padding: 4,
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 1,
        color:'#FFF',
        borderColor: '#FED60C'
    },
    inputError: {
        height: 50,
        width: '100%',
        marginTop: 10,
        padding: 4,
        borderRadius: 5,
        fontSize: 18,
        borderWidth: 1,
        color:'#FFF',
        borderColor: '#B30202'
    },
    loginButton: {
        height: 50,
        backgroundColor: '#FEAB05',
        alignSelf: 'stretch',
        marginTop: 40,
        borderRadius: 10,
        justifyContent: 'center'
    },
    registerButton: {
        height: 50,
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    loginButtonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    registerButtonText: {
        fontSize: 17,
        color: '#FFF',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 30,
        marginBottom: 40
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    success: {
        color: 'green',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    },
    errorContain: {
        marginBottom: 20,
        marginTop: 10
    },
    errorLabel: {
        color: '#B30202',
        fontFamily: 'Roboto-Black',
    },
    spinnerContainer: {
        flex: -1,
        marginTop: 12,
        marginBottom: 12
    }
});

export default LoginScreen;
