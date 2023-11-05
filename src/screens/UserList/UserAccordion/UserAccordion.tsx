import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, ListItem } from "@rneui/themed";
import { View, TouchableOpacity } from "react-native";

const UserAccordion = ({
  user,
  handleDeleteUser,
  updateUser,
  showUpdateModal,
  setShowUpdateModal,
  setUserToUpdate,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        <ListItem.Content style={styles.listContent}>
          <ListItem.Title>
            {user.firstName} {user.lastName} - (click name for info)
          </ListItem.Title>
          <View style={styles.btnContainer}>
            <Button
              buttonStyle={styles.btnEdit}
              onPress={() => {
                setShowUpdateModal(!showUpdateModal);
                setUserToUpdate(user);
              }}
            >
              Update
            </Button>
            <Button
              onPress={() => handleDeleteUser(user.id)}
              buttonStyle={styles.btnDelete}
            >
              Delete
            </Button>
          </View>
        </ListItem.Content>
      </TouchableOpacity>
      {expanded && (
        <View>
          <ListItem.Content>
            <ListItem.Title style={styles.accordionDesc}>
              User id: {user.id}
            </ListItem.Title>
          </ListItem.Content>
          <Divider />
        </View>
      )}
    </View>
  );
};

export default UserAccordion;

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    marginBottom: 24,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    alignItems: "center",
    width: "100%",
  },
  accordionDesc: {
    marginBottom: 8,
  },
  divider: {
    borderBottomColor: 'rgba(0, 0, 0, 0.3)', // Change the color as needed
    borderBottomWidth: 1, // Change the thickness as needed
    marginVertical: 10, // Add spacing above and below the divider
    marginBottom: 16,
  },
  btnEdit: {
    backgroundColor: "#faad14",
  },
  btnDelete: {
    backgroundColor: "#ff190c",
  },
});