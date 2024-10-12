# Git

  暂存区: stage 或 index. 一般存放在 **.git** 目录下的index文件中。

  Git文件状态分为三种: 工作目录(working directory)、暂存区(Staging area)、本地仓库(Local Repository)。

1. 工作目录:
  Untracked: 新创建的文件, 未被Git记录
  Modified:  已被跟踪的文件发生了更改, 但这些更改未被提交到git记录中

2. 暂存区
  临时存储区, 用于保存即将提交到本地仓库的更改。

```shell
git add <filename>  # 添加指定文件到暂存区
git add .           # 添加所有更改到暂存区
```

1. 本地仓库
  本地仓库是一个隐藏在.git目录中的数据库, 用于存储项目的所有提交历史记录。每次提交更改时, Git会将暂存区中的内容保存到本地仓库中。

```shell
git commit -m 'commit-message' # 提交暂存区的更改到本地仓库
```

## command

  git-config  Get and set repository or global options.

```shell
git config --global core.autocrlf false
git config --global pull.rebase true
git config --global user.name 'hello'
gig config --global user.email 'xxx@qq.com'

git config --list   # 配置列表
git config user.name #用户名

# 通过SSH进行Git操作
ssh-keygen -t rsa -b 4096 -C 'XXX.email@emial.com'
```

  git-init    Create an empty Git repository or reinitialize an existing one
  git-clone   Clone a repository into a new directory

```shell
git clone https://xxx.git directory
# 克隆到指定文件夹
```

  git-add  工作区 ----> 暂存区

1. Add file contents to the index. The 'index' holds a snapshot of the content of the working tree, and it is this snapshot that is taken as the contents of the next commit.
2. This command can be performed multiple times before a commit.
3. The **git add** command will not add ignored files by default.

```shell
git add .       # 暂存所有文件
git add <file>  # 暂存指定文件
git add -p      # 逐块选择要暂存的更改。
  # y:暂存当前块 / n：跳过当前块  / q: 退出暂存
```

  git-status  Show the working tree status.
  obtain a summary of which files have changes that are staged for the next commit.

  git-diff    Show changes between commits, commit and working tree, etc.

```shell
git diff --cached  # 查看暂存区和最后一次提交之间的差异
git diff           # 查看工作区和暂存区之间的差异
```

  git-commit  Record changes to the repository. 暂存区 ---> 版本库

1. -m / --message='msg': Use the given msg as the commit message.

  git-restore   Restore working tree files.
  This command can also be used to restore the content in the index with **--staged**, or restore both the working
  tree and the index with **--staged --worktree**

  --staged: 恢复暂存区中的内容到工作区
  --worktree: 恢复工作区中的文件内容到当前工作去状态

  git-reset     Reset current HEAD to the specified state.

1. git-reset --hard:  Resets the index and working tree. Any changes to tracked files in the working tree since commit
are discarded.

```shell
git reset HEAD                  # 取消已缓存的内容
git reset --mixed(默认)         # 暂存区重置, 工作目录保持不变 (重置git add操作)
git reset --hard HEAD           # 暂存区和工作目录都重置 (删除之前所有的提交信息, 谨慎使用)

git reset HEAD^                # 回退 所有内容到上一个版本 (撤销git add 和 git commit)
git reset HEAD^ hello.js       # 回退 hello.js 文件版本到上一个版本

git reset --soft               # 用户回退到某个版本 (回退到指定的git commit处)
git reset --soft HEAD^^
git reset --soft HEAD~2        # 回退所有内容到 上上一个版本


# a.txt   Hello World
# git add .
# git commit -m 'docs: git-test-1'

# a.txt Hello World 你好世界
# git add .
# git commit -m 'docs: git-test-2'

# git reset --soft HEAD~1
# git push    此时只会提交 git-test-1的内容, 并且第二次 git commit的内容会被退回到暂存区, 需要重新git commit
```

1. git reset HEAD 暂存区的目录树会被重写, 工作区不受影响。

  git-rm        Remove files from the working tree and from the index. **git rm** will not remove a file from just your working directory.

