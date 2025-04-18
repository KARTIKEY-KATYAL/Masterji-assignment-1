document.getElementById("tweet").addEventListener('click',function(){
    const container = document.body;
      // used this to script and functionality to get screenshot
      html2canvas(container, {
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: null,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "quote.png";
        link.click();
      });
})
