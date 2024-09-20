"use client"

import clsx from 'clsx';
import fs from 'fs';
import matter from 'gray-matter';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import path from 'path';
import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/atom-one-light.css'

import useDarkMode from '@/lib/storage';

import UnderlineLink from '@/components/links/UnderlineLink';
import ExternalSwitch from '@/components/Switch';

type Post = {
  id: string
  title: string
  content: string
}

type PostRendering = {
  post: Post
  isLightMode: boolean
  toggleMode: () => void
}

const postsDirectory = path.join(process.cwd(), 'src/content');

export const getStaticPaths = (async () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return {
    paths: fileNames.map((fn) => { return { params: { id: fn.replace(/\.md$/, '') } } }),
    fallback: false,
  };
}) satisfies GetStaticPaths

export const getStaticProps = (async ({ params }) => {
  if (params === undefined) throw Error();
  if (typeof params.id !== "string") throw Error();

  const fullPath = path.join(postsDirectory, `${params.id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const post: Post = {
    id: params.id, content: matterResult.content, title: matterResult.data.title
  }

  return { props: { post } }
}) satisfies GetStaticProps<{
  post: Post
}>


function LightPage({
  post, toggleMode, isLightMode
}: PostRendering) {
  if (post === undefined) return null;

  return (
    <main>
      <section className={clsx('bg-white', 'text-gray-700', 'min-h-screen')}>
        <div className='flex flex-row-reverse p-4'>
          <div>Light Mode <ExternalSwitch state={isLightMode} switch_state={toggleMode} /></div>
        </div>
        <div className='layout py-12'>
          <div className='layout z-20 relative flex min-h-64 flex-col items-center justify-center py-12 text-center'>
            <h1 className='font-light text-4xl'>{post.title}</h1>
          </div>
          <Markdown
            remarkRehypeOptions={{
              'allowDangerousHtml': true,
              'handlers': {
                'emphasis': (state, node, _) => {
                  return {
                    type: 'element',
                    tagName: 'i',
                    properties: { "class": "italic underline-offset-1 decoration-solid decoration-primary-500 underline" },
                    children: state.all(node)
                  };
                },
                'strong': (state, node, _) => {
                  return {
                    type: 'element',
                    tagName: 'b',
                    properties: { "class": "font-semibold text-primary-500" },
                    children: state.all(node)
                  }
                }
              }
            }}
            components={{
              'a': (props) => { return <UnderlineLink href={props.href as string}>{props.children}</UnderlineLink> },
              'li': (props) => { return <li className='list-decimal pb-2 ml-4'>{props.children}</li> },
              'pre': (props) => { return <pre className='bg-gray-50 p-4 rounded-lg overflow-x-auto'>{props.children}</pre> },
              "h2": (props) => { return <h2 className='py-4'>{props.children}</h2> },
              "h3": (props) => { return <h3 className='py-4'>{props.children}</h3> }
            }}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}>
            {post.content}
          </Markdown>
        </div>
      </section>
    </main >
  )
}

function DarkPage({
  post, toggleMode, isLightMode
}: PostRendering) {
  if (post === undefined) return null;

  return (
    <main>
      <section className={clsx('bg-dark', 'text-gray-300', 'min-h-screen')}>
        <div className='flex flex-row-reverse p-4'>
          <div>Light Mode <ExternalSwitch state={isLightMode} switch_state={toggleMode} /></div>
        </div>
        <div className='layout py-12'>
          <div className='layout z-20 relative flex min-h-64 flex-col items-center justify-center py-12 text-center'>
            <h1 className='font-light text-4xl'>{post.title}</h1>
          </div>
          <Markdown remarkRehypeOptions={{
            'allowDangerousHtml': true,
            'handlers': {
              'emphasis': (state, node, _) => {
                return {
                  type: 'element',
                  tagName: 'i',
                  properties: { "class": "italic underline-offset-1 decoration-solid decoration-primary-500 underline" },
                  children: state.all(node)
                };
              },
              'strong': (state, node, _) => {
                return {
                  type: 'element',
                  tagName: 'b',
                  properties: { "class": "font-semibold text-primary-500" },
                  children: state.all(node)
                }
              }
            }
          }}
            components={{
              'a': (props) => { return <UnderlineLink href={props.href as string}>{props.children}</UnderlineLink> },
              'li': (props) => { return <li className='list-decimal pb-2 ml-4'>{props.children}</li> },
              'pre': (props) => { return <pre className='bg-gray-50 p-4 rounded-lg invert overflow-x-auto'>{props.children}</pre> },
              "h2": (props) => { return <h2 className='py-4'>{props.children}</h2> },
              "h3": (props) => { return <h3 className='py-4'>{props.children}</h3> },
              "table": (props) => { return <table className='my-4'>{props.children}</table> }
            }}
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}>
            {post.content}
          </Markdown>
        </div>
      </section>
    </main >
  );
}

function Page({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [darkMode, toggleMode] = useDarkMode();

  return (
    darkMode === 'dark' ? <LightPage post={post} toggleMode={toggleMode} isLightMode={true} />
      : <DarkPage post={post} toggleMode={toggleMode} isLightMode={false} />
  )
}

export default Page;
