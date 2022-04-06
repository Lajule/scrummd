# Markdown
set :markdown_engine, :redcarpet
set :markdown,
    fenced_code_blocks: true,
    smartypants: true,
    disable_indented_code_blocks: true,
    prettify: true,
    strikethrough: true,
    tables: true,
    with_toc_data: true,
    no_intra_emphasis: true

activate :syntax

activate :sprockets

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :relative_assets
set :relative_links, true

configure :build do
  activate :minify_css
  activate :minify_javascript
end
