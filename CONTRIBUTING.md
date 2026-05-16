# Contributing to teleproto

Thanks for your interest. teleproto is maintained by one developer; the
quickest path to a merged change is one that's easy to review.

## Before opening a PR

- For small fixes (typos, obvious bugs, missing types) — just send the PR.
- For anything bigger — new features, API changes, refactors — open an
  issue first and describe the approach. Direction is agreed before code
  is written, not after.

## What gets merged

- The change compiles cleanly: `npm run typecheck` passes.
- One logical change per PR. Drive-by reformatting goes in a separate PR.
- The PR description says *why* the change exists; the diff already shows *what*.
- Commit messages follow the existing convention:

      type(scope): short description

  Examples from history: `fix(net): wait for socket close event during
  disconnect`, `feat(updates): add PtsWaiter, ReceivedIdsManager,
  UpdateManager skeleton`.

## Generated code

`teleproto/tl/generated/` is produced by [teleproto_generator/](teleproto_generator/).
Don't edit it by hand. If the schema or output needs to change, change
the generator and regenerate:

    % npm run generate:tl

## Sign-off

All commits should be signed off:

    % git commit -s

This adds a `Signed-off-by` line, indicating you agree your contribution
is given under the project's license (MIT).
