/* eslint-disable eqeqeq */
/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {fetchUsers} from '../utils/database';
import { LineChart } from 'react-native-chart-kit';
import { Switch } from 'react-native-gesture-handler';
import { ms, vs } from 'react-native-size-matters';

const Home = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [{
      data: [20, 45, 28, 80],
    }],
  };
  const [userlist, setuserlist] = useState([]);
  useEffect(() => {
    fetchUsers((r: any) => {
      setuserlist(r);
    });
  },[]);
  return (
    <ScrollView style={styles.container}>
      <LineChart
      data={data}
      width={Dimensions.get('window').width}
      height={220}
      yAxisLabel="$"
      yAxisSuffix="k"
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
    />
       <FlatList data={userlist}
     ListHeaderComponent={()=><View style={styles.header}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.title}>Status</Text>
     </View>}
     ItemSeparatorComponent={()=><View style={{height:vs(10)}}/>}
     renderItem={({item,index}:{item:any,index:number})=>{
      return<View style={styles.item}>
        <Text style={styles.title}>{item?.email}</Text>
        <Switch  value={item?.status == 0 ? false : true} />
      </View>;
     }}/>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{width:'100%',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:20,height:vs(25),marginVertical:vs(10)},
  title:{color:'#000000',fontWeight:'bold',fontSize:ms(15)},
  item:{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,paddingVertical:vs(10),alignItems:'center'},
});
