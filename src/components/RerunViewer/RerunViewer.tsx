import WebViewer from '@rerun-io/web-viewer-react';
import { VideoIcon } from "lucide-react";
import React from "react";

import Button from "@/components/buttons/Button";
import PopupWindow from "@/components/RerunViewer/Popup";


type RerunViewerBannerProps = {
  title: string;
  rrd_file: string;
  width?: string;
}

const RerunViewerBanner = ({ title, rrd_file, width = '100%' }: RerunViewerBannerProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  if (expanded) {
    if (typeof (window) === 'undefined') {
      return (
        <PopupWindow onClose={() => setExpanded(false)} title={title} subtitle={rrd_file} />
      );
    } else {
      return (
        <PopupWindow onClose={() => setExpanded(false)} title={title} subtitle={rrd_file}>
          <WebViewer rrd={rrd_file} width={width} height="85vh" />
        </PopupWindow>
      );
    }
  } else {
    return (
      <Button variant="ghost" onClick={() => setExpanded(true)}>{title} &nbsp; <VideoIcon /></Button>
    );
  }
}

export default RerunViewerBanner;
