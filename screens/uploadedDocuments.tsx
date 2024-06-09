import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React from 'react'

import { useNavigation,NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function uploadedDocuments() {
    const route = useRoute();
    const { data }  = route.params as { data: string };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
   <SafeAreaView>

        <View style={styles.searchContainer}>
                
                <Text
                style={styles.inputId}>ID Front</Text>
                <Image
                source={{
                    uri:'https://i.pinimg.com/564x/bb/e1/db/bbe1db7f292d2a2df8df19583acc4779.jpg'   
                }}
                style={styles.voiceInput}
                />
            </View>
        <View style={styles.infoCard}>
                <Image
                source={{
                    uri: 'https://i.pinimg.com/736x/b7/62/b4/b762b45ddca287ace21754dda47c7e05.jpg',
                }}
                style={styles.image}
                />
        </View>
        <View style={styles.searchContainer}>
                
                <Text
                style={styles.inputId}>ID Back</Text>
                <Image
                source={{
                    uri:'https://i.pinimg.com/564x/bb/e1/db/bbe1db7f292d2a2df8df19583acc4779.jpg'   
                }}
                style={styles.voiceInput}
                />
            </View>
        <View style={styles.infoCard}>
            <Image
            source={{
                 uri: 'https://i.pinimg.com/736x/10/ba/41/10ba4152dbccf256d2e12d321f9e1d3d.jpg',
            }}
            style={styles.image}
            />
        </View>
        <View style={styles.footerContent}>
                    <Button 
                    title='Upload'
                    onPress={() => navigation.navigate("masterGuestDetails", {data: data})}
                    />
            </View>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    infoCard:{
        height: 216,
        width: 360,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 10,
      },

      image:{
        height: 216,
        width: 360,
        borderRadius: 10
      },

      inputId:{
        height: 60,
        width: 300,
        marginTop: 37,
        fontWeight: 'bold'
    },

    searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        //borderWidth: 1,
        //borderRadius: 10,
        //borderColor: '#d3d3d3',
        height: 30,
        marginTop: 24,
        marginHorizontal: 16,
        //backgroundColor: '#FFFFFF'
    },

    voiceInput:{
        height: 20,
        width: 20,
        padding: 10,
        opacity: 0.5
    },

      docText:{
        paddingHorizontal: 16,
        marginTop: 12,
        fontWeight: 'bold'
      },

    footerContent:{
        marginTop: 62,
        marginHorizontal: 16,
    }
})