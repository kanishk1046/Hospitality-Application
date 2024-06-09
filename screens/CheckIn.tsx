import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import { useNavigation,NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '../navigation';

export default function CheckIn() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [number, onChangeNumber] = React.useState('');
    
    const submitData = () =>{
        fetch("http://10.0.2.2:3001/check-id", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id: number,
            })
        }).then(async (res) => {
            const text = await res.text();
            console.log('Response Text:', text);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}, text: ${text}`);
            }
            const jsonText = JSON.parse(text); // Parse the JSON manually
            if(jsonText.message === "User exists"){
                navigation.navigate("userCard", {data : number});
            }
        })
        .catch((err) => {
            console.log("error", err);
        });
    }

  return (
    <SafeAreaView>
        <View>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>Quick room check-in</Text>
            </View>
            <View style={styles.searchContainer}>
                
                <TextInput
                style={styles.inputId}
                onChangeText={onChangeNumber}
                value={number}
                placeholder='Enter your registration ID'
                />
                <Image
                source={{
                    uri:'https://i.pinimg.com/564x/aa/d7/3f/aad73f3bc1488363fb2ad95042400536.jpg'   
                }}
                style={styles.voiceInput}
                />
            </View> 
            <View style={styles.footerContent}>
                <Button 
                title='Proceed'
                onPress={() => submitData()}
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
        height: 60,
        width: 300,
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
        marginTop: 24,
        marginHorizontal: 16,
        backgroundColor: '#FFFFFF'
    },

    voiceInput:{
        height: 20,
        width: 20,
        padding: 10,
        opacity: 0.5
    },
    footerContent:{
        marginTop: 520,
        marginHorizontal: 16,
    }
})