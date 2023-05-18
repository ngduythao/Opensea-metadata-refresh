// From which Token ID it should start refreshing?
const from = 1;

// Up-to which Token ID it should keep refreshing?
const to = 10;

/* ---------------------------------------- Do not change anything below this comment---------------------------------------------------------- */

const secondsPerItem = 5000;

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const getElementByXpath = (document, path) => {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const refreshMetadata = async () => {
  for (let i = from; i <= to; i++) {
    await timer(secondsPerItem);
    const collectionUrl = window.location.href.split("/").slice(0, -1).join("/") + "/";
    const nextUrl = collectionUrl + i;
    const nextWindow = window.open(nextUrl);
    nextWindow.addEventListener(
      "load",
      async function () {
        moreBtn = getElementByXpath(nextWindow.document, "//button[@aria-label='More']");
        if (!moreBtn) {
            nextWindow.close();
            return;
        };
        moreBtn.click();
        await timer(1000);
        refreshBtn = getElementByXpath(nextWindow.document, "//button[contains(., 'Refresh metadata')]");
        if (!refreshBtn) {
            nextWindow.close();
            return;
        }
        refreshBtn.click();
        nextWindow.blur();
        await timer(1000);
        nextWindow.close();
      },
      false
    );
  }
}
refreshMetadata();