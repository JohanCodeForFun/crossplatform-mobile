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
import UserAccordion from "./UserAccordion/UserAccordion";

// type UserListProps = {
//   name: string;
// };

const UserList = () => {
  const [expanded, setExpanded] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({
    firstName: "",
    lastName: "",
  });

  const usersList = useGetUsersQuery("users");
  const { data: users, isLoading } = usersList;
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    try {
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
    <ScrollView>
      <Card>
        <Card.Title>List of users!</Card.Title>
        <View>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            sortedData &&
            sortedData.map((user) => (
              <UserAccordion
                key={user.id}
                user={user}
                handleDeleteUser={handleDeleteUser}
                updateUser={updateUser}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                setUserToUpdate={setUserToUpdate}
              />
            ))
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
