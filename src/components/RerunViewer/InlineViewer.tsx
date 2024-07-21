import WebViewer from '@rerun-io/web-viewer-react';
import { DownloadIcon, MaximizeIcon } from 'lucide-react';
import React from "react";

import PopupWindow from "@/components/RerunViewer/Popup";


type RerunViewerBannerProps = {
  title: string;
  rrd_file: string;
  height: string;
  width?: string;
}

const RerunViewerInline = ({ title, rrd_file, width = '100%', height }: RerunViewerBannerProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  if (expanded) {
    if (typeof (window) === 'undefined') {
      return (
        <PopupWindow onClose={() => setExpanded(false)} title={title} subtitle={rrd_file} download={rrd_file} />
      );
    } else {
      return (
        <PopupWindow onClose={() => setExpanded(false)} title={title} subtitle={"Data: " + rrd_file} download={rrd_file}>
          <WebViewer rrd={rrd_file} width="100%" height="85vh" />
        </PopupWindow>
      );
    }
  } else {
    return (
      <div className='p-2 rounded-md' style={{ backgroundColor: "#0d1011" }}>
        <div className="px-2 flex justify-between align-middle items-center pb-2">
          <span className="font-semibold leading-6 text-gray-300">{title}</span>
          <span className="text-sm font-normal text-gray-500">{rrd_file}</span>
          <div>
            <a download href={rrd_file}>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 sm:ml-3 sm:w-auto"
              >
                <DownloadIcon size={16} />
              </button>
            </a>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 sm:ml-3 sm:w-auto"
            >
              <MaximizeIcon size={16} />
            </button>
          </div>
        </div>
        {
          typeof (window) === 'undefined' ? null :
            <WebViewer rrd={rrd_file} width={width} height={height} />
        }
      </div>
    );
  }
}

export default RerunViewerInline;
