var cleanup = function() {
  $(".item .item").unwrap();
  $(".msg").fadeIn().delay(1000).fadeOut();
  $("#progress").fadeOut();
  $('.tagName:empty').parents('.fbPhotosPhotoTagboxBase').remove();
  $('.fbPhotosPhotoTagboxBase:has(.faceboxSuggestion)').remove();

  $("img[src*='_o.jpg']").each(function() {
    $(this).parentsUntil('#container').eq(3).addClass('oImg')
  });

  $(".fancybox").fancybox({
    type: 'image',
    playSpeed: 2000, closeBtn: false, helpers: {buttons: {}},
    openEffect: 'none', closeEffect: 'none', prevEffect: 'none', nextEffect: 'none',
    beforeShow: function() {
      try {
        var t = $(this.element[0].nextSibling).text().slice(0, 80);
        this.title = t.length == 80 ? t + "..." : t;
        var $e = $(this.element[0].parentNode).find('.loadedTag');
        if ($e.length)$('.fancybox-image').after($e.html());
      } catch (e) {
      }
    }
  });

  $('.largeAlbum').click(function(e) {
    $(e.target).find('.fancybox').click();
  });

  var newCaption = !$('.captions>a').length && !$('.caption>a').length;
  var $caption = newCaption ? $(".captions:not(:empty)") : $("a.captions");
  $caption.fancybox({
    autoWidth: true, maxWidth: '500px',
    openEffect: 'none', closeEffect: 'none', prevEffect: 'none', nextEffect: 'none',
    afterLoad: function() {
      this.content = $(this.element[0]).parents('.item').find('.fancybox').html() + (newCaption ? this.content.html().replace(/\n/g, '<br>') : $(this.element[0].parentNode).html().replace(/\n/g, '<br>'));
    }
  });

  $(document).on('mousewheel', ".fancybox-overlay", function(e, delta) {
    var F = $.fancybox;
    if (!e.target.className.match('fancybox-overlay') && $('.fancybox-inner .captions').length) {
      return;
    }
    if (delta !== 0) {
      e.preventDefault();
      if (delta > 0) {
        F.prev();
      } else {
        F.next();
      }
    }
  });

  $('#container').on('click', 'div.dateInd', function() {
    $('div.dateInd>span').add('p.date').toggleClass('vis');
  });

  $('#container').on('click', 'div.commentInd', function(e) {
    e.preventDefault();
    $('div.dateInd>span').toggleClass('vis');
  });

  $("a[rel='comments']").fancybox({
    title: null, autoWidth: true, maxWidth: '500px',
    openEffect: 'none', closeEffect: 'none', prevEffect: 'none', nextEffect: 'none',
    afterLoad: function() {
      var $item = $(this.element[0]).parents('.item');
      this.content = $item.find('.fancybox').html() + $item.find('.loadedComment').html().replace(/\n/g, '<br>');
    },
    afterShow: function() {
      $('.fancybox-inner').css('overflow-y', 'auto');
    }
  });

  $('body').on('keydown', '.fancybox-overlay', function(e) {
    if (e.ctrlKey)$('.fancybox-inner .fbPhotosPhotoTagboxBase').not(document.querySelector('.fbPhotosPhotoTagboxBase:hover')).hide();
  });
  $('body').on('keyup', '.fancybox-overlay', function(e) {
    if (e.which == 17)$('.fancybox-inner .fbPhotosPhotoTagboxBase').show();
  });


  if ($('#filterBar').length && window.Core == undefined) {
    try {
      var $t = $('.item:eq(0)');
      var i = $t.find('img').attr('src');
      var b = $t.find('div.img');
      if (b.css('background-image').match(/\((.*)\)/)[1] != i || $t.html().match(/akamaihd\.net/)) {
        $('div.img').each(function(i, e) {
          var n = $(e).parent().parent()[0].href;
          $(e).css('background-image', 'url("' + (n + '') + '")');
          $(e).find('img').attr('src', n);
        });
      }
    } catch (e) {
    }

    window.Core = {
      filter: {},
      filterTimer: 0,
      filterInited: false,
      filterInit: function() {
        if (!Core.filterInited) {
          Core.filterInited = true;
          $('.filterBar').show().on('click keyup', Core.handleFilter);
          $('#addFilter').click(Core.addFilter);
          $('#resetFilter').click(Core.resetFilter);
        } else {
          $('.filterBar').toggle();
        }
      },
      addFilter: function() {
        $('.filter:last').after($('.filter:first').clone());
        $('.filter:last input').val('');
      },
      resetFilter: function() {
        $('.filter:gt(0)').remove();
        $('#container').find('.row>div').add('.tab-content div').removeClass('hide');
      },
      handleFilter: function() {
        if (Core.filterTimer) {
          clearTimeout(Core.filterTimer);
          Core.filterTimer = 0;
        }
        Core.filterTimer = setTimeout(Core.applyFilter, 500);
      },
      applyFilter: function() {
        var switches = {}, filter = {};
        $('.switch .col-4').each(function(i, e) {
          var type = $(e).find('input[type="checkbox"]').prop("checked");
          if (type) {
            var s = $(e).find('input:checked[type="radio"]');
            switches[s.attr('name')] = s.val() == 'with';
          }
        });
        $('.filter').each(function(i, e) {
          var s = $(e).find('input').val();
          if (s && s.length) {
            var type = $(e).find('select').val();
            if (!filter[type])filter[type] = s;
            else {
              filter[type] += "|" + s;
            }
          }
        });
        if (JSON.stringify(filter).length > 2)switches.filter = filter;
        if (JSON.stringify(Core.filter) === JSON.stringify(switches) || JSON.stringify(switches).length == 2)return;
        Core.filter = switches;
        $('.item').each(function(i, e) {
          var need = true;
          if (switches.caption !== undefined || filter["Caption"]) {
            var caption = $(e).find('.caption').text();
            need = Core.filterSub(switches.caption, caption, filter["Caption"]);
          }
          if (switches.comment !== undefined || filter["Comment"]) {
            var comment = $(e).find('.loadedComment').text();
            need = Core.filterSub(switches.comment, comment, filter["Comment"]);
          }
          if (switches.tag !== undefined || filter["Tag"]) {
            var tag = '';
            $(e).find('.loadedTag .tagName').each(function(i, e) {
              if (!tag.length)tag = $(e).text();
              else {
                tag += "|" + $(e).text();
              }
            });
            need = Core.filterSub(switches.tag, tag, filter["Tag"]);
          }
          $(e).parent().toggleClass('hide', !need);
        });
      },
      filterSub: function(switches, test, filter) {
        var need = true;
        if (switches !== undefined) {
          var s = test ? !!test.length : false;
          need = (switches == s);
        }
        try {
          if (filter)need = !!test.match(new RegExp(filter, "i"));
        } catch (e) {
        }
        return need;
      }
    }
    $('#filterBar').click(Core.filterInit);
  }
}
$(function() {
  $("#cleanup").click(cleanup);
});
setTimeout(cleanup, 2000);
