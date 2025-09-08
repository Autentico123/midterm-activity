import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";

function CommentItem({ item, onLike, onReply }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 10));

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: getAvatarColor(item.author) },
          ]}
        >
          <Text style={styles.avatarText}>{item.author[0]}</Text>
        </View>
        <View style={styles.commentInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.author}>{item.author}</Text>
            {item.author === "You" && (
              <View style={styles.youBadge}>
                <Text style={styles.youBadgeText}>You</Text>
              </View>
            )}
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{item.content}</Text>

      <View style={styles.commentActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Text style={[styles.actionIcon, isLiked && styles.likedIcon]}>
            {isLiked ? "❤️" : "🤍"}
          </Text>
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {likeCount > 0 ? likeCount : "Like"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onReply}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>Reply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getAvatarColor = (name) => {
  const colors = [
    "#007AFF",
    "#FF3B30",
    "#34C759",
    "#FF9500",
    "#AF52DE",
    "#FF2D92",
    "#5AC8FA",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const Comment = () => {
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "JhunRyl Delacruz",
      content: "Legit yan, binalita yan sa sulasok tv",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Johnpaul Rodriguez",
      content: "Nakita ko yan sa paw patrol!",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      author: "Anonymous",
      content: "bug or bold? 🤔",
      timestamp: "30 minutes ago",
    },
  ]);

  const addComment = () => {
    if (value.trim()) {
      const newComment = {
        id: Date.now(),
        author: "You",
        content: value.trim(),
        timestamp: "Just now",
      };
      setComments([newComment, ...comments]);
      setValue("");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.header}>💬 Comments</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{comments.length}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>⚡ Latest</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputHeader}>
          <View style={styles.myAvatar}>
            <Text style={styles.myAvatarText}>Y</Text>
          </View>
          <Text style={styles.inputLabel}>Share your thoughts...</Text>
        </View>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="What do you think about this? Share your opinion..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={3}
        />

        <View style={styles.inputFooter}>
          <View style={styles.inputTools}>
            <TouchableOpacity style={styles.toolButton}>
              <Text style={styles.toolButtonText}>😊</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolButton}>
              <Text style={styles.toolButtonText}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolButton}>
              <Text style={styles.toolButtonText}>📎</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.postButton,
              !value.trim() && styles.postButtonDisabled,
            ]}
            onPress={addComment}
            disabled={!value.trim()}
          >
            <Text style={styles.postButtonText}>
              {value.trim() ? "Post Comment" : "Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentsHeader}>
        <Text style={styles.commentsTitle}>
          All Comments ({comments.length})
        </Text>
        <View style={styles.commentsStats}>
          <Text style={styles.statsText}>👥 {comments.length} comments</Text>
        </View>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CommentItem item={item} onLike={() => {}} onReply={() => {}} />
        )}
        contentContainerStyle={styles.commentList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  sortButton: {
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sortButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  myAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  myAvatarText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e8ed",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    maxHeight: 120,
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "#fafbfc",
    marginBottom: 12,
  },
  inputFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputTools: {
    flexDirection: "row",
  },
  toolButton: {
    padding: 8,
    marginRight: 4,
  },
  toolButtonText: {
    fontSize: 18,
  },
  postButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
  },
  postButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f2f5",
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  commentsStats: {
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statsText: {
    fontSize: 12,
    color: "#666",
  },
  commentList: {
    paddingBottom: 20,
  },
  separator: {
    height: 8,
  },
  commentItem: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  commentInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  author: {
    fontWeight: "600",
    color: "#1a1a1a",
    fontSize: 16,
    marginRight: 8,
  },
  youBadge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  youBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  timestamp: {
    color: "#9ca3af",
    fontSize: 13,
  },
  moreButton: {
    padding: 4,
  },
  moreButtonText: {
    color: "#9ca3af",
    fontSize: 16,
  },
  content: {
    color: "#4a5568",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    marginLeft: 56,
  },
  commentActions: {
    flexDirection: "row",
    marginLeft: 56,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f2f5",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    paddingVertical: 4,
  },
  actionIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  actionText: {
    color: "#666",
    fontSize: 13,
    fontWeight: "500",
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  likedText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
});

export default Comment;
