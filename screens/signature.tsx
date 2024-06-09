import { StyleSheet, Text, View, PanResponder, GestureResponderEvent, PanResponderGestureState, useWindowDimensions, Button, Image } from 'react-native'
import React, { Children } from 'react'

import { Canvas, Circle, SkPath, useTouchHandler, Skia, Path, PaintStyle, SkPaint, } from '@shopify/react-native-skia';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation,NavigationProp } from '@react-navigation/native';

import { RootStackParamList } from '../navigation';
import { useRoute } from '@react-navigation/native';

interface IPath {
  path: SkPath;
  paint: SkPaint;
}

const paint = () => {
  const paint = Skia.Paint();
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeWidth(4);
  paint.setColor(Skia.Color('#000000'));
  return paint;
}


export default function signature() {
  const route = useRoute();
  const { data }  = route.params as { data: string };
  //const {height, width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const currentPath = React.useRef<SkPath | null>(null);
  const [paths, setPaths] = React.useState<IPath[]>([]);
  
  const onTouch = useTouchHandler({
    onStart: ({ x, y }) => {
      currentPath.current = Skia.Path.Make()
      currentPath.current?.moveTo(x,y);
    },
    onActive: ({ x, y }) => {
      currentPath.current ?.lineTo(x,y);
    }, 
    onEnd: () => {
      setPaths(values => values.concat({
        path: currentPath.current!,
        paint: paint(),
      }));
      currentPath.current = null;
    }
  })

  return (
    <SafeAreaView>

<View style={styles.infoCard}>
              <Image
                source={{
                  uri: 'https://i.pinimg.com/originals/33/e7/d8/33e7d8460233ffcb195ceaff5915fb58.png',
                }}
                style={styles.image}
              />
            </View>
            <Canvas style={styles.signContainer} onTouch={onTouch}>
              {Children.toArray(paths.map((value) => (
                <Path path={value.path} paint={value.paint} />
              )))}
            </Canvas>
            <View style={styles.footerContent}>
                <Button 
                    title='Save Signature'
                    onPress={() => navigation.navigate("reviewInformation", {data: data})}
                />
            </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    signContainer:{
        flex: 1,
        height: 200,
        width: 300,
        backgroundColor: '#FFFFFF'
    },

    infoCard:{
      height: 500,
      width: 360,
      backgroundColor: '#FFFFFF',
      marginHorizontal: 16,
      marginTop: 24,
      borderRadius: 10,
    },
    
    image:{
      height:610,
      borderRadius: 10,
    },

    footerContent:{
      marginTop: 126,
      marginHorizontal: 16,
  },
})