import { View, Text } from "react-native";
import { Card, Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { PROJECT_ID } from '@env';

const UserForm = () => {
  return (
    <View>
      <Card>
        <Card.Title>UserForm</Card.Title>
        <Card.Divider />
        <View style={styles.labels}>
          <Text style={styles.labelName}>Firstname: </Text>
          <Input
            placeholder="Firstname"
            errorStyle={{ color: "red" }}
            errorMessage="ENTER A VALID ERROR HERE"
          />
          <Text style={styles.labelName}>Lastname: </Text>
          <Input
            placeholder="Lastname"
            errorStyle={{ color: "red" }}
            errorMessage="ENTER A VALID ERROR HERE"
          />
        </View>
        <Button title="Create User" buttonStyle={styles.btnCreate}/>
      </Card>

      <Text style={styles.footer}>Project ID: {PROJECT_ID}</Text>
    </View>
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
  footer: {
    marginTop: 24,
    textAlign: 'center',
  }
});

export default UserForm;
