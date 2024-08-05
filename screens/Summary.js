// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
// import axios from 'axios';

// const SummaryPage = ({route, navigation}) => {
//   const [locDrop, setLocDrop] = useState('');
//   const [pickUpLocation, setPickUpLocation] = useState('');
//   const [nameOfUser, setNameOfUser] = useState('');
//   const [realBikeId, setRealBikeId] = useState('');
//   const {rideData, token} = route.params;

//   const handleRidedata = async () => {
//     try {
//       const dropLocRes = await axios.post(
//         'http://192.168.1.7:3000/api/locations/droplocid',
//         {loc_drop: rideData.loc_drop},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       // const dropLocRes = await axios.post('http://192.168.1.7:3000/api/locations/droplocid', { loc_drop });
//       const dropLoc = dropLocRes.data;
//       // const locRes = await axios.post('http://192.168.1.7:3000/api/locations/pickuplocid', { loc_pick });
//       const locRes = await axios.post(
//         'http://192.168.1.7:3000/api/locations/pickuplocid',
//         {loc_pick: rideData.loc_pick},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       const loc = locRes.data;
//       const userRes = await axios.post(
//         'http://192.168.1.7:3000/api/userid/get-username',
//         {username: rideData.username},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       user = userRes.data;
//       const bikeRes = await axios.post(
//         'http://192.168.1.7:3000/api/bicycles/get-bikeid',
//         {bikeId: rideData.bikeId},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       // const userRes = await axios.post('http://192.168.1.7:3000/api/userid/get-username', { username });
//       // const user = userRes.data;
//       // const bikeRes = await axios.post('http://192.168.1.7:3000/api/bicycles/get-bikeid', { bikeId });
//       const bike = bikeRes.data;

//       if (!dropLoc) {
//         console.error('Invalid drop location ID.');
//         return;
//       }

//       if (!loc) {
//         console.error('Invalid location ID.');
//         return;
//       }

//       if (!user) {
//         console.error('Invalid user ID.');
//         return;
//       }

//       if (!bike) {
//         console.error('Invalid bike ID.');
//         return;
//       }
//       const newBalance = await axios.post(
//         'http://192.168.1.7:3000/api/auth/charge',
//         {userId: rideData.username, charge: rideData.amount.toFixed(2)},
//       );
//       if (!newBalance) {
//         console.error('Charges deduction failed');
//       }
//       setLocDrop(dropLoc.loc_name);
//       setPickUpLocation(loc.loc_name);
//       setNameOfUser(user.username);
//       setRealBikeId(bike.bikeId);
//     } catch (error) {
//       console.error('Error getting rideData:', error);
//     }
//   };

//   useEffect(() => {
//     handleRidedata();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Ride Summary</Text>
//       <Text style={styles.detail}>Ride ID: {rideData._id}</Text>
//       <Text style={styles.detail}>Username: {nameOfUser}</Text>
//       <Text style={styles.detail}>Bike ID: {realBikeId}</Text>
//       <Text style={styles.detail}>Pickup Location: {pickUpLocation}</Text>
//       <Text style={styles.detail}>Drop-off Location: {locDrop}</Text>
//       <Text style={styles.detail}>
//         Pickup Time: {new Date(rideData.time_pick).toLocaleString()}
//       </Text>
//       <Text style={styles.detail}>
//         Drop-off Time: {new Date(rideData.time_drop).toLocaleString()}
//       </Text>
//       <Text style={styles.detail}>
//         Amount: {rideData.amount.toFixed(2)} Tokens
//       </Text>
//       <Button
//         title="Back to Rental"
//         onPress={() =>
//           navigation.navigate('Home', {
//             username: rideData.username,
//             token,
//             amount: rideData.amount.toFixed(2),
//           })
//         }
//         color="#4CAF50"
//         width="100%"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   detail: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: '#333',
//   },
// });

// export default SummaryPage;








import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { IP } from '@env';

