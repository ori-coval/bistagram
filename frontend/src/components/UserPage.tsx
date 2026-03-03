import PostScroll from "./PostScroll";

const UserPage = ({ username }: { username: string }) => {
  return (
    <div>
      <PostScroll username={username} />
    </div>
  );
};

export default UserPage;
