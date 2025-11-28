
function makeRobots() {
    let url = document.getElementById("site").value.trim();
    let box = document.getElementById("rbResult");

    if (!url) {
        box.innerHTML = "<p style='color:red;'>Enter a valid website URL.</p>";
        return;
    }

    if (!url.startsWith("http")) {
        box.innerHTML = "<p style='color:red;'>URL must start with http or https.</p>";
        return;
    }

    if (url.endsWith("/")) url = url.slice(0, -1);

    let sitemap1 = url + "/sitemap.xml";
    let sitemap2 = url + "/sitemap-pages.xml";

    let text =
`User-agent: *
Disallow: /search
Disallow: /category/
Disallow: /tag/
Allow: /
Sitemap: ${sitemap1}
Sitemap: ${sitemap2}`;

    box.innerHTML = `
        <h3>Your Robots.txt</h3>
        <textarea id="robotsText">${text}</textarea>
        <button class="copyBtn" onclick="copyRobots()">Copy Text</button>
    `;
}

function copyRobots() {
    let txt = document.getElementById("robotsText");
    txt.select();
    txt.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied!");
}
