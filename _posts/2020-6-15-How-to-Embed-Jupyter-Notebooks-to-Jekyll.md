---
layout: post
type: blog
title: How to Embed Jupyter Notebooks to Jekyll
feature-img: "/images/How-to-Embed-Jupyter-Notebooks-to-Jekyll/save-as-jupyter.png"
toc: true
mathjax: true
comments: true
published: true
---

Jupyter Notebook is a good tool for studying and solving problems. In this tutorial, we are going to embed our notebooks into Jekyll posts easily. It is possible to keep original look of the notebook and embed multiple notebooks.



## 1. Setup Layout

Add these lines to `_layouts/post.html` before `<article>` section. You just need to do this configuration only once. 

```html
<script>
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 50 + 'px';
  }
</script>
```



## 2. Save the Notebook as HTML File

As the first thing to do, save your notebook as `.html` file. In Jupyter, save the file with clicking; `File -> Download as -> HTML (.html)`. This file includes everything needed such as images, animations, figures, etc. Save this file into `notebooks` folder in your Jekyll project.

<center><img src="../images/How-to-Embed-Jupyter-Notebooks-to-Jekyll/save-as-jupyter.png" alt="save-as-jupyter" style="zoom: 67%;" /></center>



## 3. Embed the HTML File

Add these lines to `_posts/2020-1-1-Example-Post.md`, or where you want to embed the notebook:
```markdown
<iframe src="../notebooks/example_notebook.html" width="100%" height="100%" scrolling="no" onload="resizeIframe(this)"></iframe>
```



## 4. Custom CSS Style for the Embedded Content

Create a `custom.css` file in notebooks directory (right next to the other notebook html files) and paste the line below:

```css
/* FILL THE SCREEN */
.container { width:100% !important; }

/* REDUCE SHADOW EFFECT */
@media not print {
  #notebook-container {
    padding: 0px;
    -webkit-box-shadow: 0px 0px 2px 2px rgba(87, 87, 87, 0.2);
    box-shadow: 0px 0px 2px 2px rgba(87, 87, 87, 0.2);
  }
}

/* REMOVE EXTRA PADDING AT THE TOP */
div#notebook {
  padding-top: 0px;
}

/* HIDE input[xxx]: TEXT AND REMOVE THE PADDING ON THE LEFT */
/*
div.input_prompt {
  display: none;
}
.prompt {
  min-width: 0ex;
  padding: 0ex;
}
*/
/* OR LESSEN PADDING ON THE LEFT */
.prompt {
  min-width: 10ex;
  padding: 1ex;
}

/* REDUCE BODY PADDING */
body {
  padding: 3px;
}
```



## 5. Example Embedding

This section has an example embedding located below:

<iframe src="../notebooks/example_notebook.html" width="100%" height="100%" scrolling="no" onload="resizeIframe(this)"></iframe>



## 6. Reference

- [https://stackoverflow.com/questions/9975810/make-iframe-automatically-adjust-height-according-to-the-contents-without-using](https://stackoverflow.com/questions/9975810/make-iframe-automatically-adjust-height-according-to-the-contents-without-using)
