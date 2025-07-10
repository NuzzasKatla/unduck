import { bangs } from "./bang";
import "./global.css";

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1>Unduck Nuzzified</h1>
        <p>DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables <a href="https://duckduckgo.com/bang.html" target="_blank">all of DuckDuckGo's bangs.</a></p>
        <p>Adjusted by Nuzzas Katla to have DuckDuckGo as the default instead of Google.</p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input"
            value="https://unduck.nuzzas.eu?q=%s"
            readonly 
          />
          <!--<button class="copy-button">
            <img src="/clipboard.svg" alt="Copy" id="copy-img" />
          </button>-->
        </div>
        <p><br>Also added the option to use url parameters instead of local storage for custom default bangs (in case you'd like to use wikipedia or something!).</p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input-two"
            value="https://unduck.nuzzas.eu?d=<default bang>&q=%s"
            readonly 
          />
          <!--<button class="copy-button-two">
            <img src="/clipboard.svg" alt="Copy" id="copy-img-two" />
          </button>-->
        </div>
        <p><br>And to whom it may concern, I also added a !pid bang for pid.cz, it takes you to the appropriate line, station or stop depending on what you type in (or just searches the website if those don't match). If you're not in Prague, you can most likely ignore this.</p>
      </div>
      <footer class="footer">
        <a href="https://nuzzas.eu" target="_blank">Nuzzas Katla</a>
        •
        <a href="https://x.com/theo" target="_blank">theo</a>
        •
        <a href="https://github.com/NuzzasKatla/unduck" target="_blank">github</a>
      </footer>
    </div>
  `;

  //const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  //const copyIcon = copyButton.querySelector(".copy-img")!;
  //const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;
  
  //const copyButton2 = app.querySelector<HTMLButtonElement>(".copy-button-two")!;
  //const copyIcon2 = copyButton2.querySelector(".copy-img-two")!;
  //const urlInput2 = app.querySelector<HTMLInputElement>(".url-input-two")!;

  /*copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  })
  
  copyButton2.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput2.value);
    copyIcon2.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon2.src = "/clipboard.svg";
    }, 2000);
  });*/
}

const params = new URLSearchParams(new URL(window.location.href).search);
const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? params.get("d") ?? "?";
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
  if (cleanQuery === "")
    return selectedBang ? `https://${selectedBang.d}` : null;

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
