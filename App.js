import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
// import { RealmProvider, AppProvider, UserProvider } from '@realm/react';
// import {useQuery} from '@realm/react';

// Import your models
// import { UPCS } from "./models/objectModel";
const dataLake = [
 {   
_id: "6629761544c92b70f1618a4b",
type:"org.iso.QRCode",
value:"https://win.gs/ed"
},
{
_id: "662975d644c92b70f1618a4a",
type:"org.gs1.UPC-E",
value: "08523983"
}
]
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [upcScanned, setUpcScanned] = useState("")

  // const objects = useQuery(UPCS);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setUpcScanned(data);
    alert(typeof data)
    // const valueExists = objects.some(obj => {
    //   // Check if the value matches any property of the object
    //   return (
    //     obj.value === upcScanned ||
    //     // Add more properties as needed
    //     false
    //   );
    // });
    const valueExists = dataLake.some(obj => obj.value === data);

    alert(valueExists ? 'Value Exists' : `Value doesn't exist`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (

    <View style={styles.container}>
      {/* <AppProvider id={'native-app-1-evhygem'}> */}
        {/* <UserProvider></UserProvider> */}
        {/* <RealmProvider schema={[UPC]} sync={{
           flexible: true,
           onError: (_session, error) => {
             console.log(error);
           },
           initialSubscriptions: {
             update(subs, realm) {
               subs.add(realm.objects('UPCS'));
             },
             rerunOnOpen: true,
           },
          }}> */}
          <Text style={{ marginBottom: 50 }}>Price Checker 0.0.1</Text>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417", 'upc_e'],
            }}
            style={styles.camera}
          />
          {scanned && (
            <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
          )}
        {/* </RealmProvider> */}
      {/* </AppProvider> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc2c2",
  },
  camera: {
    width: 300,
    height: 300,
    margin: 'auto',
    borderRadius: '30px',
    borderWidth: '2'
    // padding: "10px",
    // backgroundColor: 'navy'
  }
});