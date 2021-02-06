import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default class User_profile extends Component {
  state = {
    // cropper
    src: null,
    crop: {
      unit: "px",
      width: 300,
      aspect: 1 / 1
    }
  };

  cropFunction = () => {
    const { crop, croppedbase64Image, src, image } = this.state;
    let data = (
      <div className="App">
        <div>
          <input className='chooseFile_hidden1'  type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            minWidth={300}
            minHeight={300}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedbase64Image && (
          <>
            {/* <img
                  alt="Crop"
                  style={{ maxWidth: "100%" }}
                  src={croppedbase64Image}
                /> */}
            <button className='crop_btn1'
              onClick={() => this.props.uploadUserImage(croppedbase64Image)}
            >
              Crop
            </button>
          </>
        )}
        {console.log("croppedbase64Image", croppedbase64Image)}
      </div>
    );
    return data;
  };

  // cropper functions
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    console.log("onCropComplete");
    this.makeClientCrop(crop);
    // this.uploadUserImage;
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    console.log("makeClientCrop");
    if (this.imageRef && crop.width && crop.height) {
      const croppedbase64Image = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      console.log(croppedbase64Image);

      this.setState({ croppedbase64Image });
    }
  }

  getCroppedImg(image, crop, fileName) {
    console.log("getCroppedImg");
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    console.log("ctx", ctx);
    // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");
    return base64Image;
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob(blob => {
    //     if (!blob) {
    //       //reject(new Error('Canvas is empty'));
    //       console.error("Canvas is empty");
    //       return;
    //     }
    //     console.log("blob", blob);
    //     blob.name = fileName;
    //     window.URL.revokeObjectURL(this.fileUrl);
    //     this.fileUrl = window.URL.createObjectURL(blob);
    //     console.error("this.fileUrl", this.fileUrl);
    //     resolve(this.fileUrl);
    //   }, "image/jpeg");
    // });
  }

  render() {
    return <div>{this.cropFunction()}</div>;
  }
}
