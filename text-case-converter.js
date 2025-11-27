
(function(){
  var ta = document.getElementById('bh-input');
  var status = document.getElementById('bh-status');
  var btnUpper = document.getElementById('bh-upper');
  var btnLower = document.getElementById('bh-lower');
  var btnTitle = document.getElementById('bh-title');
  var btnPaste = document.getElementById('bh-paste');
  var btnCopy = document.getElementById('bh-copy');
  var btnClear = document.getElementById('bh-clear');

  function showStatus(msg,type){
    status.textContent = msg;
    status.className = 'bh-status ' + (type||'');
    clearTimeout(status._timer);
    status._timer = setTimeout(()=>{status.textContent='';status.className='bh-status';},3000);
  }

  function toTitleCase(str){
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  btnUpper.onclick = () => {ta.value = ta.value.toUpperCase();showStatus('Converted to UPPERCASE','success');};
  btnLower.onclick = () => {ta.value = ta.value.toLowerCase();showStatus('Converted to lowercase','success');};
  btnTitle.onclick = () => {ta.value = toTitleCase(ta.value);showStatus('Converted to Title Case','success');};
  btnClear.onclick = () => {ta.value='';showStatus('Text cleared','success');};

  btnCopy.onclick = async () => {
    if(!ta.value){showStatus('Nothing to copy','error');return;}
    try{await navigator.clipboard.writeText(ta.value);showStatus('Copied to clipboard','success');}
    catch(e){showStatus('Copy failed','error');}
  };

  btnPaste.onclick = async () => {
    try{
      const text = await navigator.clipboard.readText();
      insertAtCursor(text);
      showStatus('Text pasted','success');
    }catch(e){showStatus('Paste not supported','error');}
  };

  function insertAtCursor(text){
    const start = ta.selectionStart||0, end = ta.selectionEnd||0;
    const before = ta.value.substring(0,start), after = ta.value.substring(end);
    ta.value = before + text + after;
    ta.selectionStart = ta.selectionEnd = start + text.length;
    ta.focus();
  }
})();
