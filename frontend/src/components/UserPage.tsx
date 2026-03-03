import PostScroll from "./PostScroll";

const UserPage = ({ userId }: { userId: number }) => {
  return (
    <div>
      <PostScroll userId={userId} />
    </div>
  );
};

export default UserPage;
