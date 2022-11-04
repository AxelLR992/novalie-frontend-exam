# Novalie FrontEnd Exam

Web Application developed using ReactJS as Frontend Exam for applying to Novalie Business Consulting.

It consists on a simple Users CRUD, with the following features:

- Shows the records in list or grid.
- It has pagination of 10 in 10.
- Allows you to create, delete, read and update users.
- It supports multiple emails for every user.
- It requires a profile picture per user.

It uses the following technologies:

- **TypeScript:** Is the main language, used to interact with the logic of the application.
- **React JS:** The library to interact with the FrontEnd.
- **Material Design Icons:** Community Icons inspired by [Material Design](https://m2.material.io/design).
- **Axios:** HTTP Client.
- **SASS:** Styles pre-processor.
- **SweetAlert2:** Beautiful alerts.
- **React-Toastify:** Easy to use notifications.

The structure of this project is inspired by [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/). Also, you can find a Changelog at the root of the project, that follows [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

There is a .env at the project's root folder, for flexibility purposes. This way, is easier to Novalie to test this project. Please, if you want to fork this repository, remove this file from the repository and instead put a .env.example to avoid security leaks.

## How to run this application 🚗

First, check that you have the following software installed in your computer:

- Git.
- Node.
- NPM.
- Yarn.

You can install yarn using the command `npm i -g yarn`.

Clone this repository in your computer using `git clone <repository-url>`.

Then, install the project's dependencies using the command `yarn`.

Finally, run the proyect using `yarn start`.

## Deployment 🚀

To deploy this project to a production environment, please run the command `yarn build`, and upload the files located at the `build/` directory to a web server, like Apache.

## Contact

Please, don't hesitate in contact me through [my GitHub account](https://github.com/AxelLR992) if you have any question about this project.