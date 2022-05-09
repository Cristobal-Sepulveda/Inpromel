import { Image, View, StyleSheet } from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <>
      <View style={styles.splashBackground}>
        <Image
          style={styles.imagen}
          source={require('../../assets/logoInpromel.png')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  splashBackground:{
    color: '#ffffff'
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;
