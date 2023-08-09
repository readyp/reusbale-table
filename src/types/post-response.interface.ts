import PostInterface from "./post.interface";

interface PostResponseInterface {
  limit: number;
  posts: PostInterface[];
  skip: number;
  total: number;
}

export default PostResponseInterface;
