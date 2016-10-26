# Issue Reporting
Before posting a new issue/question, please check the [CLOSED](https://github.com/thednp/bootstrap.native/issues?q=is%3Aissue+is%3Aclosed) issues section, maybe your issue have already been solved or your question was already answered.

Please use the [Issues](https://github.com/thednp/bootstrap.native/issues) section to post new issues related to Native Javascript for Bootstrap functionality, npm and / or node.js compatibility. 

**Requirements**
* **version** you are using, 
* **line number** of the script where the issue happens and any **console error** you may have,
* **step by step guide on reproducing the issue** and a **test site** are great for us to investigate and fix it,
* improvements must take into account the namespace of variables in `utils.js` and all files in the `/lib` folder. For instance you cannot use `Affix`, `a` or `afl` as variables for your scripts as they are already defined, all this to avoid clashes with various node.js apps we may build.

# Allowed Pull Requests
The custom scripts/developments may not be suitable for everybody so they may get rejected. Generally the PR must explain the issue in detail, link it from issues section and must be **consistent**.