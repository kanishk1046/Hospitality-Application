import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation,NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function masterGuestDetails() {
    const route = useRoute();
    const { data }  = route.params as { data: string };
    console.log(data);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [name, onChangeName] = React.useState('');
    const [phoneNumber, onChangePhoneNumber] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    //const [dob, onChangeDob] = React.useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState('Select Date');

    
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleDateConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('-');
        console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
        setSelectedDate(x1[2] + '/' + x1[1] + '/' + x1[0]);
        hideDatePicker();
      };

      const submitData = () =>{
        fetch("http://10.0.2.2:3001/sendGuestDetails", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id: data,
                name : name,
                email : email,
                phone : phoneNumber,
                dob : selectedDate,
            })
        }).then(async (res) => {
            const text = await res.text();
            console.log('Response Text:', text);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}, text: ${text}`);
            }
            const jsonText = JSON.parse(text); // Parse the JSON manually
            navigation.navigate("masterGuestIDDetails", {data: data});
        })
        .catch((err) => {
            console.log("error", err);
        });
    }


  return (
    <SafeAreaView>
        <View>
            <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Master Guest Details</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.searchContainer}>
                        
                        <TextInput
                            style={styles.inputId}
                            onChangeText={onChangeName}
                            value={name}
                            placeholder='Enter your Name'
                        />
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/a9/03/bd/a903bd6d989bd8f12b0a2354276784e8.jpg'   
                        }}
                        style={styles.voiceInput}
                        />
                </View> 

                <View style={styles.searchContainer}>
                        
                        <TextInput
                            style={styles.inputId}
                            onChangeText={onChangePhoneNumber}
                            value={phoneNumber}
                            placeholder='Enter your Phone-number'
                            keyboardType="numeric"
                        />
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/d6/1f/83/d61f8340677b5041feae59793e7a4119.jpg'   
                        }}
                        style={styles.voiceInput}
                        />     
                </View>

                <View style={styles.searchContainer}>
                        
                        <TextInput
                        
                            style={styles.inputId}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder='Enter your Email'
                        />
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/12/54/e3/1254e3014e624a541425752a6b3d9fec.jpg'   
                        }}
                        style={styles.voiceInput}
                        /> 
                </View>

                <TouchableOpacity style={styles.searchContainer} 
                    onPress={() => {
                        showDatePicker();
                    }}>
                    <Text style={styles.inputDate}>{selectedDate}</Text>
                    <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/69/01/3b/69013b4087c5a62d1e2f22886376f1fc.jpg'   
                        }}
                        style={styles.voiceInput}
                        /> 
                </TouchableOpacity>
            </View>
            <View style={styles.addGuest}>
                <Button 
                title='Add more guests'
                color="#B8B8B8"
                onPress={() => navigation.navigate("idScanner", {data : data})}
                />
            </View>
            <View style={styles.footerContent}>
                <Button 
                    title='Save & Next'
                    onPress={() => submitData()}
                />
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
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
    height: 300,
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
        height: 60,
        marginTop: 12,
        marginHorizontal: 14,
        backgroundColor: '#FFFFFF'
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
},

inputDate:{
    height: 50,
    marginTop: 28,
    width: 300,
},

addGuest: {
    marginTop: 233,
    marginHorizontal: 16,
    color: '#000000'
},

footerContent:{
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 5
}
})