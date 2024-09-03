'use client';

import clsx from 'clsx';
import React from 'react';
import '@/lib/env';

import useDarkMode from '@/lib/storage';

import Figure from '@/components/Figure';
import KatexSpan from '@/components/KaTeX';
import ArrowLink from '@/components/links/ArrowLink';
import RerunViewerInline from '@/components/RerunViewer/InlineViewer';
import RerunViewerPopup from '@/components/RerunViewer/RerunViewer';
import ExternalSwitch from '@/components/Switch';


export default function HomePage() {
  const [mode, toggleMode] = useDarkMode();
  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bgColor = mode === 'dark' ? 'bg-dark' : 'bg-white';
  const maskColor = mode === 'dark' ? 'bg-dark/70' : 'bg-white/70';
  const secondaryBgColor = mode === 'dark' ? 'bg-neutral-700' : 'bg-gray-100';
  const hlTextColor = mode === "dark" ? "text-primary-500" : "text-primary-600";

  return (
    <main>
      <section className={
        clsx(bgColor, textColor,
          "relative flex items-center justify-center h-screen overflow-hidden"
        )
      }>
        <div className='absolute top-6 right-4 z-20'>
          <span>Light Mode </span>
          <ExternalSwitch state={mode === "light"} switch_state={toggleMode} />
        </div>
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
            <ArrowLink className='mt-6' href='/content/Docs' variant={mode} size='large'>
              Documentation
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
          /> */}


          {/* <h3 className='pt-4'>Uncertainty Aware Keypoint Selector</h3>
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

      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4'>Qualitative Results</h2>
          <div className='layout py-4'>
            <RerunViewerInline
              title="TartanAir Abandon Factory 1"
              rrd_file="https://mac-vo.github.io/rerun/TartanAir_AbandonFac_001.rrd"
              fallback_video='/video/Rotate_TartanAir1.mp4'
              height='50vh'
            />
          </div>

          <hr />
          <h4 className='py-4'>TartnaAir v2 Dataset</h4>
          <RerunViewerPopup
            title="Map Visualization for TartanAirv2, Trajectory E002 "
            rrd_file="https://mac-vo.github.io/rerun/tensor_map_vis.rrd"
          />

          <h4 className='py-4'>EuRoC Dataset</h4>
          <RerunViewerPopup
            title="Map Visualization for EuRoC V102"
            rrd_file="https://mac-vo.github.io/rerun/EuRoC_V102_Map.rrd"
          />

          <h4 className='py-4'>KITTI Dataset</h4>
          <RerunViewerPopup
            title="Map Visualization for KITTI Odometry 07"
            rrd_file="https://mac-vo.github.io/rerun/KITTI_07_Map.rrd"
          />
        </div>
        {/* <div className='mx-8'>
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
              fallback_video='/video/Rotate_EuRoC_V102.mp4'
              height='500px'
              width='45vw'
            />
            <RerunViewerInline
              title="TartanAir Abandon Factory 1"
              rrd_file="https://mac-vo.github.io/rerun/TartanAir_AbandonFac_001.rrd"
              fallback_video='/video/Rotate_TartanAir1.mp4'
              height='500px'
              width='45vw'
            />
            <RerunViewerInline
              title="KITTI 07"
              rrd_file="https://mac-vo.github.io/rerun/KITTI_07_Map.rrd"
              fallback_video='/video/Rotate_KITTI07.mp4'
              height='500px'
              width='45vw'
            />
          </div>
        </div> */}
      </section>
    </main >
  );
}
