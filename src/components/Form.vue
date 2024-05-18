<template>
    <form :id="formId" @submit.prevent="submit">
      <div class="group" v-for="(field, index) in fields" :key="field.name">
        <div class="inner-group">
          <label :for="field.id">{{ field.label }}</label>
  
          <input 
            v-if="handleInputTypes(field.type)" 
            :type="field.type" 
            :name="field.name"
            :id="field.id"
            :placeholder="field.placeholder"
            :readonly="field.readonly"
            :disabled="field.disabled"
            v-model="field.value"
            @blur="handleField(field.value, index)"
          />
        
          <select 
            v-if="field.type === 'select'" 
            :name="field.name"
            :id="field.id"
            v-model="field.value"
            @change="handleField(field.value, index)"
          >
            <option 
              v-for="option in field.options" 
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
  
          <div 
            v-if="field.type === 'radio'" 
            :id="option.id"
            v-for="option in field.options" 
            :key="option.value"
          >
            <input
              type="radio"
              :name="option.value"
              :id="option.value"
              :value="option.value"
              :checked="field.value === option.value"
              @change="handleRadio(option.value, field, index)"
            />        
            <label :for="option.value">{{ option.label }}</label>
          </div>
  
          <div 
            v-if="field.type === 'checkbox'" 
            :id="option.id"
            v-for="option in field.options" 
            :key="option.value"
          >
            <input
              type="checkbox"
              :name="option.value"
              :id="option.value"
              :value="option.value"
              :checked="field.value.includes(option.value)"
              @change="handleCheckbox(field, option.value, index)"
            />        
            <label :for="option.value">{{ option.label }}</label>
          </div>
        </div>
  
        <span class="error-msg" v-if="field.showError">{{ field.errorMsg }}</span>
      </div>
      
      <button type="submit">{{ buttonText }}</button>
    </form>
</template>

<script setup>
const props = defineProps({
    formId: String,
    fields: {
        type: Array
    },
    buttonText: String,
});

const emit = defineEmits(['submit']);

function handleInputTypes(type) {
const inputTypes = ["text", "number", "email", "password"];
return inputTypes.includes(type);
}

function handleCheckbox(field, value, index) {
toggleCheckbox(field.value, value);
handleField(field.value, index);
}

function handleRadio(value, field, index) {
field.value = value;
handleField(field.value, index);
}

function toggleCheckbox(values, value) {
const index = values.indexOf(value);
if (index === -1) {
    values.push(value);
} else {
    values.splice(index, 1);
}
};

function handleField(value, index) {
    if(value === "") return;
    const val = typeof value !== "string" ? value : value.trim();
    props.fields[index].value = val;

    if (!props.fields[index].validator(val)) {
        props.fields[index].showError = true;
    } else {
        props.fields[index].showError = false;
    }  
}

function validateForm() {
let isValid = true;
props.fields.forEach((field) => {
    if (field.validator && !field.validator(field.value)) {
    field.showError = true;
    isValid = false;
    } else {
    field.showError = false;
    }
});
return isValid;
};

function submit() {
    const isValid = validateForm();

    if (isValid) {
        const formValues = {};
        props.fields.forEach((field) => {
            formValues[field.name] = field.value;
        });

        emit('submit', formValues);
    } else {
        emit('submit', false);
    }
};
</script>
  
<style lang="scss" scoped>
form {

.group {
    margin-bottom: 15px;
    .inner-group {
    display: flex;
    gap: 10px;
    align-items: center;
    
    & > label {
        width: 100px;
    }

    input:not([type='checkbox']):not([type='radio']),
    select {
        flex: 1;
        padding: 5px;
    }

    input[type="checkbox"],
    input[type="radio"] {
        margin-right: 5px;
    }
    }
}

.error-msg {
    display: block;
    color: red;
    font-size: 14px;
    margin-top: 5px;
}

button[type="submit"] {
    display: block;
    border-radius: 5px;
    padding: 10px;
    min-width: 150px;
    border: 1px solid #acacac;
    cursor: pointer;
    margin: 20px auto;
    background: #4189ff;
    color: #fff;
    font-weight: bold;
    &:hover {
    background: rgb(83, 149, 255);
    }
}
}
</style>  