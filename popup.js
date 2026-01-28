const listDiv = document.getElementById("cookieList");
const countDiv = document.getElementById("count");
const siteDiv = document.getElementById("site");
const statusDiv = document.getElementById("status");

let currentCookies = [];

async function loadCookies() {
  let tabs = await browser.tabs.query({ active: true, currentWindow: true });
  let tab = tabs[0];
  let url = new URL(tab.url);

  siteDiv.textContent = "Site: " + url.hostname;

  let cookies = await browser.cookies.getAll({ url: tab.url }); // FIX
  currentCookies = cookies;

  listDiv.innerHTML = "";
  countDiv.textContent = "Cookies: " + cookies.length;

  if (cookies.length === 0) {
    listDiv.innerHTML = "<div style='font-size:12px;color:#888'>No cookies</div>";
    return;
  }

  cookies.forEach((c, i) => {
    let row = document.createElement("div");
    row.className = "cookie";

    row.innerHTML = `
      <input type="checkbox" data-index="${i}" checked>
      <span>${c.name}</span>
    `;

    listDiv.appendChild(row);
  });
}

function getSelectedText() {
  let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  if (checkboxes.length === 0) return null;

  let text = "";
  checkboxes.forEach(cb => {
    let c = currentCookies[cb.dataset.index];
    text += `${c.name} = ${c.value}\n`;
  });

  return text;
}

document.getElementById("copyBtn").addEventListener("click", async () => {
  let text = getSelectedText();
  if (!text) {
    statusDiv.textContent = "Nothing selected";
    return;
  }

  await navigator.clipboard.writeText(text);
  statusDiv.textContent = "Copied to clipboard";
});

document.getElementById("exportBtn").addEventListener("click", async () => {
  let text = getSelectedText();
  if (!text) {
    statusDiv.textContent = "Nothing selected";
    return;
  }

  let tabs = await browser.tabs.query({ active: true, currentWindow: true });
  let url = new URL(tabs[0].url);

  let blob = new Blob([text], { type: "text/plain" });
  let downloadUrl = URL.createObjectURL(blob);

  await browser.downloads.download({
    url: downloadUrl,
    filename: `cookies_${url.hostname}.txt`,
    saveAs: true
  });

  statusDiv.textContent = "File saved";
});

loadCookies();
