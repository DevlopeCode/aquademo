import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.conatiner}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  conatiner: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