[git pull文档](https://juejin.cn/post/7389650358539255845)

  git-branch  List, create or delete branches

1. -d / --delete: Delete a branch.
2. -D shortcut for **--delete --force**
3. -a List both remote-tracking branches and local branches.
4. -l/--List List branches.

```shell
git branch  # 查看分支
git branch branch-name  #创建分支
git branch -d new-feature # 删除本地分支

# 删除远程仓库分支
git push origin --delete new-feature

git branch -a # 查看本地和远程分支
git branch -r # 查看远程分支
git merge <branch-name> # 将其他分支内容合并到当前分支
```

  合并过程中出现冲突时, Git会标记冲突文件, 需要手动解决冲突。

  git-checkout  Switch branches or restore working tree files

```shell
git checkout dev

git checkout HEAD .
git checkout HEAD --file  #清除工作区中未提交的改动和暂存区中未提交的改动

git checkout .
git checkout --file       #清除工作区中未添加到暂存区中的改动。
```

  git-switch
  switch to a specified branch. The working tree and index are updated to match the branch.

  git merge
  Join two or more development histories together.

```shell
git pull origin main
git merge new-feature
```

  git log
  Show commit logs

  git blame file 以列表形式查看指定文件的历史修改记录

```shell
git log --oneline #以简洁的一行格式显示提交信息
git log --stat    #显示简略统计信息, 包括修改的文件和行数
git log --graph   # 以图形化方式显示分支和合并历史
git log -n 5      # 限制显示的提交数(最近5次提交记录)
```

  git stash
  Use **git stash** when you want to record the current state of the working directory and the index, but want to
  go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the **HEAD** commit.

1. list:  List the stash entries that you currently have.
2. pop:   Remove a single stashed state from the stash list and apply it on top of the current working tree state.
3. apply [--index]: Like **pop**, but do not remove the state from the stash list.
4. clear: Remove all the stash entries.
5. drop:  Remove a single stash entry from the list of stash entries.

```shell
git stash
git stash list
git stash apply # 应用最近一次存储的进度
git stash pop
git stash drop stash@{n}  # 删除特定存储
git stash clear
```

  git-fetch
  Download objects and refs from another repository

  git-pull
  Fetch from and integrate with another repository or a local branch
  **git pull** runs **git fetch** with the given parameters and then depending on configuration options or command
  line flags, will call either **git rebase** or **git merge** to reconcile deverging branches.
  The users needs to specify how to reconcile the divergent branches with **--rebase** or **--no-rebase**.

```shell
git pull --rebase origin dev

# 或者
git fetch origin branch-name
git merge origin/branch-name
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
  **git revert** is used to record some new commits to reverse the effect of some earlier commits(often only a faulty one.)

  git-clean
  Remove untracked files from the working tree

  git-gc
  Cleanup unnecessary files and optimize the local repository

  git-tag
  Create, list, delete, or verify a tag object signed with GPG.
  Add a tag reference in *refs/tags/*, unless *-d/-l/-v* is given to delete, list or verify tags.
  通常用于发布版本(v.1.1.0)

```shell
git tag v1.0
git tag -a v1.0
git tag -a v1.0 -m 'message' # 额外元数据


# 推送标签到远程仓库
git push origin v1.0

# 推送所有标签
git push origin --tags

# 删除本地标签
git tag -d v1.0
# 删除远程标签
git push origin --delete v1.0
```

## gitignore

  A **gitignore** file specifies intentionally untracked files that Git should ignore.

1. A trailing "/**" matches everything inside. "abc/**" matches all files inside directory "abc", relative to the
location of the ".gitignore" file, with infinite depth.

2. A leading "**" followed by a slash means match in all directories. '**/foo' matches file or directory 'foo'
anywhere.

## Commit规范

1. feat: a new feature
2. fix: a bug fix
3. refactor: a code change that neither fixes a bug nor adds a feature
4. docs: documentation only changes
5. test: add missing tests or correcting existing tests
6. chore: changes that do not modify src or test files, such as updating build tasks, package manager
7. style: code style, changes that do not affect the meaning of the code(white-space, formatting, missing semi-colons ect.)

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
