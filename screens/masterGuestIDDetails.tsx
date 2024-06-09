import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useNavigation,NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

import DateTimePickerModal from "react-native-modal-datetime-picker";

const documents = [
    { document: 'Passport' },
    { document: 'ID Card' },
    { document: 'Driver\'s License' },
    { document: 'Birth Certificate' },
    { document: 'Aadhar Card' },
    { document: 'Voter ID' },
    { document: 'Residence Permit' },
    { document: 'Work Permit' },
  ];

export default function masterGuestIDDetails() {
    const route = useRoute();
    const { data }  = route.params as { data: string };
    console.log(data);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [selectedId, setSelectedId] = React.useState('Select ID');
    const [isClicked, setIsClicked] = React.useState(false);
    const [doc, setDoc] = React.useState(documents);
    const [idNumber, onChangeidNumber] = React.useState('');

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
        fetch("http://10.0.2.2:3001/sendGuestIDDetails", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id: data,
                idType : selectedId,
                idNumber : idNumber,
                idDate : selectedDate,
            })
        }).then(async (res) => {
            const text = await res.text();
            console.log('Response Text:', text);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}, text: ${text}`);
            }
            const jsonText = JSON.parse(text); // Parse the JSON manually
            navigation.navigate("signature", {data : data});
        })
        .catch((err) => {
            console.log("error", err);
        });
    }
    

  return (
    <SafeAreaView>
        <View>
        <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Master Guest ID Details</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.photoContainer}>
                    <Image
                        source={{
                            uri:'https://i.pinimg.com/originals/67/f8/a3/67f8a37746c13cfda5c8700148c75b2f.png'
                        }}
                        style={styles.image}
                    />
                </View>
                <TouchableOpacity 
                style={styles.searchContainer}
                onPress={() => {
                    setIsClicked(!isClicked);
                }}
                >
                    <Text style={styles.inputIdText}>{selectedId}</Text>
                    {isClicked ? (
                        <Image
                        source={{
                            uri:'https://cdn.iconscout.com/icon/free/png-512/free-up-520-475075.png?f=webp&w=512'
                        }}
                        style={styles.dropDownLogo}
                        />
                    ): (
                        <Image
                    source={{
                        uri:'https://cdn.iconscout.com/icon/free/png-512/free-chevron-down-1485703-1258924.png?f=webp&w=512'
                    }}
                    style={styles.dropDownLogo}
                    />
                    )}
                </TouchableOpacity>
                {isClicked ? <View style={styles.dropDownArea}>
                    
                    <FlatList data={doc} renderItem={({item, index}) => {
                        return(
                            <TouchableOpacity 
                            style={styles.documentItems}
                            onPress={() => {
                                setSelectedId(item.document);
                                setIsClicked(false);
                            }}
                            >
                                <Text>{item.document}</Text>
                            </TouchableOpacity>
                        );
                    }} />
                </View> : null}
                <View style={styles.searchContainer}>
                        
                        <TextInput
                            style={styles.inputId}
                            onChangeText={onChangeidNumber}
                            value={idNumber}
                            placeholder='Enter your document number'
                            //keyboardType="numeric"
                        />
                        <Image
                        source={{
                            uri:'https://i.pinimg.com/564x/25/72/00/2572004e0c6dfa2e205aed20acd8aa9c.jpg'   
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
            <View style={styles.footerContent}>
                <Button 
                    title='Check-in'
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
        height: 380,
        width: 370,
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
        marginTop: 16,
        borderRadius: 10,
        elevation: 4
    },

    photoContainer:{
        height: 150,
        width: 370,
        //backgroundColor: '#000000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    image:{
        height: 150,
        width: 350,
        marginLeft: 10
    },

    voiceInput:{
        height: 20,
        width: 20,
        padding: 10,
        opacity: 0.5
    },

    inputDate:{
        height: 50,
        marginTop: 28,
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
        height: 60,
        marginTop: 12,
        marginHorizontal: 14,
        backgroundColor: '#FFFFFF'
},

inputId:{
    height: 50,
    width: 300,
},

inputIdText:{
    height: 50,
    width: 300,
    marginTop: 30,
    paddingLeft: 12
},

idTextContainer:{
    marginTop: 18,
    
},

dropDownLogo:{
    height: 40,
    width: 40,
    padding: 10,
    opacity: 0.5
},

dropDownArea:{
    width: '90%',
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor : '#FFFFFF',
    elevation: 4,
    alignSelf: 'center'
},

searchInput:{
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 10,
},

documentItems:{
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center'
},

        footerContent:{
            marginTop: 198,
            marginHorizontal: 16,
        },

})