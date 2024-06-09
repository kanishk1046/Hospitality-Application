import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Button } from 'react-native'
import React from 'react'

import { useNavigation,NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '../navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

const roomtype = [
    { type: 'Single Room' },
    { type: 'Double Room' },
    { type: 'Twin Room' },
    { type: 'Deluxe Room' },
    { type: 'Suite' },
    { type: 'Family Room' },
    { type: 'Accessible Room' },
    { type: 'Executive Room' },
];



export default function assignRoom() {
    const route = useRoute();
    const { data }  = route.params as { data: string };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [selectedId, setSelectedId] = React.useState('Room Type');
    const [isClicked, setIsClicked] = React.useState(false);
    const [room, setRoom] = React.useState(roomtype);

    const submitData = () =>{
        fetch("http://10.0.2.2:3001/sendRoomDetails", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id: data,
                roomType: selectedId,
            })
        }).then(async (res) => {
            const text = await res.text();
            console.log('Response Text:', text);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}, text: ${text}`);
            }
            const jsonText = JSON.parse(text); // Parse the JSON manually
            navigation.navigate("assignedSuccessfully", {data : data});
        })
        .catch((err) => {
            console.log("error", err);
        });
    }

  return (
    <SafeAreaView>
        <View>
            <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Assign Room</Text>
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
                    
                    <FlatList data={room} renderItem={({item, index}) => {
                        return(
                            <TouchableOpacity 
                            style={styles.documentItems}
                            onPress={() => {
                                setSelectedId(item.type);
                                setIsClicked(false);
                            }}
                            >
                                <Text>{item.type}</Text>
                            </TouchableOpacity>
                        );
                    }} />
                </View> : null}
            <View style={styles.footerContent}>
                <Button 
                    title='Check-in'
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

    detailsContainer:{
        height: 85,
        width: 370,
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
        marginTop: 16,
        borderRadius: 10,
        elevation: 4
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


inputIdText:{
    height: 50,
    width: 300,
    marginTop: 30,
    paddingLeft: 12
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

documentItems:{
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center'
},

        footerContent:{
            marginTop: 522,
            marginHorizontal: 16,
        },

})