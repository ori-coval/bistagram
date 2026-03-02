const UploadPostForm = () => {
  return (
    <form action="http://IP:PORT/upload-post" encType="multipart/form-data" method="post">
      <label htmlFor="image">Image: </label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/png, image/jpeg"
      />
      <br />
      <label htmlFor="description">Description: </label>
      <input id="description" name="description" type="text" />
      <br />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadPostForm;
