import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'

import { useNavigation,NavigationProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

import DocumentScanner from 'react-native-document-scanner-plugin'

import { SafeAreaView } from 'react-native-safe-area-context';

export default function scannerModule() {
  const route = useRoute();
    const { data }  = route.params as { data: string };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [scannedImage, setScannedImage] = useState<string>();

    const scanDocument = async () => {
      // start the document scanner
      const { scannedImages } = await DocumentScanner.scanDocument({
        croppedImageQuality: 100,
        maxNumDocuments: 2
      });
    
      // get back an array with scanned image file paths
      if (scannedImages != null && scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0])
      }
    };
  
    return (
      <SafeAreaView>
        <View>
          {scannedImage != null && (
            <Image 
            source={{
              uri: scannedImage?.toString()
            }}
            style={styles.scannedDocument}
          />
          )}
          <TouchableOpacity 
          style={styles.cameraButton}
          onPress={() => {scanDocument();
          }}
          >
          </TouchableOpacity>
          <View style={styles.footerContent}>
                  <Button 
                  title='Save & Next'
                  onPress={() => navigation.navigate("uploadedDocuments", {data: data})}
                  />
          </View>
        </View>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    cameraButton:{
      width: 90,
      height: 90,
      borderRadius: 50,
      backgroundColor: '#FFFFFF',
      borderWidth: 8,
      borderColor: '#d3d3d3',
      alignSelf: 'center',
      marginTop: 520,
      elevation: 3
    },
  
    scannedDocument:{
      width: '100%',
      height: '50%',
    },
  
    footerContent:{
      marginTop: 40,
      marginHorizontal: 16,
  }
  })