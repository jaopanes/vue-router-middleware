export default function auth({ next, to }) {
  console.log(to.name);

  return next();
}