import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, ListItem } from "@rneui/themed";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../../store/slices/authSlice";

const UserAccordion = ({
  user,
  handleDeleteUser,
  updateUser,
  showUpdateModal,
  setShowUpdateModal,
  setUserToUpdate,
}) => {
  const [expanded, setExpanded] = useState(false);

  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  // const useruser = route?.params?.user || loggedInAs;
  const dispatch = useDispatch();

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        <ListItem.Content style={styles.listContent}>
          <ListItem.Title>
            {user.firstName} {user.lastName} - (click name for login)
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
            <View style={styles.actionsContainer}>
        {loggedInAs?.id === user.id ? (
          <>
            <Button
              onPress={() => dispatch(logOut())}
              title="Logga ut"
              color="error"
            />
          </>
        ) : (
          <>
            <Button onPress={() => dispatch(logIn(user))} title="Logga in" />
          </>
        )}
      </View>
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
  actionsContainer: {
    backgroundColor: 'pink',
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