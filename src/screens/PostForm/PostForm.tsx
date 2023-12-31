import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Card, Input, ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../../store/api/postsApi";

const UserForm = () => {  
  const [postText, setPostText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [checkPrivate, setCheckPrivate] = useState(false);

  const [createPost,] = useCreatePostMutation();

  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  const handleCheckox = () => {
    setCheckPrivate(!checkPrivate);
  };

  const submitHandler = () => {
    if (postText !== "") {
      setFeedback(`Tweet, ${postText} `);
      setSubmitted(true);
      setPostText("");
      setTimeout(() => {
        setFeedback("");
      }, 5000);

      createPost({
        post: {
          text: postText,
          createdAt: new Date().toLocaleDateString(),
          createdBy: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
          private: checkPrivate,
        }
      }).then((res) => {
        if (res) {
          console.log("success", res)
        } else {
          console.log("else", res)
        }
      }).catch((err) => {
        console.log("errror", err)
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
        <Card.Title>Post Tweet</Card.Title>
        <Card.Divider />
        {loggedInAs ? (
          <>
          <View style={styles.labels}>
            <Text style={styles.labelName}>Tweet... </Text>
            <Input
              placeholder="Tweet..."
              returnKeyType="send"
              errorStyle={{ color: "red" }}
              // errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={(newText) => setPostText(newText)}
            />
            <ListItem.CheckBox
              checked={checkPrivate}
              onPress={handleCheckox}
            />
          </View>
          <Button title="Publish Tweet"
            buttonStyle={styles.btnCreate}
            onPress={submitHandler}
          />
          <Text
            // className={styles.feedbackText}
            style={{ color: submitted ? "#3c425c" : "#ed4e59" }}
          >
            {feedback}
          </Text>
          </>

        ) : <Text>Logga in för att börja twittra! </Text> }
      </Card>
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
