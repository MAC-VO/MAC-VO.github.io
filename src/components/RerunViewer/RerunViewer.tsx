import WebView from '@rerun-io/web-viewer-react';

function RerunViewerWrapped(rrd_file: string): JSX.Element {
  return (
    <WebView
      rrd={rrd_file}
      width='100%' height='100%'
    />
  );
}
