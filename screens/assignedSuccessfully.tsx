import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

//import LottieView from "lottie-react-native";


export default function assignedSuccessfully() {
  return (
    <SafeAreaView>
        <View>
        <View style={styles.infoCard}>
              <Image
              source={{
                uri: 'https://i.pinimg.com/564x/df/f4/c9/dff4c90ec67abfb76a6aafae230783cd.jpg',
              }}
              style={styles.image}
              />
              <Text style={styles.assignText}>We are delighted to inform you that your room has been successfully assigned following your online booking.</Text>

              <Text style={styles.assignText}>Your reservation details have been processed, and we have prepared a comfortable room for your stay.</Text>

              <Text style={styles.assignText}>We look forward to welcoming you and hope you have a pleasant and enjoyable experience with us.</Text>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    infoCard:{
        height: 490,
        width: 360,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 10,
      },

      assignText:{
        fontSize: 16,
        opacity: 0.6,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16
      },

      image:{
        height: 250,
        width: 250,
        borderRadius: 10,
        marginLeft: 55
      },

})