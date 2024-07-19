'use client';

import clsx from 'clsx';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import ButtonLink from '@/components/links/ButtonLink';
import RerunViewerBanner from '@/components/RerunViewer/RerunViewer';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [mode, setMode] = React.useState<'dark' | 'light'>('dark');
  const changeMode = () => mode === "dark" ? setMode("light") : setMode("dark");
  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const bgColor = mode === 'dark' ? 'bg-dark' : 'bg-white';
  const secondaryBgColor = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const buttonText = mode === "dark" ? "☀ Light Mode" : "🌙 Dark Mode";

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className={clsx(bgColor, textColor)}>
        <ButtonLink className='mt-6 absolute top-1 right-2 rounded-md' href='' variant={mode === "dark" ? "light" : "dark"} onClick={changeMode}>
          {buttonText}
        </ButtonLink>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h1 className='mt-4'>MAC-VO: {" "}
            <span className='text-primary-500'>M</span>etrics-<span className='text-primary-500'>A</span>ware {" "}
            <span className='text-primary-500'>C</span>ovariance {" "}
            for Learning-based Stereo{" "}
            <span className='text-primary-500'>V</span>isual {" "}
            <span className='text-primary-500'>O</span>dometry</h1>
          <div className="container flex flex-row items-center space-x-2 justify-center">
            <ButtonLink className='mt-6' href='/components' variant={mode} size='large'>
              GitHub Repo
            </ButtonLink>
            <ButtonLink className='mt-6' href='/components' variant={mode} size='large'>
              arXiv Page
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout py-12'>
          <p>Something here
            <RerunViewerBanner
              title="Open Rerun"
              rrd_file="https://mac-vo.github.io/rerun/tensor_map_vis.rrd"
            />
          </p>
        </div>
      </section>


    </main >
  );
}
