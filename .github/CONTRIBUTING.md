## Contributing to Google Assistant Desktop

First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to this project. These 
are mostly guidelines, not rules. Use your best judgment, and feel free to 
propose changes to this document in a pull request.

### I don't care about this whole thing, I just have a simple question!

If you need an answer, you can either:
  1. Open an issue using the "Question" template, or
  2. Ask the question on [Stack Overflow](https://stackoverflow.com/)

### How can I contribute?

#### Reporting bugs

Before reporting a bug, please make sure it hasn't already been reported 
[here](https://github.com/Dabolus/google-assistant-desktop-unofficial/issues?q=is%3Aissue+label%3Abug).

If the bug you found hasn't been reported yet, create a new issue using the 
"Bug report" template. Besides this, there isn't any specific guideline on how 
the bugs should be reported, Just be sure to be as clear as possible when 
describing it.

#### Suggesting new features

Same as the bug reporting. First of all, check if the new feature has already 
been suggested [here](https://github.com/Dabolus/google-assistant-desktop-unofficial/issues?q=is%3Aissue+label%3Afeature).
If it doesn't exist, create a new issue using the  "Feature request" template.

Keep in mind that what you may find useful might be completely useless for 
other users, so please, make sure that the new feature can actually be useful 
for everyone before proposing it. If you find that it is actually useful only 
for you, consider forking the project and implementing that new feature just 
for yourself.

### Styleguides

#### Commit messages

This project follows the [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/),
so make sure to read and use it properly. Besides that, also make sure to 
include `[ci skip]` or `[skip ci]` in the commit title when only changing 
documentation.

#### Pull Requests

  - Specify what has been changed/added/removed
  - Write a short and concise title. Be more specific in the description
  - Do not include issue numbers in the PR title
  - Be sure to follow all the project coding guidelines. TSLint will definitely 
    give you a big help with this
  - End all files with a newline
  - Add **configuration and bundleable** dependencies as **devDependencies** 
    and **only runtime dependencies** as **normal dependencies**
  - If you need to write platform-dependent code, make sure that you properly 
    check the availability of the functions/methods that you're using, so that your changes don't break the app for other platforms
