import React from 'react';
import {connect} from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {unsetUserState} from '../../modules/user';

const Drawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          props.unsetUserState();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default connect(null, {
  unsetUserState,
})(Drawer);
