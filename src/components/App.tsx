import Preact, { h } from 'preact';

import Router from 'preact-router';
import { createHashHistory } from 'history';
import { Link } from 'preact-router/match';

import Posts, { Post } from './Posts';
import Markdown from './Markdown';
import { useState, useEffect } from 'preact/hooks';

type Page = {
  id: string;
  name: string;
  posts: Post[];
  filepath: string;
};

const App = (): Preact.VNode => {
  const [pages, setPages] = useState([] as Page[]);

  const fetchPages = async () => {
    const data: Page[] = await fetch(`${location.protocol}//${location.host}/pages.json`)
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        return [];
      });

    setPages(data);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div id="root">
      <div id="content">
        <nav className="horizontal">
          <ul>
            {pages.map((page) => (
              <li>
                <Link activeClassName="active" href={`/${page.id}`}>
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Router history={createHashHistory()}>
          {pages.map((page) => {
            // need two loops here because Fragments don't work with preact-router
            if (page.posts && page.posts.length > 0) return <Posts path={`/${page.id}`} posts={page.posts} />;
          })}
          {pages.map((page) => {
            if (page.posts && page.posts.length > 0) {
              return page.posts.map(({ id, filepath }) => <Markdown path={`/${page.id}/${id}`} filepath={filepath} />);
            }
            return <Markdown path={`/${page.id}`} filepath={page.filepath} />;
          })}
        </Router>
      </div>
    </div>
  );
};

export default App;
