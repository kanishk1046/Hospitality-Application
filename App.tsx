/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
//import type {PropsWithChildren} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CheckIn from './screens/CheckIn';
import userCard from './screens/userCard';
import idScanner from './screens/idScanner';
import scannerModule from './screens/scannerModule';
import masterGuestDetails from './screens/masterGuestDetails';
import uploadedDocuments from './screens/uploadedDocuments';
import masterGuestIDDetails from './screens/masterGuestIDDetails';
import signature from './screens/signature';
import reviewInformation from './screens/reviewInformation';
import assignRoom from './screens/assignRoom';
import assignedSuccessfully from './screens/assignedSuccessfully';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';





const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='checkIn'>
        <Stack.Screen name="checkIn" component={CheckIn}/>
        <Stack.Screen name="userCard" component={userCard}/>
        <Stack.Screen name="idScanner" component={idScanner}/>
        <Stack.Screen name="scannerModule" component={scannerModule} />
        <Stack.Screen name="masterGuestDetails" component={masterGuestDetails} />
        <Stack.Screen name="uploadedDocuments" component={uploadedDocuments} />
        <Stack.Screen name="masterGuestIDDetails" component={masterGuestIDDetails} />
        <Stack.Screen name="signature" component={signature} />
        <Stack.Screen name="reviewInformation" component={reviewInformation} />
        <Stack.Screen name="assignRoom" component={assignRoom} />
        <Stack.Screen name="assignedSuccessfully" component={assignedSuccessfully} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
