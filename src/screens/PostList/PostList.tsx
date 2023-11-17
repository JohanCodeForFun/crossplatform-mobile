import { ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";
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
                <ListItem.Content style={styles.container}>
                  <ListItem.Subtitle style={styles.handleName}>
                    @{item.createdBy}
                   </ListItem.Subtitle>
                  <ListItem.Title style={styles.title}>
                    {item.text}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.footer}>
                    ({item.createdAt})
                   </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
          />
        )
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  handleName: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 16,
  }
});

export default UserList;