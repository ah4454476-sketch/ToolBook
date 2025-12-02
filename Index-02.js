
(function() {
  const root = document.getElementById("custom-home-root");
  const shadow = root.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    :host { font-family: Arial, sans-serif; display:block; box-sizing:border-box; }

    #wrap { max-width:900px; margin:20px auto; padding:10px; }

    .post-row {
      display:flex;
      align-items:center;
      gap:20px;
      background:#fff;
      padding:20px;
      border-radius:12px;
      box-shadow:0 6px 16px rgba(0,0,0,0.08);
      margin-bottom:20px;
      opacity:0;
      transform: translateX(-50px);
      animation: slideIn 0.6s forwards;
    }

    .post-row.even { flex-direction:row-reverse; transform: translateX(50px); }

    .post-row:hover {
      box-shadow:0 10px 28px rgba(0,0,0,0.12);
      transform: translateX(0) scale(1.02);
      transition:0.4s;
    }

    .post-row img {
      width:260px;
      height:180px;
      object-fit:cover;
      border-radius:12px;
      background:#eee;
      flex-shrink:0;
    }

    .post-content { flex:1; display:flex; flex-direction:column; }

    .post-title {
      font-size:20px;
      color:#b51000;
      margin:0 0 10px 0;
      font-weight:700;
      text-decoration:none;
    }

    .post-excerpt {
      margin:0 0 12px 0;
      font-size:15px;
      color:#444;
    }

    .read-btn {
      background:#b51000;
      color:#fff;
      padding:10px 18px;
      border-radius:8px;
      text-decoration:none;
      font-size:14px;
      width:max-content;
      font-weight:600;
      transition:0.3s;
    }

    .read-btn:hover {
      background:#a00;
      transform: scale(1.05);
    }

    @keyframes slideIn {
      to { opacity:1; transform:translateX(0); }
    }

    @media (max-width:600px) {
      .post-row { flex-direction:column !important; transform:translateX(0) !important; }
      .post-row img { width:100%; height:200px; margin-bottom:10px; }
    }
  `;
  shadow.appendChild(style);

  const wrap = document.createElement("div");
  wrap.id = "wrap";
  wrap.innerHTML = `<div id="posts">Loading…</div>`;
  shadow.appendChild(wrap);

  function cleanExcerpt(html, max = 150) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const txt = div.textContent.trim();
    return txt.length > max ? txt.substring(0, max) + "…" : txt;
  }

  function getImg(entry) {
    const contentHtml = entry.content?.$t || "";
    const match = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    if(match) return match[1];
    if(entry.media$thumbnail) return entry.media$thumbnail.url.replace("/s72-c/","/s1600/");
    return null;
  }

  function renderPosts(list) {
    const box = shadow.getElementById("posts");
    box.innerHTML = "";

    list.forEach((e, i) => {
      const title = e.title.$t;
      const link = (e.link.find(l => l.rel === "alternate") || e.link[0]).href;
      const content = e.content?.$t || "";
      const excerpt = cleanExcerpt(content);
      const img = getImg(e);

      const row = document.createElement("div");
      row.className = "post-row " + (i % 2 === 1 ? "even" : "");

      row.innerHTML = `
        ${img ? `<img src="${img}" alt="${title}">` : ""}
        <div class="post-content">
          <a class="post-title" href="${link}" target="_self">${title}</a>
          <p class="post-excerpt">${excerpt}</p>
          <a class="read-btn" href="${link}" target="_self">Read More</a>
        </div>
      `;

      row.style.animationDelay = (i * 0.15) + "s";
      box.appendChild(row);
    });
  }

  function loadFeed() {
    fetch("/feeds/posts/default?alt=json&max-results=999")
      .then(r => r.json())
      .then(d => {
        const list = d.feed.entry || [];
        renderPosts(list);
      })
      .catch(() => {
        shadow.getElementById("posts").innerHTML =
          `<div style="text-align:center;color:#b51000;">Failed to load posts</div>`;
      });
  }

  loadFeed();
})();
