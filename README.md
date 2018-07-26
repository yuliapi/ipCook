# ipCook
[Check recipes](https://ip-cook.herokuapp.com/)

Project is powered by Jekyll and Gulp steroids. Before project is build Gulp tasks are executed to resize images, minify and uglify .css and .js.
Application watches local changes in _post and _assets/images, automatically commit to and push to git repo, makes production build and deploy it to heroku. All other changes require manual commits and production build.

## Getting started
### Prerequisites
You need npm to be installed globally

Install [Jekyll](https://jekyllrb.com/docs/installation/)

### Install 
Install dependencies: 
```
npm install
```
### Start local 
Start local development server execute:
```
gulp serve
```
Now local version is available on [http://localhost:4000/]

Post add/edit features are available on main application window or with any markdown text editor in ```_posts/``` folder.

To add or update images:
 1. place new file into ```_assets/images/```.
 2. Update ```src``` field in correspondent post front-matter through local admin page or directly in ```_posts/**.md```
 
### Build static web resource:
```
gulp serve:prod
```

## Build with:
- Jekyll
- Gulp

## Author
Iuliia Pishchulina