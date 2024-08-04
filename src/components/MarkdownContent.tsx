import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MarkdownContentProps {
  source: MDXRemoteSerializeResult;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ source }) => {
  return <MDXRemote {...source} />;
};

export default MarkdownContent;
