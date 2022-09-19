import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const CreateNote = (props) => {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState();

  const onAddPressed = async () => {
    // console.log(title);
    // console.log(description);
    if (title != "" && description != "") {
      try {
        let value = await AsyncStorage.getItem(title);
        if (value) {
          alert("Title Already Exixts");
        } else {
          await AsyncStorage.setItem(title, description);
          // setTitle('')
          // setDescription('')
          // props.navigation.replace("Home");
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
          alert("Note Saved");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please, Add some data");
    }
  };

  return (
    <View className="flex-1">
      <TextInput
        className="bg-white m-3 px-2 text-xl pb-2 h-12"
        placeholder="Title here"
        keyboardType="default"
        onChangeText={(t) => setTitle(t)}
      />
      <TextInput
        className="bg-white m-3 px-2 text-lg pb-2 h-44"
        placeholder="Description here"
        keyboardType="default"
        multiline={true}
        maxLength={200}
        onChangeText={(t) => setDescription(t)}
      />
      <TouchableOpacity
        className="bg-slate-400 mx-20 items-center justify-center"
        onPress={() => onAddPressed()}
      >
        <Text className="text-lg">Add Note </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNote;
