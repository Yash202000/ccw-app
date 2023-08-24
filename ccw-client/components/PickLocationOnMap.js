import React, { useState } from 'react';
import { View, StyleSheet,Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PickLocationOnMap = ({ onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleConfirm = () => {
    console.log('seletcted location : ',selectedLocation)
    onSelectLocation({"coords":selectedLocation});
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={handleMapPress}>
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
      {/* <View style={styles.confirmButtonContainer}>
        <Button title="Confirm" onPress={handleConfirm} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  // confirmButtonContainer: {
  //   position: 'absolute',
  //   bottom: 20,
  //   left: 20,
  //   right: 20,
  // },
});

export default PickLocationOnMap;
