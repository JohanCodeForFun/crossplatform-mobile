import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, ListItem } from "@rneui/themed";
import { UpdateUserModal } from "./modal/UpdateUserModal";
import { useSelector } from "react-redux";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../store/api/usersApi";
import { useDeleteUserPostsMutation } from "../../store/api/postsApi";
import UserAccordion from "./UserAccordion/UserAccordion";

const UserList = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({
    firstName: "",
    lastName: "",
  });

  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

  const usersList = useGetUsersQuery("users");
  const { data: users, isLoading } = usersList;

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteUserPosts] = useDeleteUserPostsMutation();

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserPosts({
        createdBy: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
      }).unwrap();
      await deleteUser({ userId: id }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

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
    <>
      <Card>
        <Card.Title>List of users!</Card.Title>
        <View>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            sortedData && (
              <FlatList
                data={sortedData}
                renderItem={({ item }) => (
                  <UserAccordion
                    key={item.id}
                    user={item}
                    handleDeleteUser={handleDeleteUser}
                    updateUser={updateUser}
                    showUpdateModal={showUpdateModal}
                    setShowUpdateModal={setShowUpdateModal}
                    setUserToUpdate={setUserToUpdate}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            )
          )}
        </View>
      </Card>
      <UpdateUserModal
        updateUser={updateUser}
        userToUpdate={userToUpdate}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />
    </>
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
  accordionDesc: {
    color: "#6c757d",
    marginBottom: 16,
  },
  btnEdit: {
    backgroundColor: "#faad14",
  },
  btnDelete: {
    backgroundColor: "#ff190c",
  },
});

export default UserList;
