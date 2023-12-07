import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setScannedOrSearchedFood } from '../../state/foodSlice';
import { RootState } from '../../state/Store'; // import the type of your root state
import { Dimensions } from 'react-native';
import NavigationProps from '../../shared/models/NavigationProp';

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
//4011100005846 test barcode M&M
export default function Scanner({navigation} : NavigationProps) {
  const [hasPermission, setHasPermission] = useState(null);
  const [product, setProduct] = useState(null);
  const [manualBarCode, onChangeBarcode] = React.useState('');
  const food = useSelector((state: RootState) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!hasPermission){
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
    console.log("food", food);
    console.log("product", product);
    console.log("manualBarCode", manualBarCode);
  }, [food,product,manualBarCode]);

  //@ts-ignore
  const handleBarCodeScanned = ({ data }) => {
    setProduct(data);
    getFood(data);
  };

  const manualSearch = () => {
    setProduct(manualBarCode);
    getFood(manualBarCode);
  }

  const getFood = (barcode: string) => {
    axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name,nutriscore_data,brands,image_front_url,nutriments`)
      .then((response) => {
      const food = {
          name: response.data.product.product_name,
          brand: response.data.product.brands,
          calories: response.data.product.nutriments["energy-kcal_100g"],
          nutriscore: response.data.product.nutriscore_data.grade,
          image: response.data.product.image_front_url,
      };
      dispatch(setScannedOrSearchedFood(food));
    }).catch((error) => {
      console.log("Something went wrong");
      console.log(error.response.data);
    });
  }

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
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={product != null ? undefined : handleBarCodeScanned}
            style={styles.camera}
            barCodeTypes={barCodeTypes}
          />
          <View style={styles.manualCodeContainer}>
              <TextInput
                style={styles.inputField}
                placeholder='Enter Barcode Manually'
                placeholderTextColor='#dfe3ed'
                value={manualBarCode}
                onChangeText={onChangeBarcode}
              />
              <TouchableOpacity onPress={manualSearch}>
                <Text style={styles.manualSearch}>Search</Text>
              </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"column",
  },
  manualCodeContainer:{
    flexDirection:"row",
    height:70,
    backgroundColor:"#333332",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  inputField:{
    width: '80%',
    height: '70%',
    backgroundColor: '#242423',
    borderColor: '#dfe3ed',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
    color:'white'
  },
  manualCodeText:{
    color:"#FAF9F6",
    fontSize:13,
  },
  manualSearch:{
    padding: 10,
    color:'white',
    textAlignVertical:"center",
    justifyContent: "center",
    marginLeft:10,
  },
  camera: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 70,
  },
});