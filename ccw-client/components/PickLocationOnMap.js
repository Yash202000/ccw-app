import React, { useState } from 'react';
import { View, StyleSheet,Button ,TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'; 


const PickLocationOnMap = ({ onSelectLocation ,setIsPickingLocation}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleConfirm = () => {

    onSelectLocation({"coords":selectedLocation});
    setIsPickingLocation(false);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.cancelButton} onPress={() => setIsPickingLocation(false)}>
        <Ionicons name="md-close" size={24} color="black" />
      </TouchableOpacity>
      <MapView style={styles.map} onPress={handleMapPress}>
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
      <View style={styles.confirmButtonContainer}>
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
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
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  // confirmButtonContainer: {
  //   position: 'absolute',
  //   bottom: 20,
  //   left: 20,
  //   right: 20,
  // },
});

export default PickLocationOnMap;
