# scrummd

Hand-craft your scrum board !

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

### How to add a ticket

