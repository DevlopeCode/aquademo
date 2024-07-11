import auth from '@react-native-firebase/auth';

const createUser = ({email, password, onErr, onSuccess}) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      onSuccess(user);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        onErr('That email address is already in use!');
      }
      //   auth/invalid-credential
      if (error.code === 'auth/invalid-email') {
        onErr('That email address is invalid!');
      }
      if (error.code === 'auth/invalid-credential') {
        onErr('That invalid-credential!');
      }

      // onErr(JSON.stringify(error));
    });
};

const loginUser = async ({email, password, onErr, onSuccess}) => {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(' signed in!');
      onSuccess(user);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        onErr('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-credential') {
        onErr('invalid-credential!');
      }
      if (error.code === 'auth/invalid-email') {
        onErr('That email address is invalid!');
      }
    });
};

export {loginUser, createUser};
