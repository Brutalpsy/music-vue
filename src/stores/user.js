import { defineStore } from 'pinia';
import { auth, usersCollection } from '@/includes/firebase';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    user: null
  }),
  actions: {
    async register(values) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await usersCollection.doc(userCredentials.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      });

      await userCredentials.user.updateProfile({
        displayName: values.name
      });

      this.user = userCredentials.user.displayName;
      this.userLoggedIn = true;
    },
    async authenticate(values) {
      const userCredential = await auth.signInWithEmailAndPassword(values.email, values.password);

      this.user = userCredential.user.displayName;
      this.userLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();

      this.userLoggedIn = false;
    }
  }
});
