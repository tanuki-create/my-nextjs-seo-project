import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';

interface MarkdownContentProps {
  source: MDXRemoteSerializeResult;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ source }) => {
  return <MDXRemote {...source} />;
};

export default MarkdownContent;
