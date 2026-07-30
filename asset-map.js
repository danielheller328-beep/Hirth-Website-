(function(){
  var M = window.__ASSET_MAP || (window.__ASSET_MAP = {});
  function resolve(v){ return (typeof v === 'string' && M[v]) ? M[v] : v; }
  window.__ASSET = function(p){ return resolve(p); };
  // Redirect <img> src (set via property or attribute) to embedded data URIs
  var proto = HTMLImageElement.prototype;
  var d = Object.getOwnPropertyDescriptor(proto, 'src');
  if (d && d.set) {
    Object.defineProperty(proto, 'src', {
      configurable: true, enumerable: true,
      get: function(){ return d.get.call(this); },
      set: function(v){ d.set.call(this, resolve(v)); }
    });
  }
  var setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(n, v){
    if (n === 'src' || n === 'href') v = resolve(v);
    return setAttr.call(this, n, v);
  };
})();
