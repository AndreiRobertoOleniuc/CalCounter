import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFood } from '../state/foodSlice';
import { RootState } from '../state/Store'; // import the type of your root state

const barCodeTypes = [
    BarCodeScanner.Constants.BarCodeType.ean13,
    BarCodeScanner.Constants.BarCodeType.ean8,
    BarCodeScanner.Constants.BarCodeType.upc_e,
    BarCodeScanner.Constants.BarCodeType.upc_a,
    BarCodeScanner.Constants.BarCodeType.code128,
    BarCodeScanner.Constants.BarCodeType.code39,
    BarCodeScanner.Constants.BarCodeType.code93,
    BarCodeScanner.Constants.BarCodeType.code39mod43,
    BarCodeScanner.Constants.BarCodeType.itf14,
    BarCodeScanner.Constants.BarCodeType.pdf417,
    BarCodeScanner.Constants.BarCodeType.interleaved2of5,
    BarCodeScanner.Constants.BarCodeType.itf14,
    BarCodeScanner.Constants.BarCodeType.rss14,
    BarCodeScanner.Constants.BarCodeType.rssExpanded,
    BarCodeScanner.Constants.BarCodeType.upc_ean,
    BarCodeScanner.Constants.BarCodeType.codabar,
];

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [product, setProduct] = useState(null);
  const foodSelector = useSelector((state: RootState) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!hasPermission){
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
    console.log(foodSelector);
  }, [foodSelector]);

  //@ts-ignore
  const handleBarCodeScanned = ({ data }) => {
    setProduct(data);
    console.log(data);
    axios.get(`https://world.openfoodfacts.net/api/v2/product/${data}?fields=product_name,nutriscore_data,brands,image_front_url,nutriments`).then((response) => {
        const food = {
            name: response.data.product.product_name,
            brand: response.data.product.brands,
            calories: response.data.product.nutriments["energy-kcal_100g"],
            nutriscore: response.data.product.nutriscore_data.grade,
            image: response.data.product.image_front_url,
        };
        dispatch(addFood(food));
      });
  };

  const resetScan =()=>{
    setProduct(null);
  }

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={product != null ? undefined : handleBarCodeScanned}
          style={styles.camera}
          barCodeTypes={barCodeTypes}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Scan a Barcode to add Food</Text>
        </View>
        {renderCamera()}
        <View style={styles.manualCodeContainer}>
            <Text style={styles.manualCodeText}>Enter a barcode manually</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    flex:1,
    alignItems:"center",
    paddingTop:30,
    justifyContent:"center",
    backgroundColor:"#2B354C",
  },
  headerText:{
    color:"#FAF9F6",
    fontSize:18,
  },
  manualCodeText:{
    color:"#FAF9F6",
    fontSize:13,
  },
  manualCodeContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    height:30,
    backgroundColor:"#2B354C",
  },
  cameraContainer: {
    width: '100%',
    height: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
});