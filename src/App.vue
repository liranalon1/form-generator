<template>
  <div class="form-wrap">
    <h1>My Form Generator</h1>
    <p class="success-msg" v-if="formSubmitted">The Form was submitted !</p>
    <Form 
      :formId="form.id"
      buttonText="Submit"
      :fields="form.fields" 
      @submit="handleFormSubmit" 
    />  
  </div>
</template>

<script setup>
import Form from './components/Form.vue';
import { textField, emailField, passwordField } from './helpers/validations';
import { ref, reactive } from 'vue';

const formSubmitted = ref(false);

const form = reactive({
  id: "form",
  fields: [
    {
      name: "fname",
      id: "fname",
      type: "text",
      value: "",
      errorMsg: "This field is required",
      showError: false,
      label: "First name",
      validator: textField,
    },
    {
      name: "lname",
      id: "lname",
      type: "text",
      value: "",
      errorMsg: "This field is required",
      showError: false,
      label: "Last name",
      validator: textField,
    },
    {
      name: "age",
      id: "age",
      type: "number",
      value: 30,
      errorMsg: "Value must be bigger than 0",
      showError: false,
      label: "Age",
      validator: (val) => val > 0
    },
    {
      name: "email",
      id: "email",
      type: "email",
      value: "",
      errorMsg: "Email is not Valid",
      showError: false,
      label: "Email",
      placeholder: "e.g.: test@gmail.com",
      validator: emailField,
    },
    {
      name: "password",
      id: "password",
      type: "password",
      value: "",
      errorMsg: "Password must contain at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit",
      showError: false,
      label: "Password",
      placeholder: "e.g.: Aa123456",
      validator: passwordField,
    },
    {
      name: "country",
      id: "country",
      type: "select",
      value: "",
      errorMsg: "Please select country",
      showError: false,
      label: "Country",
      options: [
        { label: "Select country", value: "" },
        { label: "Israel", value: "israel" },
        { label: "USA", value: "usa" },
        { label: "France", value: "france" }
      ],
      validator: (val) => val !== ""
    },
    {
      name: "gender",
      id: "gender",
      type: "radio",
      value: "",
      errorMsg: "Please select gender",
      showError: false,
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
      ],
      validator: (val) => val !== ""
    },
    {
      name: "frameworks",
      id: "frameworks",
      type: "checkbox",
      value: [],
      errorMsg: "Please select at least one framework",
      showError: false,
      label: "Frameworks",
      options: [
        { label: "Vue", value: "vue" },
        { label: "React", value: "react" },
        { label: "Angular", value: "angular" }
      ],
      validator: (val) => val.length > 0
    }
  ]
});

function handleFormSubmit(data) {
  if(data) {
    formSubmitted.value = true;
    console.log('Submitted! The form values are: ', data);
  } else {
    formSubmitted.value = false;
  }
  
};
</script>

<style>
.form-wrap {
  max-width: 420px;
  margin: 20px auto;
  padding: 10px;

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }

  .success-msg {
    display: block;
    margin: 10px 0;
    font-size: 14px;
    color: green;    
    text-align: center;
    font-weight: bold;
  }  
}
</style>
