import fs from "fs";

export const validateStudent = (req, res, next) => {
  const { name, email, password, gpa, major } = req.body;
  const isCreateRequest = req.method === "POST";

  const reject = (message) => {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(400).json({ message });
  };

  const normalizedName = typeof name === "string" ? name.trim() : name;
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : email;
  const normalizedMajor = typeof major === "string" ? major.trim() : major;
  const normalizedPassword = typeof password === "string" ? password : password;
  const hasGpa = gpa !== undefined && gpa !== null && gpa !== "";
  const parsedGpa = hasGpa ? Number(gpa) : undefined;

  if (isCreateRequest && !normalizedName) return reject("Name is required");
  if (isCreateRequest && !normalizedEmail) return reject("Email is required");
  if (isCreateRequest && !normalizedPassword) return reject("Password is required");
  if (isCreateRequest && !hasGpa) return reject("GPA is required");
  if (isCreateRequest && !normalizedMajor) return reject("Major is required");

  if (normalizedName !== undefined && normalizedName === "") {
    return reject("Name cannot be empty");
  }

  if (normalizedMajor !== undefined && normalizedMajor === "") {
    return reject("Major cannot be empty");
  }

  if (normalizedPassword !== undefined && normalizedPassword.length < 8) {
    return reject("Password must be at least 8 characters long");
  }

  if (normalizedEmail !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) return reject("Email is not valid");
  }

  if (hasGpa) {
    if (Number.isNaN(parsedGpa)) return reject("GPA must be a valid number");
    if (parsedGpa < 0 || parsedGpa > 4) return reject("GPA must be between 0 and 4");
    req.body.gpa = parsedGpa;
  }

  if (normalizedName !== undefined) req.body.name = normalizedName;
  if (normalizedEmail !== undefined) req.body.email = normalizedEmail;
  if (normalizedMajor !== undefined) req.body.major = normalizedMajor;

  next();
};
