FROM ruby:2.6-slim

WORKDIR /srv/scrummd

VOLUME /srv/scrummd/build
VOLUME /srv/scrummd/source

EXPOSE 4567

COPY Gemfile .

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        git \
        nodejs \
    && gem install bundler \
    && bundle install \
    && apt-get remove -y build-essential git \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

COPY . /srv/scrummd

RUN chmod +x /srv/scrummd/scrummd.sh

ENTRYPOINT ["/srv/scrummd/scrummd.sh"]
CMD ["build"]
