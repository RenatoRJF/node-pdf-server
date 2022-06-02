const htmlPdf = require("html-pdf");

const pdfTemplate = require("./pdf-templates/proposal/proposal");

module.exports = (fileName, data) => {
  return new Promise((resolve, reject) => {
    const options = {
      header: { height: 48 },
      footer: { height: 48 }
    };

    htmlPdf.create(pdfTemplate(data), options).toFile(fileName, (error) => {
      if (error) {
        reject(error);
      }
      resolve(fileName);
    });
  });
};
