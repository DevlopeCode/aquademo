/* eslint-disable @typescript-eslint/no-unused-vars */
import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  fetchLoggedInUser,
  setLoginUserDetails,
  updateloginStatus,
} from '../utils/database';
import {navigate} from '../navigation/navigationServices';
import {SvgFromXml} from 'react-native-svg';
import {Images} from '../utils/images';
import {ms} from 'react-native-size-matters';

const Profile = () => {
  const [userdetails, setUserdetails] = useState<any>();
  useEffect(() => {
    fetchLoggedInUser((r: any) => {
      setUserdetails(r);
    });
  }, []);

  return (
    <View style={styles.container}>
      {userdetails && (
        <>
          <Text style={styles.title}>Name {userdetails?.email}</Text>
          <Text style={styles.title}> UID {userdetails?.uid}</Text>
        </>
      )}

      <Button
        title="Logout"
        onPress={() =>
          updateloginStatus(userdetails?.uid, 0, () => navigate('signin'))
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {
    color: '#000000',
    fontWeight: 'condensedBold',
    fontSize: ms(15),
  },
});
