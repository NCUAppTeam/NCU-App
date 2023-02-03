import { Dimensions, PlatForm } from 'react-native';

function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}
function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}
function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
  // This has to be iOS
    PlatForm.OS === 'ios'

        // Check either, iPhone X or XR
        && (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export default {
  isIphoneX,
  isIPhoneXSize,
  isIPhoneXrSize,
};
