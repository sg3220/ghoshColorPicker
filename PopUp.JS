const Button = document.querySelector(".changeColorButton");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
Button.addEventListener("click", async () => {
  const color = chrome.storage.sync.get("color", ({ color }) => {
    console.log("color:", color);
  });
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectionResults) => {
      const [data] = injectionResults;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (err) {
          console.error(err);
        }
        console.log(colorGrid);
      }
    }
  );
});
async function pickColor() {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    console.log(selectedColor);
  } catch (err) {
    console.log(err);
  }
}
