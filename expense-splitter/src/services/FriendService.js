const FriendService = {
  addFriend: (friends, name) => {
    if (name !== '') {
      return [...friends, { id: friends.length + 1, name }];
    }
    return friends;
  },
  removeFriend: (friends, id) => friends.filter(f => f.id !== id),
};

export default FriendService;