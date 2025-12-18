import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  async function createPlaceHandler(place) {
    // insert to device db
    await insertPlace(place);

    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
export default AddPlace;
