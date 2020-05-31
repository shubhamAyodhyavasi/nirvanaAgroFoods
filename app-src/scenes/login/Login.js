import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Image} from 'react-native';
import Button from '../../components/Button';
import {
  checkMobile,
  sendOTP,
  getLoginUser,
  saveUser,
} from '../../modules/service';
import {colors, images} from '../../styles';
import Loader from '../../components/Loader';
import {validationFun} from './utils';
import TextField from '../../components/InputTypes';
import {setUerState} from '../../modules/user';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flexGrow: 1,
    height: 150,
    width: 150,
  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
  },
  formField: {
    flexGrow: 1,
    padding: 20,
    marginTop: 50,
  },
  textField: {
    height: 40,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 20,
  },
  bottomCityImage: {
    position: 'absolute',
    bottom: 0,
    left: 12,
  },
  isRegistredform: {
    marginTop: 20,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1,
      mobileNo: '',
      isRegistred: true,
      otpNoRes: '',
      mobileError: 'Mobile no. should be 10 digits',
      hassMobileError: false,
      otpError: 'Invalid OTP',
      hassOtpError: false,
      otpNo: '',
      isLoading: false,
      numberReg: {
        value: '',
        hasError: false,
        errorMessage: '',
        type: ['phoneValidation'],
      },
      nameReg: {
        value: '',
        hasError: false,
        errorMessage: '',
        type: ['requiredValidation'],
      },
      emailReg: {
        value: '',
        hasError: false,
        errorMessage: '',
        type: ['emailValidation'],
      },
    };
    this._onSubmitRegForm = this._onSubmitRegForm.bind(this);
    this._saveUserInfo = this._saveUserInfo.bind(this);
  }
  _onMobileNoChange(no) {
    this.setState({mobileNo: no, hassMobileError: false});
  }
  async _checkLogin() {
    const {mobileNo} = this.state;
    if (mobileNo.length !== 10) {
      this.setState({hassMobileError: true});
    } else {
      this.setState({hassMobileError: false, isLoading: true});
      const getCheckResponse = await checkMobile(mobileNo);
      if (getCheckResponse) {
        this.setState({
          activeIndex: 2,
        });
        const getOtpRes = await sendOTP(mobileNo);
        const {otp} = getOtpRes;
        this.setState({
          otpNoRes: otp,
          isLoading: false,
        });
      } else {
        this.setState({
          activeIndex: 3,
          isLoading: false,
        });
      }
    }
  }
  _onOtpNoChange(no) {
    {
      this.setState({otpNo: no, hassOtpError: false});
    }
  }
  async _checkOTPLogin() {
    const {otpNo, mobileNo, otpNoRes} = this.state;
    if (otpNo.length != 4) {
      this.setState({hassOtpError: true});
    } else {
      this.setState({hassOtpError: false, isLoading: true});
      if (otpNo == otpNoRes) {
        this.setState({hassOtpError: false});
        const getUser = await getLoginUser(mobileNo);
        this.props.setUerState(getUser.user[0]);
        this.props.navigation.navigate('App');
      } else {
        this.setState({hassOtpError: true, isLoading: false});
      }
    }
  }

  _onFormChange(name, value, type) {
    const newValue = {
      value,
      hasError: false,
      errorMessage: '',
      type,
    };
    this.setState({[name]: newValue});
  }
  onValidationFun(name, stateName) {
    const fieldState = this.state[stateName];
    const validInfo = validationFun(fieldState, name);
    this.setState({[stateName]: validInfo});
  }
  async _saveUserInfo() {
    setTimeout(async () => {
      const {numberReg, emailReg, nameReg} = this.state;
      if (!numberReg.hasError && !emailReg.hasError && !nameReg.hasError) {
        const data = {
          mobile: numberReg.value,
          email: emailReg.value,
          name: nameReg.value,
          type: 'User',
        };
        const res = await saveUser(data);
        if (res.action === 'success') {
          this.setState({
            activeIndex: 1,
          });
        } else {
          alert('Somthing wrong please try again.');
        }
      }
    }),
      2000;
  }
  _onSubmitRegForm() {
    this.onValidationFun('Phone', 'numberReg');
    this.onValidationFun('Email', 'emailReg');
    this.onValidationFun('Full Name', 'nameReg');
    this._saveUserInfo();
  }

  render() {
    const {
      hassMobileError,
      mobileError,
      mobileNo,
      activeIndex,
      numberReg,
      emailReg,
      nameReg,
      isLoading,
      hassOtpError,
      otpError,
    } = this.state;
    return isLoading ? (
      <Loader />
    ) : activeIndex !== 3 ? (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={images.logo} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.heading}>Nirvana Agro Foods</Text>
        </View>
        {activeIndex === 1 && (
          <View style={styles.formField}>
            <TextField
              label="Mobile Number "
              placeholder="Enter Your Mobile Number"
              keyboardType="numeric"
              errorMessage={false}
              maxLength={10}
              name="phoneNumber"
              errorMessage={mobileError}
              hasError={hassMobileError}
              onChange={(e) => {
                this._onMobileNoChange(e.nativeEvent.text);
              }}
            />
            <View style={styles.button}>
              <Button
                onPress={() => {
                  this._checkLogin();
                }}
                title="CONTINUE"
                color={colors.white}
                backgroundColor={colors.yellow}
              />
            </View>
          </View>
        )}
        {activeIndex === 2 && (
          <View style={styles.formField}>
            <TextField
              label="Enter OTP Number"
              placeholder="Enter Your 4 digit OTP"
              keyboardType="numeric"
              errorMessage={false}
              maxLength={4}
              name="otp"
              errorMessage={otpError}
              hasError={hassOtpError}
              onChange={(e) => {
                this._onOtpNoChange(e.nativeEvent.text);
              }}
            />
            <View style={styles.button}>
              <Button
                onPress={() => {
                  this._checkOTPLogin();
                }}
                title="LOGIN"
                color={colors.white}
                backgroundColor={colors.yellow}
              />
            </View>
          </View>
        )}
        <View style={styles.bottomCityImage} pointerEvents={'none'}>
          <Image source={images.back} />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={images.logo} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.heading}>Nirvana Agro Foods</Text>
        </View>
        <View style={styles.isRegistredform}>
          <TextField
            label="Mobile Number *"
            placeholder="Enter Your Mobile Number"
            keyboardType="numeric"
            errorMessage={false}
            maxLength={10}
            name="phoneNumber"
            defaultValue={mobileNo}
            errorMessage={numberReg.errorMessage}
            hasError={numberReg.hasError}
            onChange={(e) => {
              this._onFormChange('numberReg', e.nativeEvent.text, [
                'phoneValidation',
              ]);
            }}
          />
          <TextField
            label="Full Name *"
            placeholder="Enter Your Full Name"
            keyboardType="text"
            errorMessage={false}
            maxLength={30}
            errorMessage={nameReg.errorMessage}
            hasError={nameReg.hasError}
            onChange={(e) => {
              this._onFormChange('nameReg', e.nativeEvent.text, [
                'requiredValidation',
              ]);
            }}
          />
          <TextField
            label="Email *"
            placeholder="Enter Your Mobile Number"
            keyboardType="email"
            errorMessage={false}
            maxLength={30}
            errorMessage={emailReg.errorMessage}
            hasError={emailReg.hasError}
            onChange={(e) => {
              this._onFormChange('emailReg', e.nativeEvent.text, [
                'emailValidation',
              ]);
            }}
          />
          <View style={styles.button}>
            <Button
              onPress={() => {
                this._onSubmitRegForm();
              }}
              title="CONTINUE"
              color={colors.white}
              backgroundColor={colors.yellow}
            />
          </View>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
};

Login.defaultProps = {
  navigation: {},
};

const _mapStateToProp = (state) => ({
  user: state.user,
});

export default connect(_mapStateToProp, {
  setUerState,
})(Login);