const SummaryPage = ({route, navigation}) => {
  const [locDrop, setLocDrop] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [nameOfUser, setNameOfUser] = useState('');
  const [realBikeId, setRealBikeId] = useState('');
  const {rideData, token} = route.params;

  const handleRidedata = async () => {
    try {
      const dropLocRes = await axios.post(
        `http://${IP}:3000/api/locations/droplocid`,
        {loc_drop: rideData.loc_drop},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // const dropLocRes = await axios.post('http://192.168.1.7:3000/api/locations/droplocid', { loc_drop });
      const dropLoc = dropLocRes.data;
      // const locRes = await axios.post('http://192.168.1.7:3000/api/locations/pickuplocid', { loc_pick });
      const locRes = await axios.post(
        `http://${IP}:3000/api/locations/pickuplocid`,
        {loc_pick: rideData.loc_pick},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const loc = locRes.data;
      const userRes = await axios.post(
        `http://${IP}:3000/api/userid/get-username`,
        {username: rideData.username},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      user = userRes.data;
      const bikeRes = await axios.post(
        `http://${IP}:3000/api/bicycles/get-bikeid`,
        {bikeId: rideData.bikeId},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // const userRes = await axios.post('http://192.168.1.7:3000/api/userid/get-username', { username });
      // const user = userRes.data;
      // const bikeRes = await axios.post('http://192.168.1.7:3000/api/bicycles/get-bikeid', { bikeId });
      const bike = bikeRes.data;

      if (!dropLoc) {
        console.error('Invalid drop location ID.');
        return;
      }

      if (!loc) {
        console.error('Invalid location ID.');
        return;
      }

      if (!user) {
        console.error('Invalid user ID.');
        return;
      }

      if (!bike) {
        console.error('Invalid bike ID.');
        return;
      }
      const newBalance = await axios.post(`http://${IP}:3000/api/auth/charge`, {
        userId: rideData.username,
        charge: rideData.amount.toFixed(2),
      });
      if (!newBalance) {
        console.error('Charges deduction failed');
      }
      setLocDrop(dropLoc.loc_name);
      setPickUpLocation(loc.loc_name);
      setNameOfUser(user.username);
      setRealBikeId(bike.bikeId);
    } catch (error) {
      console.error('Error getting rideData:', error);
    }
  };

  useEffect(() => {
    handleRidedata();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Summary</Text>
      <Text style={styles.detail}><Text style={styles.span}>Ride ID:</Text> {rideData._id}</Text>
      <Text style={styles.detail}><Text style={styles.span}>Username:</Text> {nameOfUser}</Text>
      <Text style={styles.detail}><Text style={styles.span}>Bike ID:</Text> {realBikeId}</Text>
      <Text style={styles.detail}><Text style={styles.span}>Pickup Location:</Text> {pickUpLocation}</Text>
      <Text style={styles.detail}><Text style={styles.span}>Drop-off Location:</Text> {locDrop}</Text>
      <Text style={styles.detail}>
      <Text style={styles.span}>Pickup Time:</Text> {new Date(rideData.time_pick).toLocaleString()}
      </Text>
      <Text style={styles.detail}>
      <Text style={styles.span}>Drop-off Time:</Text> {new Date(rideData.time_drop).toLocaleString()}
      </Text>
      <Text style={styles.detail}>
      <Text style={styles.span}>Amount:</Text> {rideData.amount.toFixed(2)} Tokens
      </Text>
      <TouchableOpacity style={styles.button} onPress={() =>
        navigation.navigate('MyDrawer', {
          username: rideData.username,
          token,
          amount: rideData.amount.toFixed(2),
        })
      }>
        <Text style={styles.buttonText}>Back to Rental</Text>
      </TouchableOpacity>
      {/* <Button
        title="Back to Rental"
        onPress={() =>
          navigation.navigate('MyDrawer', {
            username: rideData.username,
            token,
            amount: rideData.amount.toFixed(2),
          })
        }
        // color="#4CAF50"
        color="#424242"
        width="100%"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    alignItems: 'flex-start', // Align items to the left
    padding: 20,
    // backgroundColor: '#f9f9f9',
    backgroundColor: '#ffdd66', // Lighter shade of #ffcc31
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    // color: '#333',
    color: '#424242',
  },
  button: {
    // flex: 1, // Take 1/4th of the space
    backgroundColor: '#424242',
    marginTop: 50,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  span: {
    fontWeight: 'bold',
  },
});

export default SummaryPage;