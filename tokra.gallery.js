function createTagWithAttrs(container, tagName, tagAttrName, tagAttrValue) {
	var $newElement = $("<" + tagName + "/>" );
	$newElement.attr(tagAttrName, tagAttrValue);
	$(container).append($newElement);
	return $newElement;
}

function createTag(container, tagName) {
	var $newElement = $("<" + tagName + "/>" );
	$(container).append($newElement);
	return $newElement;
}

function setText(container, text) {
	$(container).text(text);
}

function createMainContainter() {
	return createTagWithAttrs($("body"),'div', 'class', 'container');
}

function createHeader(container, text, quote, date, placeName, placeUrl) {
	/* header */
	var divRow = createTagWithAttrs(container,'div', 'class', 'row');
	var divContainterTextCenter = createTagWithAttrs(divRow,'div', 'class', 'container text-center');

	/* header text */
	var divPageHeader = createTagWithAttrs(divContainterTextCenter,'div', 'class', 'page-header');
	var h3 = createTagWithAttrs(divPageHeader,'h3', 'id', 'aName');
	h3.append(text);

	/* motto */
	var pAdes = createTagWithAttrs(divContainterTextCenter,'p', 'id', 'aDes');
	pAdes.attr('class', 'lead');
	pAdes.append(quote);

	/* place */
	var pAtime = createTagWithAttrs(divContainterTextCenter,'p', 'id', 'aTime');
	pAtime.text(date + " @ ");
	var a1 = createTagWithAttrs(pAtime,'a', 'href', placeUrl);
	a1.text(placeName);
}

function createThumbnails(container, images, imagesFolder, thumbnails, thumbnailsFolder, captions) {
	var divRow1 = createTagWithAttrs(container, 'div', 'class', 'row');
	var divContainter = createTagWithAttrs(divRow1, 'div', 'class', 'container');
	var divIdContainter = createTagWithAttrs(divContainter, 'div', 'id', 'container');
	var divRow2 = createTagWithAttrs(divIdContainter, 'div', 'class', 'row');

	$.each(images, function(index, value){
		createThumbnail(divRow2,
			              index,
										imagesFolder + value,
										thumbnailsFolder + thumbnails[index],
										'');
	});
}

function createThumbnail(container, i, img, thumbnailImg, caption) {
	/* thumbnail */
	var divCol4 = createTagWithAttrs(container, 'div', 'class', 'col-4 col-lg-3');
	var divThumbnail = createTagWithAttrs(divCol4, 'div', 'class', 'thumbnail item oImg');
	divThumbnail.attr('id', 'item' + i);
	divThumbnail.attr('rel', 'gallery');
	/* badge tools */
	var divTools = createTagWithAttrs(divThumbnail, 'div', 'class', 'tools');
	var aSelector = createTagWithAttrs(divTools, 'a', 'class', 'selector');
	var spanBadge = createTagWithAttrs(aSelector, 'span', 'class', 'badge');
	spanBadge.text(i+1);
	/* img */
	var _img = img;
	var _imgThumb = thumbnailImg;
	var aFancyBox = createTagWithAttrs(divThumbnail, 'a', 'class', 'fancybox');
	aFancyBox.attr('rel', 'fancybox');
	aFancyBox.attr('href', _img);
	aFancyBox.attr('target', '_blank');
	var divCrop = createTagWithAttrs(aFancyBox, 'div', 'class', 'crop');
	var divImg = createTagWithAttrs(divCrop, 'div', 'class', 'img');
	divImg.attr('style', 'background-image: url(' + _imgThumb + ');');
	var img = createTagWithAttrs(divImg, 'img', 'src', _imgThumb);
	img.attr('alt', 'img' + i);
	/* caption */
	var divCaption = createTagWithAttrs(divThumbnail, 'div', 'class', 'caption');
	var aCaptions = createTagWithAttrs(divCaption, 'a', 'class', 'captions');
	aCaptions.attr('rel', 'captions');
	var pCaption = createTag(divCaption, 'p');
	pCaption.text(caption);
}

function createFooter(container, type) {
	if (type === 'seo') {
		createSeo(container);
	}
}

function createSeo(container) {
	var divRow = createTagWithAttrs(container, 'div', 'class', 'row');
	var divContainterTextCenter = createTagWithAttrs(divRow, 'div', 'class', 'container text-center');
	var p = createTag(divContainterTextCenter, 'p');
	var aSeo = createTagWithAttrs(divContainterTextCenter, 'a', 'href', 'http://seo-servis.cz/source-zdrojovy-kod/12050680');
	aSeo.attr('title', 'SEO Servis, optimalizace pro vyhledávače.');
	var imgSeo = createTagWithAttrs(aSeo, 'img', 'src', 'http://seo-servis.cz/optimised.png');
	imgSeo.attr('alt', 'Seo servis');
}
