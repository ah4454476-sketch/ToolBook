
const postLinks = Array.from(document.querySelectorAll('#postLinks li')).map(li => li.textContent.trim());

function escapeHtml(str){return String(str||"").replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}

function getHD(entry){
  let img="";
  if(entry.media$thumbnail?.url){
    img = entry.media$thumbnail.url.replace(/\/s\d+(-c)?\//,"/s1600/").replace(/=s\d+(-c)?/,"=s1600");
  } else if(entry.content?.$t){
    const m=entry.content.$t.match(/<img[^>]+src="([^">]+)"/i);
    if(m){img = m[1].replace(/\/s\d+(-c)?\//,"/s1600/");}
  }
  return img || "https://via.placeholder.com/1600x900/eeeeee/999999?text=No+Image";
}

const container=document.getElementById("bloggerGrid");

postLinks.forEach(link=>{
  const blog=new URL(link).origin;
  const card=document.createElement("div");
  card.className="post-card";
  card.innerHTML="<div style='padding:40px;text-align:center;color:#888;'>Loading…</div>";
  container.appendChild(card);

  const cb="cb_"+Math.random().toString(36).slice(2);
  window[cb]=data=>{
    delete window[cb];
    document.head.removeChild(script);
    const entry=data.feed?.entry?.find(e=>e.link?.some(l=>l.rel==="alternate" && l.href===link));

    if(entry){
      const title=entry.title.$t;
      const snippet=(entry.summary?.$t||"").replace(/<[^>]+>/g,"").slice(0,140);
      const img=getHD(entry);

      card.innerHTML=`
        <a href="${escapeHtml(link)}">
          <img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" loading="lazy">
          <div class="body">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(snippet)}</p>
          </div>
        </a>`;
    } else {
      card.innerHTML=`<a href="${escapeHtml(link)}"><div class="body"><h3>${escapeHtml(link)}</h3></div></a>`;
    }
  };

  const script=document.createElement("script");
  script.src=`${blog}/feeds/posts/default?alt=json-in-script&max-results=500&callback=${cb}`;
  document.head.appendChild(script);
});

// Search Function
function doSearch(){
  const term=document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".post-card").forEach(card=>{
    const txt=card.innerText.toLowerCase();
    card.style.display = txt.includes(term) ? "" : "none";
  });
}
document.getElementById("searchBtn").addEventListener("click",doSearch);
document.getElementById("searchInput").addEventListener("keypress",e=>{
  if(e.key==="Enter") doSearch();
});
