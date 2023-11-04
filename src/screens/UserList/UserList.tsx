import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, ListItem } from "@rneui/themed";
import { UpdateUserModal } from "./modal/UpdateUserModal";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../store/api/usersApi";

// type UserListProps = {
//   name: string;
// };

const UserList = () => {
  const [expanded, setExpanded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({
    firstName: '',
    lastName: '',
  });

  const usersList = useGetUsersQuery("users");
  const { data: users, isLoading } = usersList;
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser({userId: id}).unwrap();
    } catch (err) {
      console.error(err);
    }
  }

  let sortedData;

  if (users) {
    sortedData = [...users].sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      } else if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>List of users!</Card.Title>
        <View>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            sortedData &&
            sortedData.map((user) => {
              return (
                <ListItem.Accordion
                  key={user.id}
                  content={
                    <ListItem.Content>
                      <ListItem.Title>
                        {user.firstName} {user.lastName}
                      </ListItem.Title>
                      <ListItem.Subtitle>Id: {user.id}</ListItem.Subtitle>
                      <View style={styles.btnContainer}>
                      <Button
                        buttonStyle={styles.btnEdit}
                        onPress={() => {
                          setShowUpdateModal(!showUpdateModal)
                          setUserToUpdate(user)
                        }}
                        >Update
                      </Button>
                        <Button
                          onPress={() => handleDeleteUser(user.id)}
                          buttonStyle={styles.btnDelete}
                        >Delete</Button>
                      </View>
                    </ListItem.Content>
                  }
                  isExpanded={expanded}
                  onPress={() => {
                    setExpanded(!expanded);
                  }}
                ></ListItem.Accordion>
              );
            })
          )}
        </View>
      </Card>
      <UpdateUserModal
        updateUser={updateUser}
        userToUpdate={userToUpdate}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    alignItems: "center",
    width: "100%",
  },  
  btnEdit: {
    backgroundColor: '#faad14',
  },
  btnDelete: {
    backgroundColor: "#ff190c",
  },
});

export default UserList;
