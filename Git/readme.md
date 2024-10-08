# Git

## command

  git-config  Get and set repository or global options.

```shell
git config --global core.autocrlf false
git config --global pull.rebase true
git config --global user.name 'hello'
gig config --global user.email 'xxx@qq.com'
```

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
  This command can also be used to restore the content in the index with **--staged**, or restore both the working
  tree and the index with **--staged --worktree**

  --staged: 恢复暂存区中的内容到工作区
  --worktree: 恢复工作区中的文件内容到当前工作去状态

  git-reset     Reset current HEAD to the specified state.

1. git-reset --hard:  Resets the index and working tree. Any changes to tracked files in the working tree since commit
are discarded.

  git-rm        Remove files from the working tree and from the index. **git rm** will not remove a file from just your working directory.

[git pull文档](https://juejin.cn/post/7389650358539255845)

  git-branch  List, create or delete branches

1. -d / --delete: Delete a branch.
2. -D shortcut for **--delete --force**
3. -a List both remote-tracking branches and local branches.
4. -l/--List List branches.

  git-checkout  Switch branches or restore working tree files

```shell
git checkout dev
```

  git-switch
  switch to a specified branch. The working tree and index are updated to match the branch.

  git merge
  Join two or more development histories toghter.

  git log
  Show commit logs

  git stash
  Use **git stash** when you want to record the current state of the working directory and the index, but want to
  go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the **HEAD** commit.

1. list:  List the stash entries that you currently have.
2. pop:   Remove a single stashed state from the stash list and apply it on top of the current working tree state.
3. apply [--index]: Like **pop**, but do not remove the state from the stash list.
4. clear: Remove all the stash entries.
5. drop:  Remove a single stash entry from the list of stash entries.

  git-fetch
  Download objects and refs from another repository

  git-pull
  Fetch from and integrate with another repository or a local branch
  **git pull** runs **git fetch** with the given parameters and then depending on configuration options or command
  line flags, will call either **git rebase** or **git merge** to reconcile deverging branches.
  The users needs to specify how to reconcile the divergent branches with **--rebase** or **--no-rebase**.

```shell
git pull --rebase origin dev
```

  git-push
  Update remote refs along with associated objects.

```shell
git push origin dev
```

1. -u / --set-upstream: For every branch that is up to date or successfully pushed, add upstream(tracking) reference,
used by argument-less **git-pull** and other commands.

  git-rebase
  Reapply commits on top of another base tip.
  If branch is specified, **git rebase** will perform an automatic **git switch branch** before doing anything else. Otherwise it remains on the current branch.

  git-revert
  Revert some existing commits
  **git revert** is used to record some new commits to reverse the effect of some earlier commits(ofen only a faulty one.)

## Commit规范

1. feat: a new feature
2. fix: a bug fix
3. refactor: a code change that neither fixes a bug nor adds a feature
4. docs: documentation only changes
5. test: add missing tests or correcting existing tests
6. chore: changes that do not modify src or test files, such as updating build tasks, package manager
7. style: code style, changes that do not affect the meaning of the code(white-space, formatting, missing semi-colons ect.)

  hahahahahhaha

## Hooks

  Hooks are programs you can place in a hooks directory to trigger actions at certain points in git's execution.

### pre-commit

  This hook is invoked by **git-commit** and can be bypassed with the **--no-verify** option.
  Is invoked before obtaining the proposed commit log message and making a commit.
  Exiting with a non-zero status from this script causes the **git commit** command to abort before
  creating a commit.

### commit-msg

  This hook is invoked by **git commit** and **git merge**. It takes a single parameter, the name of the file that
  holds the proposed commit log message.

### pre-auto-gc

  This hook is invoked by **git gc --auto**
