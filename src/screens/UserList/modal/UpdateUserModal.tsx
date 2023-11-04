import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "@rneui/themed";
import { Modal, StyleSheet, Text, View} from 'react-native';
import { User } from "../../../types/User";

type Props = {
  userToUpdate: User;
  updateUser: (user: User) => void;
  showUpdateModal: boolean;
  setShowUpdateModal: (show: boolean) => void;
};

const UpdateUserModal = ({ showUpdateModal, setShowUpdateModal, userToUpdate, updateUser }: Props) => {

  const [feedback, setFeedback] = useState("");
  const [user, setUser] = useState({
    firstName: userToUpdate.firstName || '',
    lastName: userToUpdate.lastName || '',
  });

  useEffect(() => {
    setUser({
      firstName: userToUpdate.firstName || '',
      lastName: userToUpdate.lastName || '',
    });
  }, [userToUpdate]);


  const handleFirstNameChange = (e: { target: { value: string; }; }) => {
    setUser({
      ...user,
      firstName: e.target.value,
    });
  }

  const handleLastNameChange = (e: { target: { value: string; }; }) => {
    setUser({
      ...user,
      lastName: e.target.value,
    });
  }

  const handleUpdateUser = () => {

    if (!user.firstName || !user.lastName) {
      setFeedback("Du måste fylla i alla fält för att ändra en användare.")
      return;
    }

    if (user.firstName === userToUpdate.firstName && user.lastName === userToUpdate.lastName) {
      setFeedback("Om du inte vill ändra något, tryck på cancel för att stänga rutan.")
      return;
    }

    try {
      updateUser({
        userId: userToUpdate.id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      setFeedback('');
    } catch (err) {
      console.error(err);
    }

    setShowUpdateModal(false);
  }

  const HandleModalVisible = () => {
    setShowUpdateModal(!showUpdateModal);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showUpdateModal}
        onRequestClose={HandleModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Card>
            <Card.Title>Update User</Card.Title>
            <Card.Divider />
            <View style={styles.labels}>
              <Text style={styles.labelName}>Firstname: </Text>
              <Input
                placeholder="Firstname"
                errorStyle={{ color: "red" }}
                // errorMessage="ENTER A VALID ERROR HERE"
                onChangeText={(newFirstName) => setFirstName(newFirstName)}
              />
              <Text style={styles.labelName}>Lastname: </Text>
              <Input
                placeholder="Lastname"
                errorStyle={{ color: "red" }}
                // errorMessage="ENTER A VALID ERROR HERE"
                onChangeText={(newLastName) => setLastName(newLastName)}
              />
            </View>
            <Text
              // className={styles.feedbackText}
              // style={{ color: submitted ? "#3c425c" : "#ed4e59" }}
            >
              {feedback}
            </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Cancel"
                    buttonStyle={styles.button}
                    onPress={HandleModalVisible}>
                  </Button>
                  <Button
                    title="Update User"
                    buttonStyle={styles.buttonClose}
                    onPress={HandleModalVisible}>
                  </Button>
                </View>
              </Card>
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: 'green',
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  buttonOpen: {
    backgroundColor: '#faad14',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UpdateUserModal;