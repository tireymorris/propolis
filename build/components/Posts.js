import { h } from 'preact';
import { Link } from 'preact-router/match';
const Posts = (props) => (h("nav", { className: "column" },
    h("ul", null, props.posts.map(({ name, id }) => (h("li", { style: { paddingBottom: '8px' }, key: id },
        h(Link, { activeClassName: "active", href: `${props.path}/${id}` }, name)))))));
export default Posts;
//# sourceMappingURL=Posts.js.map