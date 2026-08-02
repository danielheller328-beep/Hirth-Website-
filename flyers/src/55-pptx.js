/* ══════════════════════════════════════════════════════════════════════════
   55-pptx.js — three slides in one file

   The host confirms every save, one file at a time. Three files is three
   confirmations, which is not what "download the post" should feel like.
   One file is one confirmation, so the post has to become one file.

   The obvious container is a zip, and the next obvious one is a PDF, and
   neither is on the list of extensions the host will accept. A .pptx is —
   and a .pptx is a zip, with each image full-bleed on its own page. Three
   slides, three pages, one download. It opens in Keynote, PowerPoint,
   Google Slides and Preview, and every one of them will export the pages
   back out as images.

   It is written here rather than pulled from a library: stored, not
   deflated, because a PNG is already compressed and deflating it again buys
   nothing but a dependency.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── zip ──────────────────────────────────────────────────────────────── */
const _crc = (function () {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(b) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < b.length; i++) c = _crc[(c ^ b[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function zipBlob(files, mime) {              /* [{ name, bytes }] */
  const enc = new TextEncoder(), parts = [], dir = [];
  let at = 0;
  files.forEach(f => {
    const nm = enc.encode(f.name), crc = crc32(f.bytes), n = f.bytes.length;
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true);
    lh.setUint32(14, crc, true); lh.setUint32(18, n, true); lh.setUint32(22, n, true);
    lh.setUint16(26, nm.length, true);
    parts.push(new Uint8Array(lh.buffer), nm, f.bytes);

    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true); cd.setUint16(4, 20, true); cd.setUint16(6, 20, true);
    cd.setUint32(16, crc, true); cd.setUint32(20, n, true); cd.setUint32(24, n, true);
    cd.setUint16(28, nm.length, true); cd.setUint32(42, at, true);
    dir.push(new Uint8Array(cd.buffer), nm);
    at += 30 + nm.length + n;
  });
  const dirSize = dir.reduce((a, b) => a + b.length, 0);
  const eo = new DataView(new ArrayBuffer(22));
  eo.setUint32(0, 0x06054b50, true);
  eo.setUint16(8, files.length, true); eo.setUint16(10, files.length, true);
  eo.setUint32(12, dirSize, true); eo.setUint32(16, at, true);
  return new Blob(parts.concat(dir, [new Uint8Array(eo.buffer)]),
    { type: mime || 'application/zip' });
}

/* ── the parts of a presentation ──────────────────────────────────────────
   The smallest set of files PowerPoint will open without complaint: the
   content types, the package relationships, a presentation, one master, one
   layout, a theme, and then a slide per image.
   ─────────────────────────────────────────────────────────────────────── */
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
const NS_P = 'http://schemas.openxmlformats.org/presentationml/2006/main';
const NS_A = 'http://schemas.openxmlformats.org/drawingml/2006/main';
const NS_R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

function pptxContentTypes(n) {
  let s = XML + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
    + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
    + '<Default Extension="xml" ContentType="application/xml"/>'
    + '<Default Extension="png" ContentType="image/png"/>'
    + '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>'
    + '<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>'
    + '<Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>'
    + '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>';
  for (let i = 1; i <= n; i++)
    s += '<Override PartName="/ppt/slides/slide' + i + '.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>';
  return s + '</Types>';
}

function pptxRootRels() {
  return XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="' + NS_R + '/officeDocument" Target="ppt/presentation.xml"/>'
    + '</Relationships>';
}

function pptxPresentation(n, cx, cy) {
  let ids = '';
  for (let i = 1; i <= n; i++) ids += '<p:sldId id="' + (255 + i) + '" r:id="rId' + (i + 1) + '"/>';
  return XML + '<p:presentation xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '">'
    + '<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>'
    + '<p:sldIdLst>' + ids + '</p:sldIdLst>'
    + '<p:sldSz cx="' + cx + '" cy="' + cy + '"/>'
    + '<p:notesSz cx="' + cx + '" cy="' + cy + '"/>'
    + '</p:presentation>';
}

function pptxPresentationRels(n) {
  let s = XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="' + NS_R + '/slideMaster" Target="slideMasters/slideMaster1.xml"/>';
  for (let i = 1; i <= n; i++)
    s += '<Relationship Id="rId' + (i + 1) + '" Type="' + NS_R + '/slide" Target="slides/slide' + i + '.xml"/>';
  s += '<Relationship Id="rId' + (n + 2) + '" Type="' + NS_R + '/theme" Target="theme/theme1.xml"/>';
  return s + '</Relationships>';
}

/* an empty tree, reused by the master and the layout */
function emptyTree(name) {
  return '<p:cSld><p:spTree>'
    + '<p:nvGrpSpPr><p:cNvPr id="1" name="' + name + '"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>'
    + '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>'
    + '<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>'
    + '</p:spTree></p:cSld>';
}
const CLR_MAP = '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1"'
  + ' accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5"'
  + ' accent6="accent6" hlink="hlink" folHlink="folHlink"/>';

function pptxMaster() {
  return XML + '<p:sldMaster xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '">'
    + emptyTree('Master') + CLR_MAP
    + '<p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>'
    + '</p:sldMaster>';
}
function pptxMasterRels() {
  return XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="' + NS_R + '/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>'
    + '<Relationship Id="rId2" Type="' + NS_R + '/theme" Target="../theme/theme1.xml"/>'
    + '</Relationships>';
}
function pptxLayout() {
  return XML + '<p:sldLayout xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '" type="blank" preserve="1">'
    + emptyTree('Layout') + '<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>'
    + '</p:sldLayout>';
}
function pptxLayoutRels() {
  return XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="' + NS_R + '/slideMaster" Target="../slideMasters/slideMaster1.xml"/>'
    + '</Relationships>';
}

/* one image, full bleed, filling the page */
function pptxSlide(i, cx, cy) {
  return XML + '<p:sld xmlns:a="' + NS_A + '" xmlns:r="' + NS_R + '" xmlns:p="' + NS_P + '">'
    + '<p:cSld><p:spTree>'
    + '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>'
    + '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>'
    + '<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>'
    + '<p:pic>'
    + '<p:nvPicPr><p:cNvPr id="2" name="Slide ' + i + '"/>'
    + '<p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>'
    + '<p:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>'
    + '<p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm>'
    + '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr>'
    + '</p:pic>'
    + '</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>';
}
function pptxSlideRels(i) {
  return XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="' + NS_R + '/image" Target="../media/image' + i + '.png"/>'
    + '<Relationship Id="rId2" Type="' + NS_R + '/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>'
    + '</Relationships>';
}

/* the theme is required by the master; this is the smallest one that opens */
function pptxTheme() {
  const dk = c => '<a:srgbClr val="' + c + '"/>';
  const scheme = '<a:clrScheme name="Hirth">'
    + '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>'
    + '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>'
    + '<a:dk2>' + dk('0B0F14') + '</a:dk2><a:lt2>' + dk('F2ECE0') + '</a:lt2>'
    + '<a:accent1>' + dk('6FB6E8') + '</a:accent1><a:accent2>' + dk('C6A461') + '</a:accent2>'
    + '<a:accent3>' + dk('1C5C86') + '</a:accent3><a:accent4>' + dk('9A7A3E') + '</a:accent4>'
    + '<a:accent5>' + dk('14222B') + '</a:accent5><a:accent6>' + dk('AEBFC9') + '</a:accent6>'
    + '<a:hlink>' + dk('6FB6E8') + '</a:hlink><a:folHlink>' + dk('9A7A3E') + '</a:folHlink>'
    + '</a:clrScheme>';
  const font = t => '<a:' + t + 'Font script="" typeface=""/>';
  const fonts = '<a:fontScheme name="Hirth">'
    + '<a:majorFont><a:latin typeface="Calibri Light"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>'
    + '<a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont>'
    + '</a:fontScheme>';
  const fillStyle = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
  const lnStyle = '<a:ln w="6350" cap="flat" cmpd="sng" algn="ctr">' + fillStyle
    + '<a:prstDash val="solid"/></a:ln>';
  const fmt = '<a:fmtScheme name="Hirth">'
    + '<a:fillStyleLst>' + fillStyle + fillStyle + fillStyle + '</a:fillStyleLst>'
    + '<a:lnStyleLst>' + lnStyle + lnStyle + lnStyle + '</a:lnStyleLst>'
    + '<a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle>'
    + '<a:effectStyle><a:effectLst/></a:effectStyle>'
    + '<a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>'
    + '<a:bgFillStyleLst>' + fillStyle + fillStyle + fillStyle + '</a:bgFillStyleLst>'
    + '</a:fmtScheme>';
  return XML + '<a:theme xmlns:a="' + NS_A + '" name="Hirth">'
    + '<a:themeElements>' + scheme + fonts + fmt + '</a:themeElements>'
    + '<a:objectDefaults/><a:extraClrSchemeLst/></a:theme>';
}

/* ── the file ─────────────────────────────────────────────────────────── */
const EMU_PER_PX = 9525;                     /* 914400 EMU / 96 px per inch */
const PPTX_MIME = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

async function pptxBlob(shots) {
  const enc = new TextEncoder();
  const px = await imageSize(shots[0].url);
  const cx = Math.round(px.w * EMU_PER_PX), cy = Math.round(px.h * EMU_PER_PX);
  const n = shots.length;
  const files = [
    { name: '[Content_Types].xml', bytes: enc.encode(pptxContentTypes(n)) },
    { name: '_rels/.rels', bytes: enc.encode(pptxRootRels()) },
    { name: 'ppt/presentation.xml', bytes: enc.encode(pptxPresentation(n, cx, cy)) },
    { name: 'ppt/_rels/presentation.xml.rels', bytes: enc.encode(pptxPresentationRels(n)) },
    { name: 'ppt/slideMasters/slideMaster1.xml', bytes: enc.encode(pptxMaster()) },
    { name: 'ppt/slideMasters/_rels/slideMaster1.xml.rels', bytes: enc.encode(pptxMasterRels()) },
    { name: 'ppt/slideLayouts/slideLayout1.xml', bytes: enc.encode(pptxLayout()) },
    { name: 'ppt/slideLayouts/_rels/slideLayout1.xml.rels', bytes: enc.encode(pptxLayoutRels()) },
    { name: 'ppt/theme/theme1.xml', bytes: enc.encode(pptxTheme()) }
  ];
  for (let i = 1; i <= n; i++) {
    files.push({ name: 'ppt/slides/slide' + i + '.xml', bytes: enc.encode(pptxSlide(i, cx, cy)) });
    files.push({ name: 'ppt/slides/_rels/slide' + i + '.xml.rels', bytes: enc.encode(pptxSlideRels(i)) });
    files.push({ name: 'ppt/media/image' + i + '.png', bytes: dataToBytes(shots[i - 1].url) });
  }
  return zipBlob(files, PPTX_MIME);
}

function dataToBytes(url) {
  const bin = atob(url.slice(url.indexOf(',') + 1));
  const a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return a;
}
function imageSize(url) {
  return new Promise(res => {
    const im = new Image();
    im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight });
    im.onerror = () => res({ w: FW, h: FH });
    im.src = url;
  });
}

