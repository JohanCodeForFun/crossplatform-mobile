import React, { useRef, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Card, Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { PROJECT_ID } from '@env';
import { useSelector } from "react-redux";
import { useCreateUserMutation } from "../../store/api/usersApi";

const UserForm = () => {  
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [createUser,] = useCreateUserMutation();

  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  const submitHandler = () => {
    if (firstName !== "" && lastName !== "") {
      setFeedback(`Hej, ${firstName} ${lastName}, välkommen!`);
      setSubmitted(true);
      setFirstName("");
      setLastName("");
      setTimeout(() => {
        setFeedback("");
      }, 5000);

      createUser({
        user: {
          firstName,
          lastName,
        },
      }).catch((err) => {
        console.error("errror:", err)
      });
    } else {
      setSubmitted(false);
      setFeedback("Du måste fylla i alla fält.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View>
      <Card>
        <Card.Title>UserForm</Card.Title>
        <Card.Divider />
        <View style={styles.labels}>
          <Text style={styles.labelName}>Firstname: </Text>
          <Input
            placeholder="Firstname"
            returnKeyType="next"
            blurOnSubmit={false}
            errorStyle={{ color: "red" }}
            // errorMessage="ENTER A VALID ERROR HERE"
            onSubmitEditing={() => lastNameRef.current?.focus()}
            onChangeText={(newFirstName) => setFirstName(newFirstName)}
          />
          <Text style={styles.labelName}>Lastname: </Text>
          <Input
            placeholder="Lastname"
            returnKeyType="send"
            onSubmitEditing={submitHandler}
            errorStyle={{ color: "red" }}
            // errorMessage="ENTER A VALID ERROR HERE"
            onChangeText={(newLastName) => setLastName(newLastName)}
          />
        </View>
        <Button title="Create User"
          buttonStyle={styles.btnCreate}
          onPress={submitHandler}
        />
        <Text
          // className={styles.feedbackText}
          style={{ color: submitted ? "#3c425c" : "#ed4e59" }}
        >
          {feedback}
        </Text>
      </Card>

      <Text style={styles.footer}>Project ID: {PROJECT_ID}</Text>
      <Text style={styles.footer}>Logged in as: {loggedInAs ? loggedInAs.firstName : 'not logged in'}</Text>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labels: {
    marginBottom: 24,
  },
  labelName: {
    fontSize: 16,
  },
  btnCreate: {
    backgroundColor: 'green',
  },
  feedbackText: {
    // FontFace: 'verdana',
    // fontWeight: '600',
    // fontSize: 0.875,
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
  }
});

export default UserForm;
