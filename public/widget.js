(function(){
  const root = document.createElement('div');
  document.body.appendChild(root);
  function load(){
    const s = document.createElement('script');
    s.type = 'module';
    s.src = '/SupportChat.js';
    root.appendChild(s);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',load); else load();
})();
