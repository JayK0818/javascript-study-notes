# Git

## command

  git-config  Get and set repository or global options.
  git-init    Create an empty Git repository or reinitialize an existing one
  git-clone   Clone a repository into a new directory

  git-add

1. Add file contents to the index. The 'index' holds a snapshot of the content of the working tree, and it is this snapshot that is taken as the contents of the next commit.
2. This command can be performed multiple times before a commit.
3. The **git add** command will not add ignored files by default.

  git-status  Show the working tree status.
  obtain a summary of which files have changes that are staged for the next commit.

  git-diff    Show changes between commits, commit and working tree, etc.

  git-commit  Record changes to the repository.

1. -m / --message='msg': Use the given msg as the commit message.

  git-restore   Restore working tree files.

[git pull文档](https://juejin.cn/post/7389650358539255845)

## Commit规范

1. feat: a new feature
2. fix: a bug fix
3. refactor: a code change that neither fixes a bug nor adds a feature
4. docs: documentation only changes
5. test: add missing tests or correcting existing tests
6. chore: changes that do not modify src or test files, such as updating build tasks, package manager
7. style: code style, changes that do not affect the meaning of the code(white-space, formatting, missing semi-colons ect.)
