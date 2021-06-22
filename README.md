# Bartstua

## Quickstart

### Prerequisites

- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- [Firebase CLI](https://firebase.google.com/docs/cli#windows-npm)

### Setup:
1. Clone project
2. Navigate to the root project directory
3. Install dependencies `yarn`
4. Run application `yarn start`
5. Open a new terminal and run `yarn emulators`

- Application is available at `http://localhost:3000/`
- Emulator is available at `http://localhost:4000/`

### Save emulator data locally
You can export data from the Authentication, Cloud Firestore, Realtime Database and Cloud Storage emulators to use as a shareable, common baseline data set.

To export data:
- While running the emulator in the background run
```sh
 firebase emulators:export <custom_directory_name>
```

To import data:
- Before starting the emulator run
```sh
 firebase emulators:start --import <export-directory>
```
