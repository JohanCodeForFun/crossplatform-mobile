import { View, Text } from "react-native";
import { Card, Input } from "@rneui/themed";
import { Button } from "@rneui/base";

const UserForm = () => {
  return (
    <View>
      <Card>
        <Card.Title>UserForm</Card.Title>
        <Card.Divider />
        <View style={{ 
          marginBottom: 24
          }}>
          <Text>Firstname: </Text>
          <Input
            placeholder="Firstname"
            errorStyle={{ color: "red" }}
            errorMessage="ENTER A VALID ERROR HERE"
          />
          <Text>Lastname: </Text>
          <Input
            placeholder="Lastname"
            errorStyle={{ color: "red" }}
            errorMessage="ENTER A VALID ERROR HERE"
          />
        </View>
        <Button>Create User</Button>
      </Card>
    </View>
  );
};

export default UserForm;
