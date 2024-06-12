<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_snow_alert"
    :class="reg_alert_varient"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>

    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
        :bails="false"
        v-slot="{ field, errors }"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>

      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        value="1"
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded block"
      />
      <label class="inline-block block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>

    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { auth, usersCollection } from '@/includes/firebase';

export default {
  name: 'RegistrationForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100|excluded:password',
        age: 'required|min_value:18|max_value:100',
        confirm_password: 'password_mismatch:@password',
        country: 'required|country_excluded:Antartica',
        tos: 'tos'
      },

      userData: {
        country: 'USA'
      },
      reg_in_submission: false,
      reg_snow_alert: false,
      reg_alert_varient: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.'
    };
  },
  methods: {
    async register(values) {
      this.reg_snow_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_varient = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      let userCredentials = null;
      try {
        userCredentials = await auth.createUserWithEmailAndPassword(values.email, values.password);
      } catch (error) {
        console.log(error);
        this.reg_in_submission = true;
        this.reg_alert_varient = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
        return;
      }

      try {
        await usersCollection.add({
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country
        });
      } catch (error) {
        console.log(error);
        this.reg_in_submission = true;
        this.reg_alert_varient = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
        return;
      }

      this.reg_alert_varient = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account is being created';
      console.log(userCredentials);
    }
  }
};
</script>
