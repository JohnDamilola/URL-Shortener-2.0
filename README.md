<p align="center">
  URL Shortener 2.0
</p>

<p align="center">
  <a href="https://github.com/JohnDamilola/URL-Shortener-2.0/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/johndamilola/URL-Shortener-2.0?style=plastic"></a>
  <img src="https://img.shields.io/github/languages/count/johndamilola/URL-Shortener-2.0">
  <a href="https://github.com/JohnDamilola/URL-Shortener-2.0/graphs/contributors" alt="Contributors">
<img src="https://img.shields.io/github/contributors/JohnDamilola/URL-Shortener-2.0?style=plastic"/> </a>
<a href="https://github.com/JohnDamilola/URL-Shortener-2.0/actions/workflows/test.yml" alt="Python application">
<img src="https://github.com/JohnDamilola/URL-Shortener-2.0/actions/workflows/test.yml/badge.svg?style=plastic?branch=main"/> </a>
<a href="https://github.com/JohnDamilola/URL-Shortener-2.0/actions/workflows/Coverage.yml/badge.svg" alt="Code coverage">
<img src="https://github.com/JohnDamilola/URL-Shortener-2.0/actions/workflows/Coverage.yml/badge.svg"/> </a>
<a href="https://app.codecov.io/gh/JohnDamilola/URL-Shortener-2.0" alt="Codecov">
<img src="https://codecov.io/github/JohnDamilola/URL-Shortener-2.0/branch/main/graph/badge.svg"/> </a>
<a href="https://doi.org/10.5281/zenodo.7393108"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.7393108.svg" alt="DOI"></a>
<a href="https://img.shields.io/badge/python-v3.9+-yellow.svg" alt="Python version">
<img src="https://img.shields.io/badge/python-v3.9+-yellow.svg"/> </a>
<a href="https://img.shields.io/github/repo-size/JohnDamilola/URL-Shortener-2.0?color=brightgreen" alt="Repo size">
<img src="https://img.shields.io/github/repo-size/JohnDamilola/URL-Shortener-2.0?color=brightgreen"/> </a>
<img src="https://img.shields.io/github/languages/top/JohnDamilola/URL-Shortener-2.0?style=plastic">
<img src="https://img.shields.io/tokei/lines/github/johndamilola/URL-Shortener-2.0?style=plastic">
<a href="https://github.com/JohnDamilola/URL-Shortener-2.0/issues">
  <img src="https://img.shields.io/github/issues-raw/johndamilola/URL-Shortener-2.0?style=plastic"></a>


<a href="https://img.shields.io/github/release/JohnDamilola/URL-Shortener-2.0?color=brightblue" alt="Release">
<img src="https://img.shields.io/github/release/JohnDamilola/URL-Shortener-2.0?color=brightblue"/> </a>
</p>


## Description
URL Shortener is a tool to help you create simple and easy-to-remember custom links from long URLs and to also track link performance and impact.

## Watch URL-Shortener-2.0 in Action


## Tech Stack
<a href="https://flask.palletsprojects.com/en/2.2.x/"><img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" /></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /></a>
<a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
<a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" /></a>
<a href="https://github.com/"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>
<a href="https://ant.design/"><img src="https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white" /></a>
<a href="https://www.heroku.com/"><img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" /></a>

## Getting started & Installation:
- Backend [See README.md](https://github.com/JohnDamilola/URL-Shortener-2.0/blob/main/backend/README.md)
- Frontend [See README.md](https://github.com/JohnDamilola/URL-Shortener-2.0/blob/main/frontend/README.md)

## Demo Links
- Backend API Endpoint URL: https://url-shortener-server-api.herokuapp.com/ [Docs](https://splendid-crush-9a3.notion.site/API-Endpoints-58013a6640204491858ada2541ae623a)
- Frontend: https://url-bit.web.app/

## Current Screens
<p>
  <img
    width="100%"
    src="./frontend/src/assets/images/1.png"
    alt="Demo Screens 1"
  />

  <img
    width="100%"
    src="./frontend/src/assets/images/2.png"
    alt="Demo Screens 2"
  />
</p>

## Features
<ul>
  <li>Anonymous short links creation (without login)</li>
  <li>User authentication</li>
  <li>Update and delete user account</li>
  <li>Create Short links</li>
  <li>Track shortened links</li>
  <li>Edit/Delete shortened links</li>
  <li>View engagement analytics - check number of visits of each shortened link</li>
  <li>Set expiry date, Disable/Enable, Password protect created of each shortened link</li>
  <li>Download QR code of each shortened links</li>
  <li>Redirect shortened links to original links</li>
  <li>Links overview stats</li>
</ul>

## Scalability 
URL-Shortener-2.0, greatly improve the scalability from the previous version [URL-Shortner](https://github.com/CSC510-Group-5/URL-Shortner). Firstly, Our application uses and follows RESTful API to provide a stateless software that does not share anything between requests. This means that there doesn't have to be (much) communication between servers, making our application horizontally scalable. Moreover, development teams can scale the product without much difficulty because there is a separation between the client and the server. Secondly, database(Firebase) is intergrated to provide concurrency; many users can use the application at the same time without corrupting the data. The database consists of adding more instances or nodes to the database in order to try to deal with a higher workload. This means that when our application needs a higher capacity when encounter heavier traffic, it simply adds more servers to the cluster.


## Contributions to the Project
Please refer to the [Contributing.md](https://github.com/JohnDamilola/URL-Shortener-2.0/blob/main/Contributing.md) if you want to contrbute to the FlashCards source code. Follow all the guidelines mentioned and raise a pull request for the developers to review before the code goes to the main source code.

## Help

Email any queries to the contributors -
1. [Swarangi Gaurkar](sgaurka@ncsu.edu)
2. [Kritika Javali](ksjavali@ncsu.edu)
3. [John Damilola](djbabalo@ncsu.edu)
4. [Aaron Dias Barreto](aadiasba@ncsu.edu)
5. [Leo Hsiang](yhsiang@ncsu.edu)

## Authors 

1. [Kritika Javali](https://github.com/ksjavali)
2. [Swarangi Gaurkar](https://github.com/Swarangigaurkar)
3. [Aaron Dias Barreto](https://github.com/aaron278)
4. [Leo Hsiang](https://github.com/leoohsiang)
5. [Damilola Babalola](https://github.com/JohnDamilola)

## License
[MIT](https://tldrlegal.com/license/mit-license)

## Funding
Our project at the moment is not funded by any organization/individual.
