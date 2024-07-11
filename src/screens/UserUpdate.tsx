/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */

import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ms, vs} from 'react-native-size-matters';
import {deleteUserByUid, fetchUsers, updateUserStatus} from '../utils/database';

const UserUpdate = () => {
  const [userlist, setuserlist] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    fetchUsers((r: any) => {
      console.log(r, 'updated');

      setuserlist(r);
    });
  }, [loading]);

  return (
    <View style={styles.container}>
      <FlatList
        data={userlist}
        ListHeaderComponent={() => (
          <View style={styles.headercontain}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.title}>Status</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{height: vs(10)}} />}
        renderItem={({
          item,
          index,
        }: {
          item: {
            email:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
            uid: any;
            status: number;
          };
          index: number;
        }) => {
          return (
            <View style={styles.itemcontainer}>
              <Text style={styles.itemtitle}>{item?.email}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setloading(true);
                    deleteUserByUid(item.uid, () => setloading(false));
                  }}>
                  <Text style={styles.delete}>X</Text>
                </TouchableOpacity>

                <Switch
                  onChange={() => {
                    setloading(true);
                    updateUserStatus(item.uid, !item?.status, () =>
                      setloading(false),
                    );
                  }}
                  value={item?.status == 0 ? false : true}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default UserUpdate;

const styles = StyleSheet.create({
  container: {flex: 1},
  headercontain: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: vs(25),
    marginVertical: vs(10),
  },
  title: {color: '#000000', fontWeight: 'bold', fontSize: ms(15)},
  itemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: vs(10),
    alignItems: 'center',
  },
  itemtitle: {
    color: '#000000',
    fontWeight: 'condensedBold',
    fontSize: ms(15),
  },
  delete: {
    color: 'red',
    fontWeight: 'condensedBold',
    fontSize: ms(15),
    paddingHorizontal: 20,
  },
});
