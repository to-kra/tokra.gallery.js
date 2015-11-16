# tokra.gallery.js
Javascript based gallery using jquery &amp; fancybox
### 1.0 How to use:
Include these in your html:
```html
<!--  Needed 3rd-party for Tokra.Gallery.JS -->
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script>
<!--  Tokra.Gallery.JS-->
<script src="js/tokra.gallery/tokra.gallery.js"></script>
<script src="js/tokra.gallery/tokra.gallery.fancy.js"></script>
<script src="js/tokra.gallery/jquery.fancybox-buttons_modified.js"></script>
<link rel="stylesheet" href="js/tokra.gallery/css/bootstrap.min.css" type="text/css">
<link rel="stylesheet" href="js/tokra.gallery/css/style.css" type="text/css">
```
#### 1.1 Example:
```html
<body>
  <script>
  var container = createMainContainter();
  createHeader(container,
    '<b>Title</b> - Lorem ipsum dolor sit amet',
    '"Quisque at fermentum eros. Duis ut leo ligula.""</br><i>- Lorem Ipsum</i>',
    '8 August 2015',
    'Slovakia',
    'http://www.slovakia.com/');
  var imgs = [
    "11023447_10206302073323641_1639582699385518318_o.jpg",
    "12015067_10206556041552688_236406772129394297_o.jpg",
    "12006644_10206556007311832_390102790220421197_o.jpg",
    "11950206_10206556029312382_1622462668366344700_o.jpg"
    ];
  var thumbnails = [
    "thumb11023447_10206302073323641_1639582699385518318_o.jpg",
    "thumb12015067_10206556041552688_236406772129394297_o.jpg",
    "thumb12006644_10206556007311832_390102790220421197_o.jpg",
    "thumb11950206_10206556029312382_1622462668366344700_o.jpg"
    ];
  var imagesRoot = './static';
  createThumbnails(container, imgs, imagesRoot + '/images/', thumbnails, imagesRoot + '/thumb/', '');//TODO add captions
  createFooter(container, 'seo');
  </script>
</body>
```
#### 1.2 Live example
http://wedding.tokra.sk/
