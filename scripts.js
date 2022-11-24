function generateQR() {
    let website = document.getElementById("website").value;
    if (website) {
        let qrcodeContainer = document.getElementById("qrcode");
        qrcodeContainer.innerHTML = "";
        new QRCode(qrcodeContainer, {
            text: website,
            width: 300,
            height: 300,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        document.getElementById("container").style.display = "block";
    } else {
        alert("Enter a Valid URL!");
    }
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
};

$("#downloadQR").click(function() {
    let dataUrl = $('#qrcode img').attr('src');
    downloadURI(dataUrl, 'qrcode.png');
});
