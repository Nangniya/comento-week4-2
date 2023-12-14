import emailDB from "./emaildb.js";
import { emailRegex, passwordRegex, isFormatValid } from "./util.js";

const formNode = document.querySelector(".sign-up-form");
const emailInputNode = document.querySelector("#email_input");
const passwordInputNode = document.querySelector("#password_input");
const passwordConfirmInputNode = document.querySelector(
  "#password_confirm_input"
);
const nameInputNode = document.querySelector("#name_input");
const checkDuplicateNode = document.querySelector("#check_duplicate_btn");
const submitBtnNode = document.querySelector("#submit_btn");

let isUsableId = false;

formNode.addEventListener("keydown", handleOnEnter);
checkDuplicateNode.addEventListener("click", checkDuplicate);
submitBtnNode.addEventListener("click", handleOnSubmit);

function handleOnEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const inputs = document.getElementsByTagName("input");
    let found = false;
    for (let i = 0; i < inputs.length; i++) {
      if (found) {
        inputs[i].focus();
        break;
      }
      if (inputs[i] === document.activeElement) {
        found = true;
      }
    }
  }
}

function checkDuplicate(e) {
  e.preventDefault();
  const emailInput = emailInputNode.value;

  const isDuplicate = emailDB.some((user) => user.email === emailInput);

  if (isDuplicate) {
    alert("이미 사용중인 이메일입니다.");
    emailInputNode.focus();
  } else {
    if (!isFormatValid(emailInput, emailRegex)) {
      alert("올바른 이메일 형식으로 입력해주세요.");
      emailInputNode.focus();
    } else {
      alert(emailInput + "은 사용 가능한 이메일입니다.");
      isUsableId = true;
      passwordInputNode.focus();
    }
  }
}

function handleOnSubmit(e) {
  e.preventDefault();
  const email = emailInputNode.value;
  const password = passwordInputNode.value;
  const passwordConfirm = passwordConfirmInputNode.value;
  const name = nameInputNode.value;

  if (!isUsableId) {
    alert("이메일 중복 확인을 해주세요.");
  } else if (!isFormatValid(password, passwordRegex)) {
    alert("올바른 비밀번호 형식으로 입력해주세요.");
    passwordInputNode.value = "";
    passwordConfirmInputNode.value = "";
    passwordInputNode.focus();
  } else if (password !== passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    passwordConfirmInputNode.value = "";
    passwordConfirmInputNode.focus();
  } else {
    emailDB.push({
      email,
      password,
      name,
    });
    alert("회원가입이 완료되었습니다.");
    console.log(emailDB[emailDB.length - 1]);
  }
}
