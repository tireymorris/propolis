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
import { useEffect, useState } from 'preact/hooks';
import marked from 'marked';
const Markdown = (props) => {
    const [hljs, setHljs] = useState(null);
    const [markdownSrc, setMarkdownSrc] = useState('');
    const { filepath } = props;
    useEffect(() => {
        import(/* webpackChunkName: "highlight.js" */ 'highlight.js').then(({ default: hjs }) => {
            setHljs(hjs);
        });
    }, []);
    useEffect(() => {
        if (hljs) {
            document
                .querySelectorAll('pre code')
                .forEach((block) => hljs.highlightBlock(block));
        }
    }, [props.path, hljs, markdownSrc]);
    const fetchMarkdownSrc = () => __awaiter(void 0, void 0, void 0, function* () {
        const markdown = yield fetch(`${location.protocol}//${location.host}/${filepath}`)
            .then((response) => {
            return response.text();
        })
            .catch((error) => {
            console.error(error);
            return '';
        });
        setMarkdownSrc(markdown);
    });
    useEffect(() => {
        fetchMarkdownSrc();
    }, [filepath]);
    return (h("div", { className: "post", dangerouslySetInnerHTML: { __html: marked(markdownSrc) } }));
};
export default Markdown;
//# sourceMappingURL=Markdown.js.map