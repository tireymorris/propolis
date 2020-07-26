import Preact, { h } from 'preact';

import { Link } from 'preact-router/match';

export type Post = {
  name: string;
  id: string;
  filepath: string;
};

const Posts = (props: { path: string; posts: Post[] }): Preact.VNode => (
  <nav className="column">
    <ul>
      {props.posts.map(({ name, id }) => (
        <li style={{ paddingBottom: '8px' }} key={id}>
          <Link activeClassName="active" href={`${props.path}/${id}`}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Posts;
