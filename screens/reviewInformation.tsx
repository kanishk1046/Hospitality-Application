import { StyleSheet, Text, View, Button,TouchableOpacity,Image, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation,NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { set } from 'mongoose';

export default function reviewInformation() {
  const route = useRoute();
  const { data }  = route.params as { data: string };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [details, setDetails] = React.useState([]);
    var jsonDetails = [];
  React.useEffect(() => {
    fetch("http://10.0.2.2:3001/getDetails", {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            id: data,
        })
    }).then(async (res) => {
        const details = await res.text();
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}, text: ${details}`);
        }
        jsonDetails = JSON.parse(details);
        setDetails(jsonDetails);
    })
    .catch((err) => {
        console.log("error", err);
    });
  }, []);

  console.log(details);

  return (
    <SafeAreaView>
      <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Preview Information</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.insideText}>Basic Information</Text>
                        {details.map((item) => {                            
                            return (
                                <View>
                <View style={styles.searchContainer}>

                                <Text
                            style={styles.inputId}
                        >{item.name}</Text>
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/a9/03/bd/a903bd6d989bd8f12b0a2354276784e8.jpg'   
                        }}
                        style={styles.voiceInput}
                        />
                </View> 

                <View style={styles.searchContainer}>
                        
                        <Text
                            style={styles.inputId}
                        >{item.phone}</Text>
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/d6/1f/83/d61f8340677b5041feae59793e7a4119.jpg'   
                        }}
                        style={styles.voiceInput}
                        />     
                </View>

                <View style={styles.searchContainer}>
                        
                        <Text
                        
                            style={styles.inputId}
                        >{item.email}</Text>
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/12/54/e3/1254e3014e624a541425752a6b3d9fec.jpg'   
                        }}
                        style={styles.voiceInput}
                        /> 
                </View>

                <View style={styles.searchContainer}>
                        
                        <Text
                            style={styles.inputId}
                        >{item.dob}</Text>
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/69/01/3b/69013b4087c5a62d1e2f22886376f1fc.jpg'   
                        }}
                        style={styles.voiceInput}
                        /> 
                </View>
                <Text style={styles.insideText}>ID Proof</Text>
                <View style={styles.searchContainer}>
                        
                        <Text
                            style={styles.inputId}
                        >{item.idType}</Text>
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/25/72/00/2572004e0c6dfa2e205aed20acd8aa9c.jpg'   
                        }}
                        style={styles.voiceInput}
                        /> 
                </View>
                <View style={styles.searchContainer}>
                        
                        <Text
                            style={styles.inputId}
                        >{item.idNumber}</Text>
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/25/72/00/2572004e0c6dfa2e205aed20acd8aa9c.jpg'   
                        }}
                        style={styles.voiceInput}
                        /> 
                </View>
                <View style={styles.searchContainer}>
                        
                        <Text
                            style={styles.inputId}
                        >{item.idDate}</Text>
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/69/01/3b/69013b4087c5a62d1e2f22886376f1fc.jpg'   
                        }}
                        style={styles.voiceInput}
                        /> 
                </View>
                </View>
                            )
                        })}
                        
        <View style={styles.footerContent}>
                  <Button 
                      title='Check-in'
                      onPress={() => navigation.navigate("assignRoom", {data : data})}
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

detailsContainer:{
    height: 510,
    width: 370,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    marginTop: 16,
    borderRadius: 10,
},

searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#d3d3d3',
        height: 50,
        marginTop: 12,
        marginHorizontal: 14,
        backgroundColor: '#FFFFFF'
},

insideText:{
  marginHorizontal: 16,
  fontSize: 16,
  marginTop: 8,
  fontWeight: 'bold'
},

voiceInput:{
    height: 20,
    width: 20,
    padding: 10,
    opacity: 0.5
},

inputId:{
    height: 50,
    width: 300,
    marginTop: 30
},

inputDate:{
    height: 50,
    marginTop: 28,
    width: 300,
},

footerContent:{
  marginTop: 86,
  marginHorizontal: 16,
},

})