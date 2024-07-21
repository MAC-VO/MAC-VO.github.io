'use client';

import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon, MouseIcon } from 'lucide-react';
import React from 'react';
import '@/lib/env';

import Figure from '@/components/Figure';
import KatexSpan from '@/components/KaTeX';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import RerunViewerInline from '@/components/RerunViewer/InlineViewer';
import RerunViewerPopup from '@/components/RerunViewer/RerunViewer';

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
  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bgColor = mode === 'dark' ? 'bg-dark' : 'bg-white';
  const maskColor = mode === 'dark' ? 'bg-dark/70' : 'bg-white/70';
  const secondaryBgColor = mode === 'dark' ? 'bg-neutral-700' : 'bg-gray-100';
  const buttonText = mode === "dark" ? "☀ Light Mode" : "🌙 Dark Mode";
  const hlTextColor = mode === "dark" ? "text-primary-500" : "text-primary-600";

  return (
    <main>
      <section className={
        clsx(bgColor, textColor,
          "relative flex items-center justify-center h-screen overflow-hidden"
        )
      }>
        <ButtonLink className={clsx('mt-6 absolute top-1 right-2 rounded-md z-20', textColor)} href='' variant="outline" isDarkBg={mode === "dark"} onClick={changeMode}>
          {buttonText}
        </ButtonLink>
        <div className='layout z-20 relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h1 className='mt-4 text-5xl'>MAC-VO: {" "}
            <span className={hlTextColor}>M</span>etrics-<span className={hlTextColor}>A</span>ware {" "}
            <span className={hlTextColor}>C</span>ovariance {" "}
            for Learning-based Stereo{" "}
            <span className={hlTextColor}>V</span>isual {" "}
            <span className={hlTextColor}>O</span>dometry</h1>
          <div className='container py-6'>
            <span className='text-lg font-semibold'>
              Yuheng Qiu*, Yutian Chen*, Zihao Zhang, Wenshan Wang, Sebastian Scherer<br />
            </span>
            <span className='text-lg'>
              Carnegie Mellon University
            </span>
          </div>
          <div className="container flex flex-row items-center space-x-8 justify-center text-lg">
            <ArrowLink className='mt-6' href='/components' variant={mode} size='large'>
              GitHub Repo
            </ArrowLink>
            <ArrowLink className='mt-6' href='/components' variant={mode} size='large'>
              arXiv Page
            </ArrowLink>
          </div>
        </div>
        <div className={clsx("absolute w-auto min-w-full min-h-full max-w-none z-10 backdrop-blur-sm", maskColor)} />
        <div className="absolute bottom-4 left-4 z-20">
          <p>* Equal Contribution.</p>
        </div>
        <video
          autoPlay
          loop
          muted
          className="absolute w-auto min-w-full min-h-full max-w-none z-0"
        >
          <source
            src="/video/SLAM_on_Moon_with_cov.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className={clsx(secondaryBgColor, textColor)}>
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

          <h3 className='pt-4'>Matching Network</h3>

          <h3 className='pt-4'>Uncertainty Aware Keypoint Selector</h3>
          <Figure
            img_src="/images/KPSelector.png"
            caption="We include three filters: Non-minimum Suppression (NMS) filter, a geometric filter, and an uncertainty-based filter. In the KITTI odometry dataset, the uncertainty filter can capture the inconsistency and implicitly filter out the unreliable features on the moving objects in the scene. "
            isDark={mode === "dark"}
            idx={2}
          />

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
            idx={3}
          />
        </div>
      </section>

      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4'>Experiments</h2>
          Some content some content some content <RerunViewerPopup
            title="3D Map Visualization for TartanAirv2, Trajectory E002 "
            rrd_file="https://mac-vo.github.io/rerun/tensor_map_vis.rrd"
          />
        </div>
        <div className='mx-8'>
          <h3 className='pb-4 text-center'>Qualitative Results</h3>
          <div className='flex items-center justify-center gap-8 pb-4'>
            <ArrowLeftIcon size={24} />
            <div className='flex gap-2'><MouseIcon size={24} /><span>Scroll Left/Right</span></div>
            <ArrowRightIcon size={24} />
          </div>
          <div className='flex overflow-x-scroll gap-2'>
            <RerunViewerInline
              title="EuRoC V102"
              rrd_file="https://mac-vo.github.io/rerun/EuRoC_V102_Map.rrd"
              height='500px'
              width='45vw'
            />
            <RerunViewerInline
              title="TartanAir Abandoned Factory 001"
              rrd_file="https://mac-vo.github.io/rerun/TartanAir_AbandonFac_001.rrd"
              height='500px'
              width='45vw'
            />
            <RerunViewerInline
              title="KITTI 07"
              rrd_file="https://mac-vo.github.io/rerun/KITTI_07_Map.rrd"
              height='500px'
              width='45vw'
            />
          </div>
        </div>
        <div className='layout py-12'>
          <h3 className='pb-4'>Quantitative Results</h3>
          Some content some content some content
        </div>
      </section>
    </main >
  );
}
