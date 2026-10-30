import parse, { domToReact } from 'html-react-parser';

const options = {
  replace(node) {
    if (node.type === 'tag' && node.name === 'a') {
      const { href, target } = node.attribs;
      return <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>{domToReact(node.children, options)}</a>;
    }
  },
};

// Only repository-owned content is passed here, never URL or visitor input.
export default function RichText({ children }) {
  return parse(children || '', options);
}
