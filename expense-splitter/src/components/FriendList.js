import React from 'react';
import './FriendList.css';

function FriendList({ friends, setFriends }) {
  const [friendName, setFriendName] = React.useState('');

  const addFriend = () => {
    if (friendName.trim() !== '') {
      setFriends([...friends, { id: friends.length + 1, name: friendName.trim() }]);
      setFriendName('');
    }
  };

  const removeFriend = (id) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  return (
    <div className="friend-list">
      <h2>Friends</h2>
      <input value={friendName} onChange={(e) => setFriendName(e.target.value)} placeholder="Friend Name" />
      <button onClick={addFriend}>Add</button>
      <ul>
        {friends.map(f => (
          <li key={f.id}>{f.name} <button onClick={() => removeFriend(f.id)}>Remove</button></li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;