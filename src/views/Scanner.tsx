import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //@ts-ignore
  const handleBarCodeScanned = ({ data }) => {
    setProduct(data);
    console.log(data);
    axios.get(`https://world.openfoodfacts.net/api/v2/product/${data}`).then((response) => {
        console.log(response.data.product.product_name);
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
        <Text style={styles.paragraph}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan a Barcode to add Food</Text>
      <Text style={styles.paragraph}>Focus on the Barcode</Text>
      {renderCamera()}
      <TouchableOpacity
        style={styles.button2}
        onPress={() => resetScan()}
      >
        <Text style={styles.buttonText}>Reset Scan</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>{product}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  button2: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});