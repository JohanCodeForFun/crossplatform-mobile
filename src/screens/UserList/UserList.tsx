import { View, Text, FlatList } from "react-native";
import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "@rneui/themed";
import { UpdateUserModal } from "./modal/UpdateUserModal";
import { useSelector } from "react-redux";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteUsersBulkMutation,
} from "../../store/api/usersApi";
import { useDeleteUserPostsMutation } from "../../store/api/postsApi";
import UserAccordion from "./UserAccordion/UserAccordion";
import { Button } from "@rneui/base";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

const UserList = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
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
  const [deleteUsersBulk] = useDeleteUsersBulkMutation();

  const handleBulkClear = () => {
    setSelectedUsers([]);
  };

  const handleBulkDelete = async () => {
    console.log("in handlebulkdelete btn:", selectedUsers);
    try {
      await deleteUsersBulk(selectedUsers).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    console.log({
      message: "handle delete user",
      createdBy: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
    });
    try {
      await deleteUserPosts({
        createdBy: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
      }).unwrap();
      await deleteUser({ userId: id }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  let sortedUserList = useMemo(() => {
    if (users) {
      return [...users].sort((a, b) => {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        } else if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }, [users]);

  return (
    <>
      <Card>
        <Card.Title>List of users!</Card.Title>
        {selectedUsers.length > 0 && (
          <Card>
            <View>
              <Text>{selectedUsers.length} users selected</Text>
            </View>
            <View>
              <Text style={styles.accordionDesc}>
                {selectedUsers.map((item: User) => item.firstName).join(", ")}
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <Button onPress={handleBulkClear}>Clear</Button>
              <Button onPress={handleBulkDelete} buttonStyle={styles.btnDelete}>
                Bulk Delete
              </Button>
            </View>
          </Card>
        )}
        <View style={styles.container}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            sortedUserList && (
              <FlatList
                data={sortedUserList}
                renderItem={({ item }) => (
                  <UserAccordion
                    key={item.id}
                    user={item}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    handleDeleteUser={handleDeleteUser}
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
    marginBottom: 16,
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
  btnClear: {
    backgroundColor: "#faad14",
  },
  btnDelete: {
    backgroundColor: "#ff190c",
  },
});

export default UserList;
