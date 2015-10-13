# chibi-prompt
More general version of Chibi.

### Weird stuff
* Fixing the width of the `.command` prompt *fixed* the issue with commands
overflowing their containing `Element`. Bascially the console got messed up
when a command contained a wrapping character but now that that the width of
the console is fixed in CSS this no longer seems to be an issue.