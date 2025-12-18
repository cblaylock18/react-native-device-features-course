import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params?.initialLat && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const { onPickLocation } = route.params ?? {};

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked yet.",
        "Pick a location by tapping on the map first!",
      );
      return;
    }

    if (onPickLocation) {
      onPickLocation({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      });
    }

    navigation.goBack();
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          size={24}
          icon="save"
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};
export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
