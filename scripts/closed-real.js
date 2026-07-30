// Real closed-deal data pulled from hirthgroup.com/closed (master list) and each
// deal's detail page. `photo` is a high-res Wix CDN media id rendered on the fly.
// Filled in batches; entries without a photo yet fall back to the branded card.
(function () {
  function img(id) {
    return id ? 'https://static.wixstatic.com/media/' + id + '/v1/fill/w_900,h_600,al_c,q_85,enc_auto/photo' + (id.indexOf('.png') > -1 ? '.png' : '.jpg') : null;
  }
  // [title, address, wixMediaId-or-null]
  const RAW = [
    ['144 N Clark Drive', 'Beverly Hills, CA 90211', null],
    ['2525 E Ball Road', 'Anaheim, CA 92806', 'c5fdc2_9f8541dbe1a546f2bf18b6f767b9826c~mv2.jpg'],
    ['1329 2nd Avenue', 'Los Angeles, CA 90019', 'c5fdc2_8ed8bb0556bf440a9f69564887040843~mv2.jpg'],
    ['1101 Saviers Road', 'Oxnard, CA 93033', 'c5fdc2_34040def46c64b0d9ff8e71a83f5a5a0~mv2.png'],
    ['3015 Durfee Avenue', 'El Monte, CA 91732', 'c5fdc2_86e5e1a5377248968ec4bfcb8e91e2bf~mv2.png'],
    ['2226 Sepulveda Boulevard', 'Los Angeles, CA 90064', 'c5fdc2_cc648c19539e4f138fc09b527588de3d~mv2.webp'],
    ['1217–1223 Centinela Avenue', 'Inglewood, CA', null],
    ['Chipotle — 2929 Berry Street', 'Fort Worth, TX', 'c5fdc2_c4c97a346d804e2d9d8d517e7589f657~mv2.png'],
    ['7569 Woodman Place', 'Van Nuys, CA 91405', 'c5fdc2_c1200dbc08e742a8bcfa30aec37f2a35~mv2.jpg'],
    ['6226 Vineland Avenue', 'North Hollywood, CA 91606', 'c5fdc2_051aab5fc75e489e932dea00d78f35c5~mv2.jpg'],
    ['2319 W Magnolia Boulevard', 'Burbank, CA', 'c5fdc2_2bb5165f62e642fd973be7ac7a4a3a50~mv2.jpg'],
    ['6334 Laurel Canyon Boulevard', 'North Hollywood, CA', null],
    ['130 E Manchester Boulevard', 'Inglewood, CA 90301', null],
    ['10020 Venice Boulevard', 'Culver City, CA 90232', null],
    ['11132 Fleetwood Street', 'Sun Valley, CA 91352', null],
    ['1501 Main Street', 'Venice, CA 90291', null],
    ['14602 Victory Boulevard', 'Van Nuys, CA 91411', null],
    ['3108 W. Magnolia Boulevard', 'Burbank, CA 91505', 'c5fdc2_e39941306d3f42119d696216a94d6bf7~mv2.jpg'],
    ['18934 Ventura Boulevard', 'Tarzana, CA 91356', null],
    ['521–525 Hyde Park Place', 'Inglewood, CA 90302', null],
    ['5358 Cartwright Avenue', 'North Hollywood, CA 91601', null],
    ['7200–7218 S. Broadway', 'Los Angeles, CA 90003', null],
    ['6200 S. Western Avenue', 'Los Angeles, CA 90047', null],
    ['1501 & 1509 W. Magnolia Boulevard', 'Burbank, CA 91506', null],
    ['1327–1337 Abbot Kinney Boulevard', 'Venice, CA 90291', null],
    ['Dollar General Market — 4000 E. 9th Street', 'Texarkana, AR 71854', null],
    ['2700 North Main Street', 'Santa Ana, CA 92705', null],
    ['633 Rose Avenue', 'Venice, CA 90291', null],
    ['13206 Paramount Boulevard', 'South Gate, CA 90280', null],
    ['144 N. Clark Drive', 'Beverly Hills, CA 90211', null],
    ['8023 Golden Avenue', 'South Gate, CA 90280', null],
    ['4220 Lankershim Boulevard', 'North Hollywood, CA 91602', null],
    ['8011 Golden Avenue', 'South Gate, CA 90280', null],
    ['13308 Paramount Boulevard', 'South Gate, CA 90280', null],
    ['8615 Long Beach Boulevard', 'South Gate, CA 90280', null],
    ['1440 W. Manchester Avenue', 'Los Angeles, CA 90047', null],
    ['5051 W. Sunset Boulevard', 'Los Angeles, CA 90027', null],
    ['707–711 Vesta Street', 'Inglewood, CA 90302', null],
    ['3253–3263 E. Cesar E. Chavez Avenue', 'Los Angeles, CA 90063', null],
    ['3920 Birch Street', 'Newport Beach, CA 92660', null],
    ['Los Angeles Portfolio — 3 Properties', 'Los Angeles, CA', null],
    ['2768 & 2780 E. Gage Avenue', 'Huntington Park, CA 90255', null],
    ['1203 N. Velasco Street', 'Angleton, TX 77515', null],
    ['171 N. La Brea Avenue', 'Inglewood, CA 90301', null],
    ['323 E. Beach Avenue', 'Inglewood, CA 90302', null],
    ['5810–5820 Imperial Highway', 'South Gate, CA 90280', null],
    ['Burger King — 1608 N. Tift Avenue', 'Tifton, GA 31794', null],
    ['14557 Friar Street', 'Van Nuys, CA 91411', null],
    ['1633 S. La Cienega Boulevard', 'Los Angeles, CA 90035', null],
    ['1250 & 1270 East Park Street', 'Hollister, CA 95023', null],
  ];
  window.CLOSED_REAL = RAW.map(function (r) {
    return { title: r[0], meta: r[1], status: 'closed', image: img(r[2]), soldPhoto: !r[2] ? false : false };
  });
})();

