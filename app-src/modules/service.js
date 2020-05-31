const baseUrl = 'https://f91.in/grocery/api/';
import axios from 'axios';
export const getCategory = async () => {
  return await fetch(baseUrl + '/getcategory')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return false;
    });
};
export const getLocation = async () => {
  return await fetch(baseUrl + '/getLocation')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return false;
    });
};

export const getProduct = async (id) => {
  return await fetch(baseUrl + '/getProductsByCat/' + id)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return false;
    });
};

export const getBanner = async () => {
  return await fetch(baseUrl + '/getShopGallery/')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return false;
    });
};

export const checkMobile = async (no) => {
  let formData = {mobile: no};
  const encodeForm = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };
  return axios
    .post(baseUrl + '/checkMobile', encodeForm(formData), {
      headers: {Accept: 'application/json'},
    })
    .then(function (response) {
      return response.data.exists;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
export const sendOTP = async (no) => {
  let formData = {mobilenumber: no};
  const encodeForm = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };
  return axios
    .post(baseUrl + '/sendOtp', encodeForm(formData), {
      headers: {Accept: 'application/json'},
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
export const getLoginUser = async (no) => {
  let formData = {mobile: no};
  const encodeForm = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };
  return axios
    .post(baseUrl + '/getUser', encodeForm(formData), {
      headers: {Accept: 'application/json'},
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
export const saveUser = async (formData) => {
  const encodeForm = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };
  return axios
    .post(baseUrl + '/Registration', encodeForm(formData), {
      headers: {Accept: 'application/json'},
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
export const getUserAddress = async (id) => {
  let formData = {userId: id};
  const encodeForm = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };
  return axios
    .post(baseUrl + '/getUserAddress', encodeForm(formData), {
      headers: {Accept: 'application/json'},
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export const saveAddress = async (formData) => {
  const encodeForm = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };
  return axios
    .post(baseUrl + '/addUserAddressR', encodeForm(formData), {
      headers: {Accept: 'application/json'},
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
export const placeOrder = async (formData) => {
  const encodeForm = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
      )
      .join('&');
  };
  return axios
    .post(baseUrl + '/saveOrder', encodeForm(formData), {
      headers: {Accept: 'application/json'},
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};
