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

export const UpdateUserModal = ({ showUpdateModal, setShowUpdateModal, userToUpdate, updateUser }: Props) => {

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


  const handleFirstNameChange = (newFirstName: string) => {
    setUser({
      ...user,
      firstName: newFirstName,
    });
  }

  const handleLastNameChange = (newLastName: string) => {
    setUser({
      ...user,
      lastName: newLastName,
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
            <View>
              <Text>Firstname: </Text>
              <Input
                value={user.firstName}
                placeholder="Firstname"
                errorStyle={{ color: "red" }}
                // errorMessage="ENTER A VALID ERROR HERE"
                onChangeText={(newFirstName) => handleFirstNameChange(newFirstName)}
              />
              <Text>Lastname: </Text>
              <Input
                value={user.lastName}
                placeholder="Lastname"
                errorStyle={{ color: "red" }}
                // errorMessage="ENTER A VALID ERROR HERE"
                onChangeText={(newLastName) => handleLastNameChange(newLastName)}
              />
            </View>
            <Text
              style={styles.feedbackText}
            >
              {feedback}
            </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Cancel"
                    onPress={HandleModalVisible}>
                  </Button>
                  <Button
                    title="Update User"
                    buttonStyle={styles.buttonUpdate}
                    onPress={handleUpdateUser}>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  buttonUpdate: {
    backgroundColor: 'green',
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
  feedbackText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});