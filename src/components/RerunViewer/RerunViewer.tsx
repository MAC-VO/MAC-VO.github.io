import WebViewer from '@rerun-io/web-viewer-react';
import { VideoIcon } from "lucide-react";
import React from "react";

import UnderlineLink from '@/components/links/UnderlineLink';
import PopupWindow from "@/components/RerunViewer/Popup";


type RerunViewerBannerProps = {
  title: string;
  rrd_file: string;
  width?: string;
}

const RerunViewerPopup = ({ title, rrd_file, width = '100%' }: RerunViewerBannerProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  if (expanded) {
    if (typeof (window) === 'undefined') {
      return (
        <PopupWindow onClose={() => setExpanded(false)} title={title} subtitle={rrd_file} download={rrd_file} />
      );
    } else {
      return (
        <PopupWindow onClose={() => setExpanded(false)} title={title} subtitle={"Data: " + rrd_file} download={rrd_file}>
          <WebViewer rrd={rrd_file} width={width} height="85vh" />
        </PopupWindow>
      );
    }
  } else {
    return (
      <UnderlineLink className='text-primary-500' href="" onClick={() => setExpanded(true)}>{title} &nbsp; <VideoIcon /></UnderlineLink>
    );
  }
}

export default RerunViewerPopup;
