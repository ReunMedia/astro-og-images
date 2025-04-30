// Without this declaration, using htm module results in a type error.
declare module "htm" {
  const htm = import("htm").default;
  export default htm;
}
