import { ListItem } from "@rneui/themed";
import { View, Text, FlatList } from "react-native";

import { useGetPostsQuery } from "../../store/api/postsApi";

const UserList = () => {
  const { data: posts, isLoading } = useGetPostsQuery("posts");

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        posts && (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
              >
                <ListItem.Content>
                  <ListItem.Title>
                    {item.text}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
          />
        )
      )}
    </View>
  );
};

export default UserList;