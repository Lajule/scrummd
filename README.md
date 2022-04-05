# scrummd

```sh
docker run --rm --name slate -p 4567:4567 -v $(pwd)/build:/srv/scrummd/build -v $(pwd)/source:/srv/scrummd/source scrummd serve
```