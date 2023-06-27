export default function IsLogin() {
  return !(localStorage.getItem("accessToken") == null);
}
