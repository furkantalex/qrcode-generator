SVGElement.prototype.getTransformToElement =
  SVGElement.prototype.getTransformToElement ||
  function (toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
  };

let qrcodeContainer = document.getElementById("qrcode");

function generateQR() {
    let website = document.getElementById("website").value;
    var options = {
      text: website,
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
      crossOrigin: "anonymous",
      quietZone: 0,
      quietZoneColor: "rgba(0,0,0,0)",
      drawer: "svg",
    };
    if (website) {
        let qrcodeContainer = document.getElementById("qrcode");
        new QRCode(qrcodeContainer, options);
        document.getElementById("container").style.display = "block";
    } else {
        alert("Enter a Valid URL!");
    }
}

function download(filename, text) {
  var element = document.createElement("a");
  console.log(text);
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

document.getElementById("downloadQR").addEventListener(
  "click",
  function () {
    var text = qrcodeContainer.innerHTML;
    console.log(text);
    var filename = "qrcode.svg";
    download(filename, text);
  },
  false
);

function nestedSvgToGroup(svg, groupMatrix = 0) {
  let svgSub = svg;
  if (svg.parentNode) {
    let parent = svg.parentNode.closest("svg");
    let svgSubChildren = [...svgSub.children];
    groupMatrix = groupMatrix ? groupMatrix : transFormToMatrix(svgSub);

    //replace nested svg with group - apply matrix
    let group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("svgNest");
    group.setAttribute("transform", `matrix( ${groupMatrix} )`);

    //copy children to group
    svgSubChildren.forEach(function (child, i) {
      group.appendChild(child);
    });
    //remove nested svg
    svgSub.replaceWith(group);
  }
}

function transFormToMatrix(el) {
  let type = el.nodeName.toLowerCase();
  let matrixString = "";
  let types = [
    "path",
    "polygon",
    "polyline",
    "rect",
    "ellipse",
    "circle",
    "line",
    "text",
    "g",
    "svg"
  ];
  if (types.indexOf(type) !== -1) {
    // get el matrix
    let matrix = el.getTransformToElement(el.parentNode.closest("svg"));
    let [a, b, c, d, e, f] = [
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.e,
      matrix.f
    ];
    matrixString = [a, b, c, d, e, f].join(" ");
    //exclude non transformed elements
    if (matrixString != "1 0 0 1 0 0") {
      el.setAttribute("transform", `matrix(${matrixString})`);
      el.removeAttribute("transform-origin");
    }
  }
  return matrixString;
}
