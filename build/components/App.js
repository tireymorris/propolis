var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { h } from 'preact';
import Router from 'preact-router';
import { createHashHistory } from 'history';
import { Link } from 'preact-router/match';
import Posts from './Posts';
import Markdown from './Markdown';
import { useState, useEffect } from 'preact/hooks';
const App = () => {
    const [pages, setPages] = useState([]);
    const fetchPages = () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield fetch(`${location.protocol}//${location.host}/pages.json`)
            .then((response) => response.json())
            .catch((error) => {
            console.error(error);
            return [];
        });
        setPages(data);
    });
    useEffect(() => {
        fetchPages();
    }, []);
    return (h("div", { id: "root" },
        h("div", { id: "content" },
            h("nav", { className: "horizontal" },
                h("ul", null, pages.map((page) => (h("li", null,
                    h(Link, { activeClassName: "active", href: `/${page.id}` }, page.name)))))),
            h(Router, { history: createHashHistory() },
                pages.map((page) => {
                    // need two loops here because Fragments don't work with preact-router
                    if (page.posts && page.posts.length > 0)
                        return h(Posts, { path: `/${page.id}`, posts: page.posts });
                }),
                pages.map((page) => {
                    if (page.posts && page.posts.length > 0) {
                        return page.posts.map(({ id, filepath }) => (h(Markdown, { path: `/${page.id}/${id}`, filepath: filepath })));
                    }
                    return h(Markdown, { path: `/${page.id}`, filepath: page.filepath });
                })))));
};
export default App;
//# sourceMappingURL=App.js.map