import React, { Component } from "react";
import Cropper from "react-easy-crop";

export default class Cropper extends Component {
  state = {
    image: "your-image-url or as base64",
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 3,
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  onZoomChange = (zoom) => {
    this.setState({ zoom });
  };
  render() {
    return (
      <div>
        <Cropper
          image={this.state.image}
          crop={this.state.crop}
          zoom={this.state.zoom}
          aspect={this.state.aspect}
          onCropChange={this.onCropChange}
          onCropComplete={this.onCropComplete}
          onZoomChange={this.onZoomChange}
        />
      </div>
    );
  }
}
