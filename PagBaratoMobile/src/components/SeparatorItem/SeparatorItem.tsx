import React from 'react';
import {View} from 'react-native';
import {color} from '../../config/theme.json';

export function SeparatorItem() {
  return (
    <View
      style={{
        height: 1,
        alignSelf: 'center',
        width: '92%',
        backgroundColor: color.baby_gray,
      }}
    />
  );
}
