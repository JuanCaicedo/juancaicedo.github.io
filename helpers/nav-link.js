module.exports = function(section, item, options){

  var title   = item.title.toLowerCase();
  var cleaned = title.replace(' ', '-');
  var link    = '/' + section + '/' + cleaned;
  return options.fn({
    link: link,
    title: item.title
  });

};
