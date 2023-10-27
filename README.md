# Github branch cycle

1. Pull from origin before creating branch make sure you are on `main` branch.
   - `git switch main`
   - next pull by using `git pull origin main`
2. Check all the available branches
   - `git branch`
3. To go to an existing branch
   - `git switch branch_name`
4. To create a new brach
   - `git checkout -b "new_branch_name"`
   ## Naming format to create a new branch
   - To create a new branch to add feature
     - `feature/new_branch_name`
   - To fix bug or make small changes
     - `fix/new_branch_name`
5. Add the code
   - `git add .`
6. Commit the code
   - `git commit -m "commit message"`
7. Push it into git
   - `git push origin branch_name`
8. Do a pull request in github.

### Do not Merge
