//= require ./_energize
//= require ./_jquery
;(function () {
    'use strict';

    $(preview);
  
    function preview() {
      $('.ticket').each(function () {
        var ticket = $(this);
        var num = ticket.attr('data-ticket');
        var title = ticket.find('h1').text();

        var sp = 0;
        ticket.find('p').each(function () {
          var re = /Story points: (\d+)/i
          var text = $(this).text();
          var groups = re.exec(text);

          if (groups) {
            sp = groups[1]
          }
        });

        var assignee = ''
        ticket.find('p').each(function () {
          var re = /Assignee: ([A-Za-z0-9_]+)/i
          var text = $(this).text();
          var groups = re.exec(text);

          if (groups) {
            assignee = groups[1]
          }
        });

        console.log(num);
        console.log(title);
        console.log(sp);
        console.log(assignee);

      });
    }
  })();
  