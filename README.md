# Unduck Nuzzified

Theo's unduck, but with duckduckgo as the default, and urlparam options as well.

```
https://unduck.nuzzas.eu?q=%s
```

If you want a custom default bang use

```
https://unduck.nuzzas.eu?d=<default bang>&q=%s
```

## Theo's original readme:

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

## How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

I solved this by doing all of the work client side. Once you've went to https://unduck.nuzzas.eu once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.