/* ── the same three pages, as a document ──────────────────────────────────
   A second container, tried when the first is refused. Whether a view will
   take a .pptx and whether it will take a .docx are two separate answers,
   and one download of everything is worth asking twice for. A .docx is a
   zip as well: three pages, one full-bleed image each, and Word, Pages and
   Google Docs all export the images back out.
   ─────────────────────────────────────────────────────────────────────── */
const NS_W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const NS_WP = 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing';
const NS_PIC = 'http://schemas.openxmlformats.org/drawingml/2006/picture';

function docxContentTypes() {
  return XML + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
    + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
    + '<Default Extension="xml" ContentType="application/xml"/>'
    + '<Default Extension="png" ContentType="image/png"/>'
    + '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
    + '</Types>';
}
function docxRootRels() {
  return XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    + '<Relationship Id="rId1" Type="' + NS_R + '/officeDocument" Target="word/document.xml"/>'
    + '</Relationships>';
}
function docxDocRels(n) {
  let s = XML + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
  for (let i = 1; i <= n; i++)
    s += '<Relationship Id="rId' + i + '" Type="' + NS_R + '/image" Target="media/image' + i + '.png"/>';
  return s + '</Relationships>';
}
function docxDocument(n, cx, cy, tw, th) {
  let body = '';
  for (let i = 1; i <= n; i++) {
    body += '<w:p><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr><w:r><w:drawing>'
      + '<wp:inline distT="0" distB="0" distL="0" distR="0">'
      + '<wp:extent cx="' + cx + '" cy="' + cy + '"/>'
      + '<wp:docPr id="' + i + '" name="Slide ' + i + '"/>'
      + '<a:graphic xmlns:a="' + NS_A + '"><a:graphicData uri="' + NS_PIC + '">'
      + '<pic:pic xmlns:pic="' + NS_PIC + '">'
      + '<pic:nvPicPr><pic:cNvPr id="' + i + '" name="Slide ' + i + '.png"/><pic:cNvPicPr/></pic:nvPicPr>'
      + '<pic:blipFill><a:blip r:embed="rId' + i + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
      + '<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm>'
      + '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
      + '</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>';
    if (i < n) body += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
  }
  return XML + '<w:document xmlns:w="' + NS_W + '" xmlns:r="' + NS_R + '"'
    + ' xmlns:wp="' + NS_WP + '" xmlns:a="' + NS_A + '">'
    + '<w:body>' + body
    + '<w:sectPr><w:pgSz w:w="' + tw + '" w:h="' + th + '"/>'
    + '<w:pgMar w:top="0" w:right="0" w:bottom="0" w:left="0" w:header="0" w:footer="0" w:gutter="0"/>'
    + '</w:sectPr></w:body></w:document>';
}
const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const TWIPS_PER_PX = 15;                     /* 1440 twips per inch / 96 px */

async function docxBlob(shots) {
  const enc = new TextEncoder();
  const px = await imageSize(shots[0].url);
  const cx = Math.round(px.w * EMU_PER_PX), cy = Math.round(px.h * EMU_PER_PX);
  const tw = Math.round(px.w * TWIPS_PER_PX), th = Math.round(px.h * TWIPS_PER_PX);
  const n = shots.length;
  const files = [
    { name: '[Content_Types].xml', bytes: enc.encode(docxContentTypes()) },
    { name: '_rels/.rels', bytes: enc.encode(docxRootRels()) },
    { name: 'word/document.xml', bytes: enc.encode(docxDocument(n, cx, cy, tw, th)) },
    { name: 'word/_rels/document.xml.rels', bytes: enc.encode(docxDocRels(n)) }
  ];
  for (let i = 1; i <= n; i++)
    files.push({ name: 'word/media/image' + i + '.png', bytes: dataToBytes(shots[i - 1].url) });
  return zipBlob(files, DOCX_MIME);
}

/* every container this page knows how to write, hardest-wearing first */
const DECK_FORMATS = [
  { ext: 'pptx', make: pptxBlob },
  { ext: 'docx', make: docxBlob }
];
