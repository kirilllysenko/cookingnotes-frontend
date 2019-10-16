const readImage = (image) => {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function () {
            let dataUrl = reader.result;
            let base64 = dataUrl.split(',')[1];
            resolve(base64);
        }
    })
}

export default readImage;