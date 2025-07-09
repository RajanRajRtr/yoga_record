import multer from "multer";
import path from "path";

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("uploadImage", file);
    cb(null, "../public/3D-View-GLB");
  },
  filename: function (req, file, cb) {
    const originalName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const uniqueSuffix = ".glb";
    console.log("originalName", originalName);
    // Construct the new filename
    const newFileName = `${originalName}${uniqueSuffix}`;

    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (extname === ".glb") {
    cb(null, true);
  } else {
    cb(new Error("Only .glb files are allowed"), false);
  }
};

const uploadImage = multer({
  storage: Storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: fileFilter,
}).single("animation");

export default uploadImage;
