// import { Asset } from 'expo-asset'

export const images = {
  logo_sm: require('../assets/images/logo.png'),
  logo_lg: require('../assets/images/logo.png'),
  logo: require('../assets/images/logo.png'),
  frut: require('../assets/images/frut.jpg'),
  grapes: require('../assets/images/grapes.jpg'),
  combo: require('../assets/images/combo.png'),
  back: require('../assets/images/back.png'),
  arrow: require('../assets/images/arrow.png'),
  //loader: require('../assets/images/lodr.gif'),
  loader: require('../assets/images/loader.gif'),
};

// image preloading
var imgs = [];
Object.keys(images).forEach((key) => imgs.push(images[key]));
// export const imageAssets = imgs.map(img => Asset.fromModule(img).downloadAsync())
