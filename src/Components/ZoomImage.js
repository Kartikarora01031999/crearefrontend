import React, { useEffect } from "react";
const ZoomImage = ({ src, srcZoom,paneRef }) => {
  const imgRef = React.useRef();
  const inlineContainerRef = React.useRef();

  useEffect(() => {
    let Drift;
    if (typeof window !== "undefined") {
      Drift = require("drift-zoom").default;
    }
    new Drift(imgRef.current, {
      paneContainer: paneRef.current,
      inlineContainer: inlineContainerRef.current,
      zoomFactor:2
    });
  }, [paneRef]);

  return (
    <div class="zoom-image container">
      <div className="row">
        <div className="col-md-12" style={{height:'90vh'}}>
          <img
            class="zoom-image__img"
            ref={imgRef}
            src={src}
            style={{cursor:'pointer',objectFit:'contain'}}
            data-zoom={srcZoom}
            width="100%"
            height="100%"
            alt="Zoom here :)"
          />
        </div>
          <div ref={inlineContainerRef} />
      </div>
    </div>
  );
};

export default ZoomImage;
