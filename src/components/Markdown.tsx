import Preact, { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import marked from 'marked';

type Hljs = {
  highlightBlock: (block: Element) => void;
};

const Markdown = (props: { filepath: string; path?: string }): Preact.VNode => {
  const [hljs, setHljs] = useState((null as unknown) as Hljs);
  const [markdownSrc, setMarkdownSrc] = useState('');
  const { filepath } = props;

  useEffect(() => {
    import(/* webpackChunkName: "highlight.js" */ 'highlight.js').then(({ default: hjs }) => {
      setHljs(hjs);
    });
  }, []);

  useEffect(() => {
    if (hljs) {
      document.querySelectorAll('pre code').forEach((block) => hljs.highlightBlock(block));
    }
  }, [props.path, hljs, markdownSrc]);

  useEffect(() => {
    const fetchMarkdownSrc = async () => {
      const markdown: string = await fetch(`${location.protocol}//${location.host}/${filepath}`)
        .then((response) => {
          return response.text();
        })
        .catch((error) => {
          console.error(error);
          return '';
        });

      setMarkdownSrc(markdown);
    };
    fetchMarkdownSrc();
  }, [filepath]);

  return <div className="post" dangerouslySetInnerHTML={{ __html: marked(markdownSrc) }} />;
};

export default Markdown;
