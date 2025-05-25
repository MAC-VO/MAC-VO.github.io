'use client';

import clsx from 'clsx';
import Head from 'next/head';
import React, { useState } from 'react';
import '@/lib/env';

import useDarkMode from '@/lib/storage';

import Figure from '@/components/Figure';
import KatexSpan from '@/components/KaTeX';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import ExternalSwitch from '@/components/Switch';


export default function HomePage() {
  const [mode, toggleMode] = useDarkMode();
  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bgColor = mode === 'dark' ? 'bg-dark' : 'bg-white';
  const maskColor = mode === 'dark' ? 'bg-dark/80' : 'bg-white/80';
  const secondaryBgColor = mode === 'dark' ? 'bg-neutral-700' : 'bg-gray-100';
  const hlTextColor = mode === "dark" ? "text-primary-500" : "text-primary-600";
  const hl2TextColor = mode === "dark" ? "text-red-600" : "text-red-700";
  const hlBgColor = mode === "dark" ? "bg-primary-500" : "bg-primary-600";

  // Tabbed datasets
  const datasets: Record<string, Array<{ title: string; src: string; badge?: string; className: string }>> = {
    Zed: [
      { title: 'Zed X Fire Academy 2', src: '/video/Zed_FireAcademy2.mp4', className: 'col-span-6' },
      { title: 'Zed X Fire Academy 1', src: '/video/Zed_FireAcademy.mp4', className: 'col-span-6' },
      { title: 'AirLab Office', src: '/video/AirLab_Scan.webm', className: 'col-span-5' },
      { title: 'AirLab Workbench', src: '/video/AirLab_Workbench.webm', className: 'col-span-7' },
    ],
    VBR: [
      { title: 'VBR Diag Train 0', src: '/video/VBR_Diag_Train0.mp4', className: 'col-span-7' },
      { title: 'VBR Spagna Test 0', src: '/video/VBR_Spagna_Test0.mp4', badge: 'Dynamic Scene', className: 'col-span-5' },
      { title: 'VBR Spagna Test 0 (2)', src: '/video/VBR_Spagna_Test0_2.mp4', badge: 'Dynamic Scene', className: 'col-span-5' },
      { title: 'VBR Colosseo Train 0', src: '/video/VBR_Colosseo_Train0.mp4', badge: 'Extreme Exposure', className: 'col-span-7' },
    ],
    'TartanAir v2': [
      { title: 'TartanAir v2 – Abandon School 1', src: '/video/TartanAirv2_AbandonedSchoolP001.mp4', className: 'col-span-5' },
      { title: 'TartanAir v2 Test (Easy) 3', src: '/video/TartanAirv2_Test_E003.mp4', className: 'col-span-7' },
    ],
    TartanAir: [
      { title: 'TartanAir – Abandon Factory 1', src: '/video/TartanAir_AbandonedFactory_P001.mp4', className: 'col-span-5' },
      { title: 'TartanAir – House 1', src: '/video/TartanAir_HouseP001.mp4', className: 'col-span-7' },
    ],
    EuRoC: [
      { title: 'EuRoC V102', src: '/video/EuRoC_V102.mp4', className: 'col-span-7' },
    ],
  };

  const tabLabels = Object.keys(datasets);
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  return (
    <main>
      <Head>
        <meta name="google-site-verification" content="wORtJ7fq4X_rDll9Ym7DJ4lHQvSwbb87d_dflv28rN8" />
      </Head>
      <section className={
        clsx(bgColor, textColor,
          "relative flex items-center justify-center h-screen overflow-hidden"
        )
      }>
        <div className='absolute top-6 right-4 z-20'>
          <span>Light Mode </span>
          <ExternalSwitch state={mode === "light"} switch_state={toggleMode} />
        </div>
        <div className='layout z-20 relative flex min-h-screen flex-col items-center justify-center p-4 text-center'>
          <h1 className='mt-4 text-5xl'>MAC-VO: {" "}
            <span className={hlTextColor}>M</span>etrics-<span className={hlTextColor}>A</span>ware {" "}
            <span className={hlTextColor}>C</span>ovariance {" "}
            for Learning-based Stereo{" "}
            <span className={hlTextColor}>V</span>isual {" "}
            <span className={hlTextColor}>O</span>dometry
          </h1>
          <div className={clsx(hl2TextColor, 'container text-xl my-4 font-bold')}>
            ICRA 2025 Best Conference Paper Award <br />
            ICRA 2025 Best Paper Award on Robot Perception
          </div>
          <div className='container pb-6'>
            <span className='text-lg'>
              <UnderlineLink href="https://haleqiu.github.io/">Yuheng Qiu</UnderlineLink><span className="align-super text-sm leading-none">*1</span>, &nbsp;
              <UnderlineLink href="https://www.yutianchen.blog/">Yutian Chen</UnderlineLink><span className="align-super text-sm leading-none">*1</span>, &nbsp;
              Zihao Zhang<span className="align-super text-sm leading-none">2</span>, &nbsp;
              <UnderlineLink href="http://www.wangwenshan.com/">Wenshan Wang</UnderlineLink><span className="align-super text-sm leading-none">1</span>, &nbsp;
              <UnderlineLink href="https://www.ri.cmu.edu/ri-faculty/sebastian-scherer/">Sebastian Scherer</UnderlineLink><span className="align-super text-sm leading-none">1</span>
            </span>
          </div>
          <div className="container flex flex-row items-center space-x-8 justify-center text-lg">
            <ArrowLink className='mt-6' href='https://github.com/MAC-VO/MAC-VO' variant={mode} size='large'>
              GitHub Repo
            </ArrowLink>
            <ArrowLink className='mt-6' href='https://arxiv.org/abs/2409.09479' variant={mode} size='large'>
              arXiv Page
            </ArrowLink>
            <ArrowLink className='mt-6' href='https://www.youtube.com/watch?v=O_HowJk-GDw' variant={mode} size='large'>
              Explain Video
            </ArrowLink>
            <ArrowLink className='mt-6' href='https://mac-vo.github.io/wiki/' variant={mode} size='large'>
              Documentation
            </ArrowLink>
          </div>
        </div>
        <div className={clsx("absolute w-auto min-w-full min-h-full max-w-none z-10", maskColor)} />
        <div className="absolute bottom-4 left-4 z-20">
          <p><span className='align-super text-sm'>*</span>Equal Contribution</p>
          <p><span className='align-super text-sm'>1</span>Carnegie Mellon University</p>
          <p><span className='align-super text-sm'>2</span>Shanghai Jiao Tong University</p>
        </div>
        <video
          autoPlay
          loop
          muted
          className="absolute w-auto min-w-full min-h-full max-w-none z-0"
        >
          <source
            src="/video/MACVO_Background.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='text-center pb-4'>Abstract</h2>
          <p className='text-pretty'>
            We propose MAC-VO, a novel learning-based stereo VO that leverages the learned metrics-aware matching uncertainty for dual purposes: selecting keypoint and weighing the residual in pose graph optimization.
            Compared to traditional geometric methods prioritizing texture-affluent features like edges, our keypoint selector employs the learned uncertainty to filter out the low-quality features based on global inconsistency.
            In contrast to the learning-based algorithms that rely on the scale-agnostic weight matrix, we design a metrics-aware spatial covariance model to capture the spatial information during keypoint registration.
            Integrating this covariance model into pose graph optimization enhances the robustness and reliability of pose estimation, particularly in challenging environments with varying illumination, feature density, and motion patterns.
            On public benchmark datasets, MAC-VO outperforms existing VO algorithms, even some SLAM algorithms in challenging environments.
            The covariance-aware framework also provides valuable information about the reliability of the estimated poses, which can benefit decision-making for autonomous systems.
          </p>
        </div>
      </section>

      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout pt-4 pb-4'>
          <h3 className='mt-12 mb-4'>MAC-VO at ICRA 2025</h3>
        </div>
        <div className="wide-layout grid grid-cols-1 lg:grid-cols-12 gap-2 items-stretch pb-12">
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-6">
            <p className='p-2 lg:text-lg rounded-t-xl '>ICRA Registration Lobby</p>
            <div className='flex-grow' />
            <video controls autoPlay loop muted className='rounded-xl mx-auto'>
              <source type="video/mp4" src="/video/ICRA2025_Registration_Lobby.mp4" />
            </video>
            <div className='flex-grow' />
          </div>
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-6">
            <p className='p-2 lg:text-lg rounded-t-xl '>Main Floor <span className='p-1 rounded-lg bg-primary-900 font-light text-primary-500'>Dynamic Scene</span></p>
            <div className='flex-grow' />
            <video controls autoPlay loop muted className='rounded-xl mx-auto'>
              <source type="video/mp4" src="/video/ICRA2025_Main_Level.mp4" />
            </video>
            <div className='flex-grow' />
          </div>
          {/* <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-500 col-span-2"></div> */}
          {/* <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-500 col-span-1"></div> */}
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-5">
            <p className='p-2 lg:text-lg rounded-t-xl '>Presentation Room</p>
            <div className='flex-grow' />
            <video controls autoPlay loop muted className='rounded-xl mx-auto'>
              <source type="video/mp4" src="/video/ICRA2025_Poster_Session.mp4" />
            </video>
            <div className='flex-grow' />
          </div>
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-4">
            <div className='flex-grow' />
            <video controls autoPlay loop muted className='rounded-xl mx-auto'>
              <source type="video/mp4" src="/video/ICRA2025_Poster.mp4" />
            </video>
            <div className='flex-grow' />
          </div>
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-3">
            <div className='flex-grow' />
            <img className='rounded-xl mx-auto' src="/images/Poster.jpg" />
            <div className='flex-grow' />
          </div>
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-500 col-span-2" />
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-2">
            <div className='flex-grow' />
            <img className='rounded-xl mx-auto' src="/images/BastiAndPayload.jpg" />
            <div className='flex-grow' />
          </div>
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-4">
            <div className='flex-grow' />
            <img className='rounded-xl mx-auto' src="/images/Presentation.jpg" />
            <div className='flex-grow' />
          </div>
          <div className="rounded-xl flex flex-col flex-nowrap text-white bg-neutral-900 col-span-4">
            <div className='flex-grow' />
            <img className='rounded-xl mx-auto' src="/images/MACVODemo.jpg" />
            <div className='flex-grow' />
          </div>
        </div>

        <section className={clsx(secondaryBgColor, textColor)}>
          <div className='layout pt-4 pb-4'>
            <h3 className='mt-12 mb-4'>MAC-VO Dense Mapping</h3>
            <p className='py-4 text-lg'>
              By incorporating our uncertainty estimates, we can reliably select feature points for dense mapping <span className='mt-2 font-bold text-primary-600'>without bundle adjustment / multi-frame optimization</span>.
              The video below shows the dense mapping result on EuRoC, <UnderlineLink href="https://rvp-group.net/slam-dataset.html">VBR</UnderlineLink>, TartanAir, and TartanAir v2. <span className='mt-2 font-bold text-primary-600'>No post-processing is applied.</span>
            </p>

            {/* Tab Bar */}
            <div className="flex space-x-2 mt-12">
              {tabLabels.map(label => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={clsx(
                    'text-xl px-4 py-1 rounded-lg transition shadow-md',
                    activeTab === label
                      ? clsx(hlBgColor, 'text-white')
                      : clsx(bgColor, textColor)
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid for the active tab */}
          <div className="wide-layout grid grid-cols-1 lg:grid-cols-12 gap-2 items-stretch pb-12">
            {datasets[activeTab].map(({ title, src, badge, className }) => (
              <div
                key={src}
                className={clsx(
                  'rounded-xl flex flex-col text-white bg-neutral-900',
                  className
                )}
              >
                <p className='p-2 lg:text-lg rounded-t-xl'>
                  {title}{" "}
                  {badge && <span className='p-1 rounded-lg bg-primary-900 font-light text-base text-primary-500'>{badge}</span>}
                </p>
                <div className='flex-grow' />

                <video
                  controls
                  loop
                  muted
                  autoPlay
                  preload="lazy"
                  className='rounded-xl mx-auto'
                >
                  <source src={src} type="video/mp4" />
                </video>

                <div className='flex-grow' />
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4'>Methods</h2>
          <h3 className='pt-4'>System Pipeline</h3>
          <Figure
            img_src="/images/Methods.png"
            caption="MAC-VO System pipeline. First, we use a shared matching network to estimate the depth, flow, and corresponding uncertainty. Secondly, we employ the learned uncertainty to filter out unreliable features. Lastly, we optimize the pose with the metrics-aware covariance model."
            isDark={mode === "dark"}
            idx={1}
          />

          {/* <h3 className='pt-4'>Matching Network</h3>
          <Figure
            img_src='/images/FlowformerCov.png'
            caption={
              <span>
                <span className='font-semibold'>Left: </span>
                Architecture of the uncertainty-aware matching network. We employ the motion aggregator and the iterative update {" "}
                structure to help the covariance module learn the relationship between the covariance estimation and global motion. {" "}
                <span className='font-semibold'>Right:</span> In each iteration, the model captures the inconsistency between the motions. {" "}
                For the <KatexSpan text="$\Delta \sigma$" />, the <span className='text-red-400'>red</span> means increasing the uncertainty, and {" "}
                <span className='text-blue-400'>blue</span> means decreasing the uncertainty.
              </span>
            }
            isDark={mode === "dark"}
            idx={2}
          />


          <h3 className='pt-4'>Uncertainty Aware Keypoint Selector</h3>
          <Figure
            img_src="/images/KPSelector.png"
            caption="We include three filters: Non-minimum Suppression (NMS) filter, a geometric filter, and an uncertainty-based filter. In the KITTI odometry dataset, the uncertainty filter can capture the inconsistency and implicitly filter out the unreliable features on the moving objects in the scene. "
            isDark={mode === "dark"}
            idx={3}
          /> */}

          <h3 className='pt-4'>Metrics-Aware Spatial Covariance</h3>
          <Figure
            img_src="/images/SpatialCovariance.png"
            caption={
              <span>
                a) Depth uncertainty estimated with the presence of matching uncertainty.
                b) Projecting depth and matching uncertainty on sensor plane to 3D space.
                c) Residual <KatexSpan text="$\mathcal{L}_i$" /> for pose graph optimization.
              </span>
            }
            isDark={mode === "dark"}
            idx={2}
          />
        </div>
      </section>
    </main >
  );
}
