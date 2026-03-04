import type { User } from "../types";

const UserScroll = ({ users }: { users: User[] }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.ID}>
            {user.Username}
            <img src={user.ProfileImage} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserScroll;