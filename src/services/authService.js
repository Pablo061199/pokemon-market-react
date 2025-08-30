import { UserLogin } from "../models/UserLogin";
import { UserResponse } from "../models/UserResponse";

const users = [
  { email: "ash@pokemon.com", password: "1234qwer", rol : "admin" },
  { email: "misty@pokemon.com", password: "1234qwer", rol : "comprador" },
  { email: "pablo@pokemon.com", password: "1234qwer", rol : "comprador" },
];

export function loginUser(userLogin) {
  const found = users.find(
    (u) => u.email === userLogin.email && u.password === userLogin.password
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (found) {
        let user = new UserResponse(found.email, found.rol);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLogged", true);
        resolve({ success: true, user: found });
      } else {
        reject({ success: false, message: "Credenciales incorrectas" });
      }
    }, 800);
  });
}
export function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("isLogged");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
  return localStorage.getItem("isLogged") === "true";
}