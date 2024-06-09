import { StyleSheet, Text, View,SafeAreaView, Button, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

import { useNavigation,NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';


export default function idScanner() {
    const route = useRoute();
    const { data }  = route.params as { data: string };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [number, onChangeNumber] = React.useState('');

    function openWebsite(websiteLink: string){
        Linking.openURL(websiteLink)
    }

  return (
    <SafeAreaView>
        <View>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>ID Scanner</Text>
            </View>
            <View style={styles.searchContainer}>  
                <Text
                  style={styles.inputId}
                >
                  Your registration ID: {data}
                </Text>
            </View>
            <View style={styles.infoCard}>
              <Image
              source={{
                uri: 'https://i.pinimg.com/564x/af/f7/a7/aff7a72189a7c3fce8856b6b822b72ee.jpg',
              }}
              style={styles.image}
              />
            </View>
            <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                    Note:
                </Text>
                <Text style={styles.noteText}>
                    •Depending upon the type of ID you have to scan several pages.
                </Text>
                <Text style={styles.noteText}>
                    •Place the document on a solid background, make sure the document is well lit. 
                </Text>
            </View> 
            <View style={styles.footerContent}>
                <Button 
                title='Start scanning'
                onPress={() => navigation.navigate("scannerModule", {data: data})}
                />
            </View>
            <View style={styles.helpContainer}>
                <Text>For more information and assistance </Text>
                <TouchableOpacity
                onPress={() => openWebsite('https://www.yanoljacloudsolution.com/')}
                >
                    <Text style={styles.webLink}>Help</Text>

                </TouchableOpacity>
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

    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#d3d3d3',
        height: 60,
        marginTop: 24,
        marginHorizontal: 16,
        backgroundColor: '#FFFFFF'
    },

    inputId:{
        alignItems:'baseline'
    },
    infoCard:{
        height: 270,
        width: 360,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 10,
      },

    image:{
        height:270,
        borderRadius: 10,
    },

    noteContainer:{
        height: 130,
        width: 360,
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 10,
    },

    noteText:{
        paddingHorizontal: 10,
        paddingTop: 8
    },
      
      footerContent:{
          marginTop: 16,
          marginHorizontal: 16,
      },

    helpContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        flexDirection: 'row'
    },

    webLink:{
        color:'#0000FF'
    }
})