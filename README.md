<p align="center">
  <img src="https://github.com/Lajule/scrummd/blob/master/assets/img/logo.png" alt="Scrummd: Hand-craft your scrum board !">
  <br>
  <a href="https://github.com/Lajule/scrummd/actions/workflows/jekyll.yml"><img src="https://github.com/Lajule/scrummd/actions/workflows/jekyll.yml/badge.svg" alt="Build Status"></a>
</p>

Hand-craft your scrum board and your brundown chart !

![scrummd](https://github.com/Lajule/scrummd/blob/master/scrummd.png)

Scrummd is a [Jekyll][1] skeleton to build a scrum boards. Create simple markdown files, generate the website and it's done !

## Build

To generate the website, use:

```sh
docker run --rm -v "${PWD}:/srv/jekyll" jekyll/jekyll jekyll build
```

Visit `_site` directory to check generated files.

During development, you can use:

```sh
docker run --rm \
       -v "${PWD}:/srv/jekyll" \
       -p 4000:4000 -p 35729:35729 \
       jekyll/jekyll jekyll serve --config _config.yml,_config_development.yml --verbose --livereload
```

Visit `http://localhost:4000` to see your scrum board in live.

## Deployment

Just copy the content of the `_site` directory to the document root of your favorite web server. Following command can be used to start an [nginx][2] container:

```sh
docker run --rm -p 8080:80 -v "${PWD}/_site:/usr/share/nginx/html:ro" nginx
```

##  How to use

You can create two types of pages: **Sprints** or **Tickets**.

Sprints are site pages and have following properties :

Property | Description
---------|------------
title | Name of the sprint
from | First day of the sprint
to | Last day of the sprint

Tickets are contained in `_tickets` collection and have following properties :

Property | Description
---------|------------
ref | TIC-001
title | Name of the ticket
complexity | Complexity of the ticket
assignee | People in charge of the ticket
sprint | Name of the sprint
status | Status of the ticket
created | Creation date of the ticket
updated | Modification date of the ticket

All dates must be defined using following format: `2022-12-17`

Possible ticket status are:

* TO DO
* DOCUMENTATION
* DEVELOPEMENT
* BLOCKED
* REVIEW
* DONE

### How to start a new sprint

```sh
echo "---
layout: sprint
title: Sprint title goes here
from: 2022-12-01
to: 2022-12-15
---
Sprint description goes here.
" >sprint.md
```

### How to add a ticket

```sh
echo "---
layout: ticket
ref: TIC-001
title: Ticket title goes here
complexity: 8
assignee: John McLane
sprint:
status: TODO
created: 2022-11-15
updated:
---
Ticket description goes here.
" >_tickets/ticket.md
```

[1]: https://jekyllrb.com/
[2]: https://www.nginx.com/
