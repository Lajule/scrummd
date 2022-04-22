# scrummd

Hand-craft your scrum board ! A [Jekyll][1] site to build your scrum board.

```sh
docker run --rm -v $PWD:/srv/jekyll jekyll/jekyll jekyll build
```

```sh
docker run --rm -v $PWD:/srv/jekyll -p 4000:4000 -p 35729:35729 jekyll/jekyll jekyll serve --verbose --livereload
```

## Deployment

```sh
docker run --rm -p 8080:80 -v $PWD/_site:/usr/share/nginx/html:ro nginx
```

##  How to use

### How to start a new sprint

```sh
echo "---
layout: sprint
title: "First sprint"
from: 2022-12-01
to: 2022-12-15
---
Sprint description goes here.
" >first-sprint.md
```

### How to add a ticket

```sh
echo "---
layout: ticket
ref: TIC-003
title: Ticket title goes here
complexity: 8
assignee: John McLane
sprint: "First sprint"
status: "TODO"
created: 2022-11-15
updated: 2022-12-06
---
Ticket description goes here.
" >_tickets/TIC-003.md
```

[1]: https://jekyllrb.com/