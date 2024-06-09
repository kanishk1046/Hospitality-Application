import { StyleSheet, Text, View,SafeAreaView, Button, Image } from 'react-native'
import React from 'react'

import { useNavigation,NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
//import { Image } from '@shopify/react-native-skia';

export default function userCard() {
    const route = useRoute();
    const { data }  = route.params as { data: string };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
        <View>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Quick room check-in</Text>
            </View>
            <View style={styles.searchContainer}>  
                <Text
                  style={styles.inputId}
                >
                  {data}
                </Text>
            </View>
            <View style={styles.infoCard}>
              <Image
                source={{
                  uri: 'https://i.pinimg.com/736x/a5/b6/3f/a5b63fff55e0ef346eaaecaf36d0f879.jpg',
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.footerContent}>
                <Button 
                title='Check-in'
                onPress={() => navigation.navigate("idScanner", {data: data})}
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingContainer:{
    marginTop: 24,
    //marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
},

headingText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000'
},
inputId:{
    alignItems:'baseline'
},

searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#d3d3d3',
    height: 50,
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF'
},

infoCard:{
  height: 300,
  width: 360,
  backgroundColor: '#FFFFFF',
  marginHorizontal: 16,
  marginTop: 24,
  borderRadius: 10,
},

image:{
  height:300,
  borderRadius: 10,
},

footerContent:{
    marginTop: 196,
    marginHorizontal: 16,
}
})