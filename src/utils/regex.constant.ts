export const domainRegex =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

export const phonePattern1 = /^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/;
export const phonePattern2 = /^\(?([0-9]{3})\)?[.]([0-9]{3})[.]([0-9]{4})$/;
export const phonePattern3 = /^\(?([0-9]{3})\)?[ ]([0-9]{3})[ ]([0-9]{4})$/;
export const phonePattern4 = /^[0-9]{10}$/;
export const phonePattern5 = /^\(\d{3}\) \d{3}-\d{4}$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordUpperCaseCheck = /[A-Z]/;
export const passwordLowerCaseCheck = /[a-z]/;
export const passwordNumberCheck = /[0-9]/;
