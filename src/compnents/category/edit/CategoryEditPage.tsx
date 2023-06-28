import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ICategoryEdit, ICategoryEditReques } from "./types";
import http_common from "../../../http_common";

const CategoryEditPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { id } = useParams();
  let init: ICategoryEdit = {
    name: "",
    image: File.prototype,
    description: "",
  };
  useEffect(() => {
    http_common
      .get<ICategoryEditReques>(`api/category/${id}`)
      .then(async (response) => {
        const category = response.data;
        //get image file with image name
        const imageFile = await convertImageToFile(category.image);
        formik.setFieldValue("name", category.name);
        formik.setFieldValue("image", imageFile);
        formik.setFieldValue("description", category.description);
        setPreviewUrl(URL.createObjectURL(imageFile));
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    image: Yup.string().required("Image is required"),
    description: Yup.string().required("Description is required"),
  });
  const onFormikSubmit = async (values: ICategoryEdit) => {
    try {
      console.log(values);
      let res = await http_common.post(`api/category/edit/${id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("updated!");
      navigate("/");
    } catch {
      console.log("Server error");
    }
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: validationSchema,
    onSubmit: onFormikSubmit,
  });

  const convertImageToFile = async (imageName: string): Promise<File> => {
    try {
      const response = await http_common.get(`/api/getImage/${imageName}`, {
        responseType: "blob",
      });

      const imageBlob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const file = new File([imageBlob], imageName, {
        type: response.headers["content-type"],
      });

      return file;
    } catch (error) {
      throw new Error("Error converting image to file");
    }
  };
  const { values, handleChange, handleSubmit } = formik;

  //prewiew image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <h1 className="text-center">Змінити категорію</h1>
      <div className="container">
        <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Назва
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={values.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Опис
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={values.description}
              onChange={handleChange}
              name="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Фото
            </label>
            <input
              name="image"
              className="form-control"
              type="file"
              id="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-12 mb-3">
            {previewUrl && (
              <img
                className="rounded"
                src={previewUrl}
                alt="Preview"
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </div>
          <button
            onClick={() => {
              navigate("../..");
            }}
            className="btn btn-secondary "
          >
            Скасувати
          </button>
          <button type="submit" className="btn btn-primary">
            Змінити
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryEditPage;