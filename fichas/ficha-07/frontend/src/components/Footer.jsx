export function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Copyright © {new Date().getFullYear()}{" "}
        <a className="text-dark" href="https://almeidx.dev/">
          almeidx.dev
        </a>{" "}
        | All rights reserved
      </div>
    </footer>
  );
}
