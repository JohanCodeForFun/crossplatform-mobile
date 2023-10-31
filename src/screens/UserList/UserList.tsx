import { View, Text} from "react-native";
import { Button, Card } from '@rneui/themed';

// type UserListProps = {
//   name: string;
// };

const UserList = () => {
  return (
    <View>
      <Card>
        <Card.Title>UserList</Card.Title>
        <Text>Kajsa Anka</Text>
        <Button>Remove</Button>
      </Card>
    </View>
  );
};

export default UserList;
