import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable
      onPress={onSelect.bind(this, place.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};
export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: "33%",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 100,
    resizeMode: "cover",
  },
  info: {
    padding: 12,
    width: "67%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: { fontSize: 12, color: Colors.gray700 },
});
