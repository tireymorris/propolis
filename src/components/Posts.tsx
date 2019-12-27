import { h, Fragment } from 'preact';
import Markdown from './Markdown';

import Router from 'preact-router';
import { createHashHistory } from 'history';
import Match, { Link } from 'preact-router/match';

export type Post = {
  name: string;
  id: string;
  filepath: string;
};

const Posts = (props: { path: string; posts: Post[] }) => (
  <Match path="/posts">
    {({ matches, path }: { matches: boolean; path: string }) => (
      <Fragment>
        {matches && (
          <nav className="column">
            <ul>
              {props.posts.map(({ name, id }) => (
                <li style={{ paddingBottom: '8px' }} key={id}>
                  <Link activeClassName="active" href={`${path}/${id}`}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <Router history={createHashHistory()}>
          {props.posts.map(({ id, filepath }) => (
            <Markdown path={`posts/${id}`} filepath={filepath} />
          ))}
        </Router>
      </Fragment>
    )}
  </Match>
);

export default Posts;
